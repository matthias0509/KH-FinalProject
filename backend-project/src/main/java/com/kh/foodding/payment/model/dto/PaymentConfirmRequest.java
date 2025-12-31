package com.kh.foodding.payment.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PaymentConfirmRequest {
    private String paymentKey;
    private String orderId;
    private Integer amount;  // 토스 검증용 총 금액 (상품 + 배송비)
    private Integer productAmount;  // 실제 상품 금액만 (배송비 제외)
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String address;
    private String postcode;
    private Integer quantity;
    private Integer optionNo;
    private Integer userNo;
}