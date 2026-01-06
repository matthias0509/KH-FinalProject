package com.kh.foodding.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// 판매자 팔로잉 상태 및 팔로워 수를 내려주는 DTO
public class FollowStatusResponse {
    private long sellerNo;
    private long followerCount;
    private boolean following;
}
