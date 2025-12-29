package com.kh.foodding.project.model.service;

import java.util.List;

import com.kh.foodding.project.dto.ProjectReviewDetail;
import com.kh.foodding.project.dto.ProjectReviewSummary;

public interface ProjectReviewService {

    List<ProjectReviewSummary> getProjects(String status);

    ProjectReviewDetail getProjectDetail(long productNo);

    ProjectReviewDetail reviewProject(long productNo, String action, String reason);
}
