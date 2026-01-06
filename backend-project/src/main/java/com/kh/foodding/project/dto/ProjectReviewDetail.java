package com.kh.foodding.project.dto;

import java.util.Collections;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
// 프로젝트 심사 상세 정보(요약 정보 + 설명/리워드/반려사유)
public class ProjectReviewDetail extends ProjectReviewSummary {
    private String productDesc;
    private String storyHtml;
    private String storyJson;
    private String originThumbnail;
    private String modifyThumbnail;
    private String rejectReason;
    private List<ProjectReviewReward> rewards = Collections.emptyList();
}
