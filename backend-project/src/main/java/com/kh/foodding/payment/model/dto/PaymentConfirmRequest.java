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
    private Integer amount;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String address;
    private String postcode;
    private Integer quantity;
    private Integer optionNo;
    private Integer userNo;
}