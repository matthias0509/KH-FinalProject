package com.kh.foodding.maker.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.maker.model.service.MakerService;
import com.kh.foodding.mypage.model.service.MyPageService; 

@RestController
@RequestMapping("/api/maker")
public class MakerController {

    @Autowired
    private MakerService makerService;
    
    @Autowired
    private MyPageService myPageService; 

    /**
     * 1. 메이커 대시보드 통계 (상단 통계 + 프로젝트 현황 + 최근 프로젝트)
     */
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();

        String userId = principal.getName();
        int userNo = myPageService.selectMemberInfo(userId).getUserNo();

        Map<String, Object> data = makerService.getMakerDashboard(userNo);
        
        if (data == null) {
            return ResponseEntity.status(403).body("판매자 권한이 없습니다.");
        }

        return ResponseEntity.ok(data);
    }

    /**
     * 2. 내 프로젝트 리스트 조회 (작성중, 진행중, 종료 등 상태별)
     */
    @GetMapping("/projects")
    public ResponseEntity<?> getProjectList(
            @RequestParam(value = "status", defaultValue = "draft") String status,
            Principal principal
    ) {
        if (principal == null) return ResponseEntity.status(401).build();
        
        String userId = principal.getName();
        int userNo = myPageService.selectMemberInfo(userId).getUserNo();

        // 서비스 호출
        List<Map<String, Object>> list = makerService.getProjectList(userNo, status);
        
        return ResponseEntity.ok(list);
    }
    
    /**
     * 3. 정산 내역 조회 (수수료 제외 전 원금 및 상태 정보 반환)
     */
    @GetMapping("/settlement")
    public ResponseEntity<?> getSettlementList(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        
        String userId = principal.getName();
        int userNo = myPageService.selectMemberInfo(userId).getUserNo();

        // 정산 리스트 조회
        List<Map<String, Object>> list = makerService.getSettlementList(userNo);
        
        return ResponseEntity.ok(list);
    }
}