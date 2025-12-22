package com.kh.foodding.mypage.model.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.mypage.model.dao.MyPageDao;
import com.kh.foodding.mypage.model.vo.MyPage;

@Service
public class MyPageService {

    @Autowired
    private MyPageDao mypageDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public MyPage selectMemberInfo(String userId) {
        return mypageDao.selectMemberById(userId);
    }

    /**
     * 계정 정보 통합 업데이트 (비밀번호, 이메일, 주소 등)
     */
    @Transactional
    public boolean updateAccountInfo(MyPage myPage) {
        // 1. 기존 DB 정보를 가져옴 (이름, 닉네임 누락 방지용)
        MyPage current = mypageDao.selectMemberById(myPage.getUserId());
        
        // 2. 프론트에서 userName이 없으면 기존 값 유지
        if (myPage.getUserName() == null || myPage.getUserName().trim().isEmpty()) {
            myPage.setUserName(current.getUserName());
        }

        // 3. 프론트에서 nickname이 없으면 기존 값 유지 (이 부분이 추가되어야 합니다!)
        if (myPage.getNickname() == null || myPage.getNickname().trim().isEmpty()) {
            myPage.setNickname(current.getNickname());
        }

        // 4. 새 비밀번호 처리
        if (myPage.getUserPwd() != null && !myPage.getUserPwd().trim().isEmpty()) {
            String encodedPwd = passwordEncoder.encode(myPage.getUserPwd());
            myPage.setUserPwd(encodedPwd);
            mypageDao.updatePassword(myPage.getUserId(), encodedPwd);
        }

        // 5. 통합 업데이트 실행
        return mypageDao.updateMemberInfo(myPage) == 1;
    }

    /**
     * 비밀번호 확인 전용 로직
     */
    public boolean verifyPassword(String userId, String rawPassword) {
        String storedHashedPassword = mypageDao.selectHashedPassword(userId);
        if (storedHashedPassword == null) return false;
        
        return passwordEncoder.matches(rawPassword, storedHashedPassword);
    }

    @Transactional
    public String updateProfileImage(String userId, MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        String savePath = "C:/foodding/uploads/profile/";
        File folder = new File(savePath);
        if (!folder.exists()) folder.mkdirs();

        String originalName = file.getOriginalFilename();
        String ext = originalName.substring(originalName.lastIndexOf("."));
        String storedName = UUID.randomUUID() + ext;

        try {
            file.transferTo(new File(savePath + storedName));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // DB 컬럼 MODIFY_PROFILE에 매핑되는 경로
        String dbPath = "/foodding/uploads/profile/" + storedName;
        int result = mypageDao.updateProfileImage(userId, dbPath);

        return (result == 1) ? dbPath : null;
    }

    @Transactional
    public boolean deleteProfileImage(String userId) {
        return mypageDao.updateProfileImage(userId, null) == 1;
    }

    @Transactional
    public boolean updateBaseInfo(MyPage myPage) {
        // ORA-01407 방지: 이름이 null인 경우 기존 정보로 보정
        if (myPage.getUserName() == null || myPage.getUserName().trim().isEmpty()) {
            MyPage current = mypageDao.selectMemberById(myPage.getUserId());
            myPage.setUserName(current.getUserName());
        }
        return mypageDao.updateMemberInfo(myPage) == 1;
    }

    @Transactional
    public boolean withdrawMember(String userId) {
        return mypageDao.deleteMember(userId) == 1;
    }
}