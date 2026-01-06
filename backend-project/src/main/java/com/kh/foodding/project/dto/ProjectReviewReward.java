package com.kh.foodding.project.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
// 심사 상세 화면에 노출되는 리워드 요약 DTO
public class ProjectReviewReward {
    private String title;
    private BigDecimal price;
    private String description;
}
