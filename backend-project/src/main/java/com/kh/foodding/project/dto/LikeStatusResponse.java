package com.kh.foodding.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeStatusResponse {
    private long productNo;
    private long likeCount;
    private boolean liked;
}
