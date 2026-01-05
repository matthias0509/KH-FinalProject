package com.kh.foodding.admin.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminFunding {
    
    private String orderNo;       // 주문번호 (ORDER_NO)
    private String userId;        // 후원자 아이디 (USER_ID)
    private String fundingDate;   // 후원 일자 (ORDER_DATE -> YYYY-MM-DD)
    
    private String projectTitle;  // 프로젝트명 (PRODUCT_TITLE)
    private long totalAmount;     // 결제 금액 (ORDER_AMOUNT)
    
    private String fundingStatus; // 결제 상태 (ORDER_STATUS: PAY, CANCEL 등)
    private String deliveryStatus;// 배송 상태 (DELIVERY_STATUS)
    
}