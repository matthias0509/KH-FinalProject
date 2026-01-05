package com.kh.foodding.review.model.vo;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Review {
    private Long reviewNo;
    private String reviewTitle;
    private String reviewContent;
    private LocalDateTime reviewCreateDate;
    private Integer rating;
    private String orderNo;
    private Integer userNo;
    private Long productNo;
    private String productTitle;
    private String nickname;
    private String profileImage;
}
