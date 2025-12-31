package com.kh.foodding.mypage.model.vo;

import lombok.Data;

@Data
public class FundingHistory {
    private String orderNo;         // 주문 번호 (ID 역할)
    private String fundingDate;     // 후원 날짜 (ORDER_DATE)
    private String projectTitle;    // 프로젝트 제목 (TB_PRODUCT)
    private String makerName;       // 메이커 이름 (TB_SELLER -> TB_USER)
    private int totalAmount;        // 결제 금액 (TB_ORDER)
    private String fundingStatus;   // 상태 (결제완료/펀딩성공 등)
    private String projectThumb;    // 썸네일 이미지 (TB_PRODUCT)
    private int productNo;          // 상품 번호 (상세페이지 이동용)
}