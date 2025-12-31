package com.kh.foodding.mypage.model.vo;

import lombok.Data;

@Data
public class FollowedSeller {
    private int sellerNo;       // 판매자 번호 (PK)
    private String sellerName;  // 닉네임 (TB_USER)
    private String sellerBio;   // 소개글 (SELLER_PROFILE)
    private String sellerImage; // 프로필 이미지 (TB_USER)
}