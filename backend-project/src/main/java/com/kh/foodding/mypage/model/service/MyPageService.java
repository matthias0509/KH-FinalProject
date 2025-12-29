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

    @Transactional
    public boolean updateBaseInfo(MyPage myPage) {
        int result = mypageDao.updateMemberInfo(myPage);
        return result == 1;
    }
    
    // --- 💡 이미지 저장 로직 수정 (물리적 저장 추가) ---
    @Transactional
    public String updagteProfileImage(String userId, MultipartFile file) {
        if(file.isEmpty()) return null;
        
        // 1. 실제 파일이 저장될 로컬 경로 (C 드라이브에 자동으로 폴더가 생성됩니다)
        String savePath = "C:/foodding/uploads/profile/"; 
        File folder = new File(savePath);
        if(!folder.exists()) {
            folder.mkdirs(); // 폴더가 없으면 생성
        }

        // 2. 파일명 중복 방지를 위한 랜덤 이름 생성
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String storedFileName = UUID.randomUUID().toString() + fileExtension;
        
        // 3. 서버 하드디스크에 실제 파일 저장
        try {
            file.transferTo(new File(savePath + storedFileName));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // 4. 브라우저에서 접근할 URL 경로 (WebConfig 설정 필요)
        // 💡 "/foodding/uploads/"로 시작하게 맞춥니다.
        String dbPath = "http://localhost:8001/foodding/uploads/profile/" + storedFileName;

        // 5. DB에 URL 경로 저장
        int result = mypageDao.updateProfileImage(userId, dbPath);
        return result == 1 ? dbPath : null;
    }
    
    @Transactional
    public boolean deleterProfieImage(String userId) {
        return mypageDao.updateProfileImage(userId, null) == 1;
    }
    
    @Transactional
    public boolean updateAccountName(String userId, String newName, String currentPassword) {
        String storedHashedPassword = mypageDao.selectHashedPassword(userId);
        if (storedHashedPassword == null || !passwordEncoder.matches(currentPassword, storedHashedPassword)) {
            return false;
        }
        MyPage updateDTO = mypageDao.selectMemberById(userId); 
        if (updateDTO == null) return false;
        updateDTO.setName(newName); 
        return mypageDao.updateMemberInfo(updateDTO) == 1;
    }
    
    @Transactional
    public boolean changePassword(String userId, String currentPassword, String newPassword) {
        String storedHashedPassword = mypageDao.selectHashedPassword(userId);
        // 💡 현재 비밀번호가 null이 들어오면 인증 과정을 건너뛰도록 처리하거나, 기존 로직 유지
        if (currentPassword != null && (storedHashedPassword == null || !passwordEncoder.matches(currentPassword, storedHashedPassword))) {
            return false;
        }
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        return mypageDao.updatePassword(userId, encodedNewPassword) == 1;
    }
        
    @Transactional
    public boolean changeEmail(String userId, String newEmail, String authCode) {
        return mypageDao.updateEmail(userId, newEmail) == 1;
    }

    @Transactional
    public boolean changePhone(String userId, String newPhone, String authCode) {
        return mypageDao.updatePhone(userId, newPhone) == 1;
    }

    @Transactional
    public boolean withdrawMember(String userId, String password) {
        String storedHashedPassword = mypageDao.selectHashedPassword(userId);
        if (password != null && (storedHashedPassword == null || !passwordEncoder.matches(password, storedHashedPassword))) {
            return false;
        }
        return mypageDao.deleteMember(userId) == 1;
    }
    
    /**
     * 💡 비밀번호 확인 전용 메서드 (모달 인증용)
     */
    public boolean checkPasswordOnly(String userId, String rawPassword) {
        // 1. DB에서 암호화된 비밀번호 조회
        String storedHashedPassword = mypageDao.selectHashedPassword(userId);
        
        // 2. 비밀번호 존재 여부 및 일치 여부 확인
        if (storedHashedPassword == null) {
            return false;
        }
        
        // 3. BCryptPasswordEncoder를 이용한 대조
        return passwordEncoder.matches(rawPassword, storedHashedPassword);
    }
}