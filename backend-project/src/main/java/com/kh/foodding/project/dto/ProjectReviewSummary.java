package com.kh.foodding.project.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProjectReviewSummary {
    private Long productNo;
    private String productTitle;
    private String category;
    private BigDecimal targetAmount;
    private BigDecimal currentAmount;
    private LocalDate fundStartDate;
    private LocalDate fundEndDate;
    private LocalDate shipStartDate;
    private LocalDateTime createDate;
    private String productStatus;
    private String approvalStatus;
    private String productYn;
    private Long sellerNo;
    private String sellerName;
    private String sellerNickname;
    private String sellerEmail;
    private String sellerPhone;
}
