package com.kh.foodding.mypage.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.mypage.model.service.MyPageService;
import com.kh.foodding.mypage.model.vo.FollowedSeller;
import com.kh.foodding.mypage.model.vo.FundingHistory;
import com.kh.foodding.mypage.model.vo.LikedProject;
import com.kh.foodding.mypage.model.vo.MyPage;

@RestController
@RequestMapping("/api/mypage")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MyPageController {

    @Autowired
    private MyPageService mypageService;

    /**
     * 1. 마이페이지 메인 정보 (회원정보 + 통계)
     * 기존 getInfo를 업그레이드하여 '통계(좋아요 수 등)'까지 포함해서 반환합니다.
     */
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(Principal principal) {
        
        // 1. 인증 체크
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        
        // 2. 서비스 호출 (회원정보 + 통계 Map 반환)
        Map<String, Object> info = mypageService.getMyPageInfo(userId);
        
        // 3. 응답 반환
        return (info != null)
            ? ResponseEntity.ok(info)
            : ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "사용자를 찾을 수 없습니다."));
    }

    /**
     * ✅ [추가] 좋아요한 프로젝트 목록 조회
     */
    @GetMapping("/like")
    public ResponseEntity<?> getLikedProjects(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }

        String userId = principal.getName();
        
        // 서비스 호출 -> 좋아요 목록(List<LikedProject>) 반환
        List<LikedProject> list = mypageService.getLikedProjects(userId);
        
        return ResponseEntity.ok(list);
    }

    // 2. 기본 정보 업데이트 (닉네임 등)
    @PostMapping("/base/updateInfo")
    public ResponseEntity<?> updateInfo(@RequestBody MyPage dto, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        dto.setUserId(userId);
        
        return (mypageService.updateBaseInfo(dto))
            ? ResponseEntity.ok(Map.of("message", "정보 변경 완료"))
            : ResponseEntity.internalServerError().body(Map.of("message", "변경 실패"));
    }

    // 3. 계정 정보 업데이트 (비밀번호, 이메일, 주소 통합)
    @PostMapping("/account/update")
    public ResponseEntity<?> updateAccountInfo(@RequestBody MyPage dto, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        dto.setUserId(userId);

        boolean result = mypageService.updateAccountInfo(dto);

        return result
            ? ResponseEntity.ok(Map.of("message", "계정 정보가 수정되었습니다."))
            : ResponseEntity.internalServerError().body(Map.of("message", "계정 정보 수정 실패"));
    }

    // 4. 비밀번호 확인 (계정 정보 탭 진입 전 인증용)
    @PostMapping("/account/verifyPassword")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> payload, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        String currentPassword = payload.get("password");

        boolean isValid = mypageService.verifyPassword(userId, currentPassword);

        return ResponseEntity.ok(Map.of("success", isValid));
    }

    // --- 프로필 이미지 관련 로직 ---
    @PostMapping("/base/updateProfileImage")
    public ResponseEntity<?> updateProfileImage(@RequestPart("profileFile") MultipartFile file, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        String url = mypageService.updateProfileImage(userId, file);
        return (url != null) 
            ? ResponseEntity.ok(Map.of("profileImageUrl", url, "message", "업로드 성공")) 
            : ResponseEntity.internalServerError().body(Map.of("message", "업로드 실패"));
    }

    @PostMapping("/base/deleteProfileImage")
    public ResponseEntity<?> deleteProfileImage(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        return (mypageService.deleteProfileImage(userId)) 
            ? ResponseEntity.ok(Map.of("message", "삭제 완료")) 
            : ResponseEntity.internalServerError().body(Map.of("message", "삭제 실패"));
    }
    
 // 3. 내 후원 내역 조회
    @GetMapping("/funding/history")
    public ResponseEntity<?> getFundingHistory(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인 필요"));
        }
        
        String userId = principal.getName();
        List<FundingHistory> list = mypageService.getFundingHistory(userId);
        
        return ResponseEntity.ok(list);
    }
    
    // 4. 팔로우 목록 조회
    @GetMapping("/follow")
    public ResponseEntity<?> getFollowList(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }

        String userId = principal.getName();
        List<FollowedSeller> list = mypageService.getFollowList(userId);
        
        return ResponseEntity.ok(list);
    }
    

}