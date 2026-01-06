package com.kh.foodding.project.model.service;

import java.util.List;

import com.kh.foodding.project.dto.ProjectReviewDetail;
import com.kh.foodding.project.dto.ProjectReviewSummary;

// 프로젝트 심사(승인/반려) 프로세스를 정의한 서비스 인터페이스
public interface ProjectReviewService {

    List<ProjectReviewSummary> getProjects(String status);

    ProjectReviewDetail getProjectDetail(long productNo);

    ProjectReviewDetail reviewProject(long productNo, String action, String reason);
}
