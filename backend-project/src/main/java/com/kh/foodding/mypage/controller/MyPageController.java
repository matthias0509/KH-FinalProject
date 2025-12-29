package com.kh.foodding.mypage.controller;

import java.security.Principal; 
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

import com.kh.foodding.mypage.model.service.MyPageService;
import com.kh.foodding.mypage.model.vo.MyPage; 

@RestController
@RequestMapping("/api/mypage")
public class MyPageController {

    @Autowired
    private MyPageService mypageService;

    /**
     * 0. 계정 정보 탭 진입 전 비밀번호 검증 API
     * 💡 withdrawMember 대신 전용 검증 메서드 checkPasswordOnly를 사용합니다.
     */
    @PostMapping("/account/verifyPassword")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> data, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        String password = data.get("password");

        // 💡 중요: 회원 탈퇴 로직이 아닌, 비밀번호 대조만 수행하는 메서드 호출
        boolean isMatched = mypageService.checkPasswordOnly(userId, password); 

        Map<String, Object> result = new HashMap<>();
        result.put("success", isMatched);
        
        System.out.println("비밀번호 검증 결과 [" + userId + "]: " + isMatched); // 디버깅용 로그
        
        return ResponseEntity.ok(result);
    }

    /**
     * 1. 사용자 정보 조회 (GET)
     */
    @GetMapping("/info")
    public ResponseEntity<?> getMyPageInfo(Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        MyPage myPageInfo = mypageService.selectMemberInfo(userId); 

        if (myPageInfo != null) {
            return ResponseEntity.ok(myPageInfo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                               .body(Map.of("message", "사용자를 찾을 수 없습니다."));
        }
    }

    /**
     * 2. 기본 정보 수정 (닉네임만 반영)
     */
    @PostMapping("/base/updateInfo")
    public ResponseEntity<?> updateBaseInfo(@RequestBody MyPage myPage, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        myPage.setUserId(userId); 
        
        boolean success = mypageService.updateBaseInfo(myPage);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "정보가 변경되었습니다."));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message", "업데이트 실패"));
        }
    }

    /**
     * 3. 프로필 사진 업로드
     */
    @PostMapping("/base/updateProfileImage")
    public ResponseEntity<?> updateProfileImage(
            @RequestPart("profileFile") MultipartFile file, 
            Principal principal) {
        
        String userId = (principal != null) ? principal.getName() : "testUser";

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "파일이 없습니다."));
        }
        
        String imageUrl = mypageService.updagteProfileImage(userId, file); 
        if (imageUrl != null) {
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl, "message", "업로드 성공"));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message", "업로드 실패"));
        }
    }

    /**
     * 4. 프로필 사진 삭제
     */
    @PostMapping("/base/deleteProfileImage")
    public ResponseEntity<?> deleteProfileImage(Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        boolean success = mypageService.deleterProfieImage(userId);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "사진 삭제 성공"));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message", "삭제 실패"));
        }
    }

    /**
     * 5. 새 비밀번호 저장
     */
    @PostMapping("/account/updatePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> data, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        String newPassword = data.get("newPassword");
        
        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "새 비밀번호를 입력해주세요."));
        }

        boolean success = mypageService.changePassword(userId, null, newPassword);

        if (success) {
            return ResponseEntity.ok(Map.of("message", "비밀번호가 변경되었습니다."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "변경에 실패했습니다."));
        }
    }

    /**
     * 6. 회원 탈퇴
     */
    @PostMapping("/account/withdraw")
    public ResponseEntity<?> withdrawMember(Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        // 모달에서 이미 인증을 거친 후 호출되므로 비밀번호 없이 처리 가능
        boolean success = mypageService.withdrawMember(userId, null);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "탈퇴 완료"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "탈퇴 처리 실패"));
        }
    }
}