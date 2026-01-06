package com.kh.foodding.project.dto;

import lombok.Data;

@Data
// 관리자 심사 액션을 전달받는 DTO (승인/반려 + 사유)
public class ProjectReviewActionRequest {
    private String action;
    private String reason;
}
