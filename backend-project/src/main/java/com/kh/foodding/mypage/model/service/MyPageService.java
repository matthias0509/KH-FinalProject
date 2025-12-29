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
     * 계정 정보 통합 업데이트
     */
    @Transactional
    public boolean updateAccountInfo(MyPage myPage) {
        MyPage current = mypageDao.selectMemberById(myPage.getUserId());
        
        if (myPage.getUserName() == null || myPage.getUserName().trim().isEmpty()) {
            myPage.setUserName(current.getUserName());
        }

        if (myPage.getNickname() == null || myPage.getNickname().trim().isEmpty()) {
            myPage.setNickname(current.getNickname());
        }

        if (myPage.getUserPwd() != null && !myPage.getUserPwd().trim().isEmpty()) {
            String encodedPwd = passwordEncoder.encode(myPage.getUserPwd());
            myPage.setUserPwd(encodedPwd);
            mypageDao.updatePassword(myPage.getUserId(), encodedPwd);
        }

        return mypageDao.updateMemberInfo(myPage) == 1;
    }

    /**
     * 비밀번호 확인 로직
     */
    public boolean verifyPassword(String userId, String rawPassword) {
        String storedHashedPassword = mypageDao.selectHashedPassword(userId);
        if (storedHashedPassword == null) return false;
        
        return passwordEncoder.matches(rawPassword, storedHashedPassword);
    }

    /**
     * ✅ 프로필 이미지 업데이트 (경로 수정됨)
     */
    @Transactional
    public String updateProfileImage(String userId, MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        // 🚨 [수정 완료] 실제 파일이 있는 폴더(WebConfig와 통일)
        String savePath = "C:/foodding/profile_images/"; 
        
        File folder = new File(savePath);
        if (!folder.exists()) folder.mkdirs();

        String originalName = file.getOriginalFilename();
        // 확장자 추출 안전장치 (파일에 확장자가 없을 경우 대비)
        String ext = "";
        if (originalName != null && originalName.contains(".")) {
            ext = originalName.substring(originalName.lastIndexOf("."));
        }
        String storedName = UUID.randomUUID() + ext;

        try {
            file.transferTo(new File(savePath + storedName));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // DB에는 파일명만 저장 (Sidebar.js에서 경로를 붙여줌)
        String dbPath = storedName;
        int result = mypageDao.updateProfileImage(userId, dbPath);

        return (result == 1) ? dbPath : null;
    }

    @Transactional
    public boolean deleteProfileImage(String userId) {
        return mypageDao.updateProfileImage(userId, null) == 1;
    }

    @Transactional
    public boolean updateBaseInfo(MyPage myPage) {
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