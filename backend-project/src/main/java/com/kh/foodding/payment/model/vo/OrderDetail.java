package com.kh.foodding.payment.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class OrderDetail {
    private Integer quantity;
    private String orderNo;
    private Integer optionNo;
}