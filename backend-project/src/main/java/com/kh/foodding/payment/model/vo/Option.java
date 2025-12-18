package com.kh.foodding.payment.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Option {
    private Integer optionNo;
    private String optionName;
    private String optionContent;
    private Integer optionPrice;
    private Integer productNo;
}