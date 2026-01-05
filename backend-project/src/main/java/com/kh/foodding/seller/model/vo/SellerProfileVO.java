package com.kh.foodding.seller.model.vo;

import lombok.Data;
import java.util.List;

@Data
public class SellerProfileVO {
    // 판매자 기본 정보
    private int sellerNo;
    private String sellerName;     // 닉네임 (TB_USER)
    private String sellerImage;    // 프로필 이미지 (TB_USER)
    private String introduction;   // 소개글 (SELLER_PROFILE)
    private String sellerEmail;    // 문의 이메일
    
    // 통계 정보
    private int followerCount;     // 나를 팔로우하는 사람 수
    private int projectCount;      // 진행한 프로젝트 수
    
    // 판매자가 올린 프로젝트 목록
    private List<SellerProjectVO> projectList;
}