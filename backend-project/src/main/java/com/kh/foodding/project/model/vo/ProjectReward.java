package com.kh.foodding.project.model.vo;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProjectReward {
    private Long optionNo;
    private String title;
    private BigDecimal price;
    private String description;
}
