package com.kh.foodding.project.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectList {

    private Long productNo;
    private String productTitle;
    private String productDesc;
    private String storyHtml;
    private String storyJson;
    private BigDecimal targetAmount;
    private BigDecimal currentAmount;
    private LocalDate fundStartDate;
    private LocalDate fundEndDate;
    private LocalDate shipStartDate;
    private String productStatus;
    private String category;
    private String originThumbnail;
    private String modifyThumbnail;
    private LocalDateTime createDate;
    private String productYn;
    private Long sellerNo;
    private SellerProfile sellerProfile;
    private List<ProjectReward> rewards = Collections.emptyList();
}
