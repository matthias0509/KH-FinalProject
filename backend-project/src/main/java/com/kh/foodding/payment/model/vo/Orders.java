package com.kh.foodding.payment.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Orders {
    private String orderNo;
    private Integer orderAmount;
    private Date orderDate;
    private String orderStatus;      // PAY, CANCLE, REFUND, PENDING
    private String deliveryStatus;   // READY, SHIPPING, DELIVERED
    private String postcode;
    private String address;
    private Integer userNo;
}