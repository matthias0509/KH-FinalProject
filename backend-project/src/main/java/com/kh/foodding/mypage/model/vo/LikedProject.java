package com.kh.foodding.mypage.model.vo;

import lombok.Data;

@Data
public class LikedProject {
	private int productNo;          // PRODUCT_NO
    private String productTitle;    // PRODUCT_TITLE
    private String thumbnail;       // MODIFY_THUMBNAIL
    private String sellerName;      // NICKNAME (판매자의 닉네임)
    private int fundingPercent;     // 달성률 계산값
}
