package com.kh.foodding.project.dto;

import java.util.Collections;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectReviewDetail extends ProjectReviewSummary {
    private String productDesc;
    private String storyHtml;
    private String storyJson;
    private String originThumbnail;
    private String modifyThumbnail;
    private String rejectReason;
    private List<ProjectReviewReward> rewards = Collections.emptyList();
}
