package com.kh.foodding.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewCreateRequest {
    private String orderNo;
    private String title;
    private String content;
    private Integer rating;
}
