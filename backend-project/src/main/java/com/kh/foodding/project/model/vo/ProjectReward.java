package com.kh.foodding.project.model.vo;

import java.math.BigDecimal;

import lombok.Data;

@Data
// 프로젝트에 속한 리워드 옵션 정보를 보관하는 VO
public class ProjectReward {
    private Long optionNo;
    private String title;
    private BigDecimal price;
    private String description;
}
