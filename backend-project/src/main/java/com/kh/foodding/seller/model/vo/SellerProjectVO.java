package com.kh.foodding.seller.model.vo;

import lombok.Data;

@Data
public class SellerProjectVO {
    private int productNo;
    private String title;
    private String thumbnail;
    private int currentAmount;
    private int targetAmount;
    private int achievementRate; // 달성률
    private String endDate;      // 남은 기간 계산용
}