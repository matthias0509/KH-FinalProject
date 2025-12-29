package com.kh.foodding.seller.model.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerApplication {

    private Long applicationNo;
    private Long userNo;
    private String applicantName;
    private String applicantEmail;
    private String applicantPhone;
    private String businessName;
    private String businessNumber;
    private String website;
    private String brandDescription;
    private String documentPath;
    private String status;
    private String adminMemo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
