package com.kh.foodding.payment.model.dao;

import lombok.Data;

@Data
public class PaymentConfirmRequest {
    private String paymentKey;
    private String orderId;
    private Integer amount;
}