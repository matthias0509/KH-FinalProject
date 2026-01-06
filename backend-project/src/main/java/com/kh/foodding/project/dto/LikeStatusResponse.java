package com.kh.foodding.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// 프로젝트별 좋아요 수와 로그인 사용자의 상태를 담는 DTO
public class LikeStatusResponse {
    private long productNo;
    private long likeCount;
    private boolean liked;
}
