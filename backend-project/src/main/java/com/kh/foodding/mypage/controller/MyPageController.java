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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MyPageController {

    @Autowired
    private MyPageService mypageService;

    // 1. 회원 정보 조회 (주소 포함)
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(Principal principal) {
    	
    	// 🔍 [진단 로그] 이 부분이 범인을 알려줍니다.
        System.out.println("=====================================");
        System.out.println("1. 컨트롤러 진입 성공");
        if (principal != null) {
            System.out.println("2. 배달된 아이디(Principal): " + principal.getName());
        } else {
            System.out.println("2. 배달 사고 발생! (Principal is NULL)");
        }
        System.out.println("=====================================");
        
        String userId = (principal != null) ? principal.getName() : "testUser";
        MyPage info = mypageService.selectMemberInfo(userId);

        return (info != null)
            ? ResponseEntity.ok(info)
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "사용자를 찾을 수 없습니다."));
    }

    // 2. 기본 정보 업데이트 (닉네임 등)
    @PostMapping("/base/updateInfo")
    public ResponseEntity<?> updateInfo(@RequestBody MyPage dto, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        dto.setUserId(userId);
        
        // 이전에 발생한 ORA-01407 방지: 이름이 null인 경우 기존 정보 유지 로직이 서비스에 있어야 함
        return (mypageService.updateBaseInfo(dto))
            ? ResponseEntity.ok(Map.of("message", "정보 변경 완료"))
            : ResponseEntity.internalServerError().body(Map.of("message", "변경 실패"));
    }

    // 3. 계정 정보 업데이트 (비밀번호, 이메일, 주소 통합) - 새로 추가됨
    @PostMapping("/account/update")
    public ResponseEntity<?> updateAccountInfo(@RequestBody MyPage dto, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        dto.setUserId(userId);

        // 서비스에서 비밀번호 암호화 및 이메일/주소 업데이트 통합 처리
        boolean result = mypageService.updateAccountInfo(dto);

        return result
            ? ResponseEntity.ok(Map.of("message", "계정 정보가 수정되었습니다."))
            : ResponseEntity.internalServerError().body(Map.of("message", "계정 정보 수정 실패"));
    }

    // 4. 비밀번호 확인 (계정 정보 탭 진입 전 인증용)
    @PostMapping("/account/verifyPassword")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> payload, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        String currentPassword = payload.get("password");

        boolean isValid = mypageService.verifyPassword(userId, currentPassword);

        return ResponseEntity.ok(Map.of("success", isValid));
    }

    // --- 프로필 이미지 관련 로직 (기존 유지) ---
    @PostMapping("/base/updateProfileImage")
    public ResponseEntity<?> updateProfileImage(@RequestPart("profileFile") MultipartFile file, Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        String url = mypageService.updateProfileImage(userId, file);
        return (url != null) ? ResponseEntity.ok(Map.of("profileImageUrl", url, "message", "업로드 성공")) : ResponseEntity.internalServerError().body(Map.of("message", "업로드 실패"));
    }

    @PostMapping("/base/deleteProfileImage")
    public ResponseEntity<?> deleteProfileImage(Principal principal) {
        String userId = (principal != null) ? principal.getName() : "testUser";
        return (mypageService.deleteProfileImage(userId)) ? ResponseEntity.ok(Map.of("message", "삭제 완료")) : ResponseEntity.internalServerError().body(Map.of("message", "삭제 실패"));
    }
    
    
}