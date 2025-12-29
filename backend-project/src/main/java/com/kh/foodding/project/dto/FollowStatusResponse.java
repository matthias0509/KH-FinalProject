package com.kh.foodding.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowStatusResponse {
    private long sellerNo;
    private long followerCount;
    private boolean following;
}
