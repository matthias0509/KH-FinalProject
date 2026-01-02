package com.kh.foodding.mypage.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.mypage.model.service.MyPageService;
import com.kh.foodding.mypage.model.vo.FollowedSeller;
import com.kh.foodding.mypage.model.vo.FundingHistory;
import com.kh.foodding.mypage.model.vo.LikedProject;
import com.kh.foodding.mypage.model.vo.MyPage;

@RestController
@RequestMapping("/api/mypage")
public class MyPageController {

    @Autowired
    private MyPageService mypageService;

    /**
     * 1. 마이페이지 메인 정보
     */
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        Map<String, Object> info = mypageService.getMyPageInfo(userId);
        
        return (info != null)
            ? ResponseEntity.ok(info)
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "사용자를 찾을 수 없습니다."));
    }

    /**
     * 2. 좋아요한 프로젝트 목록 조회
     */
    @GetMapping("/like")
    public ResponseEntity<?> getLikedProjects(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }

        String userId = principal.getName();
        List<LikedProject> list = mypageService.getLikedProjects(userId);
        
        return ResponseEntity.ok(list);
    }

    // 3. 기본 정보 업데이트
    @PostMapping("/base/updateInfo")
    public ResponseEntity<?> updateInfo(@RequestBody MyPage dto, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        dto.setUserId(userId);
        
        return (mypageService.updateBaseInfo(dto))
            ? ResponseEntity.ok(Map.of("message", "정보 변경 완료"))
            : ResponseEntity.internalServerError().body(Map.of("message", "변경 실패"));
    }

    // 4. 계정 정보 업데이트
    @PostMapping("/account/update")
    public ResponseEntity<?> updateAccountInfo(@RequestBody MyPage dto, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        dto.setUserId(userId);

        boolean result = mypageService.updateAccountInfo(dto);

        return result
            ? ResponseEntity.ok(Map.of("message", "계정 정보가 수정되었습니다."))
            : ResponseEntity.internalServerError().body(Map.of("message", "계정 정보 수정 실패"));
    }

    // 5. 비밀번호 확인
    @PostMapping("/account/verifyPassword")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> payload, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        String currentPassword = payload.get("password");

        boolean isValid = mypageService.verifyPassword(userId, currentPassword);

        return ResponseEntity.ok(Map.of("success", isValid));
    }

    // --- 프로필 이미지 관련 ---
    @PostMapping("/base/updateProfileImage")
    public ResponseEntity<?> updateProfileImage(@RequestPart("profileFile") MultipartFile file, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        
        String userId = principal.getName();
        return (mypageService.deleteProfileImage(userId)) 
            ? ResponseEntity.ok(Map.of("message", "삭제 완료")) 
            : ResponseEntity.internalServerError().body(Map.of("message", "삭제 실패"));
    }
    
    // 6. 내 후원 내역 조회 (전체)
    @GetMapping("/funding/history")
    public ResponseEntity<?> getFundingHistory(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인 필요"));
        }
        
        String userId = principal.getName();
        List<FundingHistory> list = mypageService.getFundingHistory(userId);
        
        return ResponseEntity.ok(list);
    }

    // 7. 🚨 [추가됨] 내 후원 취소 내역 조회 (GET)
    // 이 부분이 없어서 404 에러가 났던 것입니다.
    @GetMapping("/funding/cancel")
    public ResponseEntity<?> getCanceledFundingHistory(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인 필요"));
        }
        
        String userId = principal.getName();
        List<FundingHistory> list = mypageService.getCanceledFundingHistory(userId);
        
        return ResponseEntity.ok(list);
    }
    
    // 8. 팔로우 목록 조회
    @GetMapping("/follow")
    public ResponseEntity<?> getFollowList(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }

        String userId = principal.getName();
        List<FollowedSeller> list = mypageService.getFollowList(userId);
        
        return ResponseEntity.ok(list);
    }
    
    // 9. 후원 내역 상세 조회
    @GetMapping("/funding/{fundingNo}")
    public ResponseEntity<?> getFundingDetail(
            @PathVariable("fundingNo") String fundingNo, 
            Principal principal
    ) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        String userId = principal.getName();
        
        MyPage member = mypageService.selectMemberInfo(userId);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("회원 정보를 찾을 수 없습니다.");
        }
        int userNo = member.getUserNo();
        
        Map<String, Object> detail = mypageService.selectFundingDetail(fundingNo, userNo);

        if (detail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 후원 내역을 찾을 수 없습니다.");
        }

        return ResponseEntity.ok(detail);
    }
    
    // 10. 후원 취소 요청 (POST)
    @PostMapping("/funding/cancel")
    public ResponseEntity<?> cancelFunding(@RequestBody Map<String, String> request, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();

        String userId = principal.getName();
        int userNo = mypageService.selectMemberInfo(userId).getUserNo(); 
        String orderNo = request.get("orderNo");

        int result = mypageService.cancelFunding(orderNo, userNo); 

        if (result > 0) {
            return ResponseEntity.ok("후원이 성공적으로 취소되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("취소할 수 없는 상태이거나 주문을 찾을 수 없습니다.");
        }
    }
    
    
}