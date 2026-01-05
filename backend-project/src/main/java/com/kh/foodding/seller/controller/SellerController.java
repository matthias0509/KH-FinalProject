package com.kh.foodding.seller.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.maker.model.service.MakerService;

@RestController
@RequestMapping("/api/seller")
public class SellerController {

    @Autowired
    private MakerService makerService;

    /**
     * 특정 판매자의 기본 정보 조회
     */
    @GetMapping("/{sellerNo}")
    public ResponseEntity<?> getSellerInfo(@PathVariable("sellerNo") int sellerNo, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        try {
            System.out.println("===== 판매자 정보 조회 시작 =====");
            System.out.println("요청 sellerNo: " + sellerNo);
            
            Map<String, Object> sellerInfo = makerService.getSellerInfo(sellerNo);
            
            System.out.println("조회 결과: " + sellerInfo);
            
            if (sellerInfo == null || sellerInfo.isEmpty()) {
                System.out.println("판매자 정보 없음");
                return ResponseEntity.status(404).body("판매자를 찾을 수 없습니다.");
            }
            
            System.out.println("===== 판매자 정보 조회 성공 =====");
            return ResponseEntity.ok(sellerInfo);
            
        } catch (Exception e) {
            System.err.println("===== 판매자 정보 조회 실패 =====");
            e.printStackTrace();
            return ResponseEntity.status(500).body("판매자 정보 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 특정 판매자의 공개 프로필 정보 (프로젝트 목록 + 통계)
     */
    @GetMapping("/{sellerNo}/public")
    public ResponseEntity<?> getSellerPublicProfile(@PathVariable("sellerNo") int sellerNo, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        try {
            System.out.println("===== 판매자 공개 프로필 조회 시작 =====");
            System.out.println("요청 sellerNo: " + sellerNo);
            
            Map<String, Object> publicProfile = makerService.getSellerPublicProfile(sellerNo);
            
            System.out.println("조회 결과: " + publicProfile);
            
            if (publicProfile == null || publicProfile.isEmpty()) {
                System.out.println("판매자 프로필 정보 없음");
                return ResponseEntity.status(404).body("판매자를 찾을 수 없습니다.");
            }
            
            System.out.println("===== 판매자 공개 프로필 조회 성공 =====");
            return ResponseEntity.ok(publicProfile);
            
        } catch (Exception e) {
            System.err.println("===== 판매자 공개 프로필 조회 실패 =====");
            e.printStackTrace();
            return ResponseEntity.status(500).body("판매자 프로필 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}