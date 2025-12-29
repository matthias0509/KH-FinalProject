package com.kh.foodding.project.model.service;

import java.util.Collections;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.project.dao.ProjectReviewDao;
import com.kh.foodding.project.dto.ProjectReviewDetail;
import com.kh.foodding.project.dto.ProjectReviewReward;
import com.kh.foodding.project.dto.ProjectReviewSummary;

@Service
public class ProjectReviewServiceImpl implements ProjectReviewService {

    private static final String STATUS_WAITING = "WAITING";
    private static final String STATUS_OPEN = "OPEN";
    private static final String STATUS_REJECT = "REJECT";
    private static final String ACTION_APPROVE = "APPROVE";
    private static final String ACTION_REJECT = "REJECT";

    @Autowired
    private ProjectReviewDao projectReviewDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<ProjectReviewSummary> getProjects(String status) {
        String normalized = normalizeStatus(status);
        List<ProjectReviewSummary> projects = projectReviewDao.selectProjects(sqlSession, normalized);
        return projects == null ? Collections.emptyList() : projects;
    }

    @Override
    public ProjectReviewDetail getProjectDetail(long productNo) {
        if (productNo <= 0) {
            throw new IllegalArgumentException("유효하지 않은 프로젝트 번호입니다.");
        }
        ProjectReviewDetail detail = projectReviewDao.selectProjectDetail(sqlSession, productNo);
        if (detail == null) {
            return null;
        }
        List<ProjectReviewReward> rewards = projectReviewDao.selectProjectRewards(sqlSession, productNo);
        detail.setRewards(rewards == null ? Collections.emptyList() : rewards);
        return detail;
    }

    @Override
    @Transactional
    public ProjectReviewDetail reviewProject(long productNo, String action, String reason) {
        String normalizedAction = normalizeAction(action);
        if (productNo <= 0 || normalizedAction == null) {
            throw new IllegalArgumentException("프로젝트 심사 정보가 올바르지 않습니다.");
        }

        int updated;
        if (ACTION_APPROVE.equals(normalizedAction)) {
            updated = projectReviewDao.approveProject(sqlSession, productNo);
        } else {
            if (reason == null || reason.trim().isEmpty()) {
                throw new IllegalArgumentException("반려 사유를 입력해주세요.");
            }
            updated = projectReviewDao.rejectProject(sqlSession, productNo, reason.trim());
        }

        if (updated == 0) {
            throw new IllegalStateException("프로젝트 정보를 찾을 수 없습니다.");
        }

        return getProjectDetail(productNo);
    }

    private String normalizeStatus(String status) {
        if (status == null) {
            return "ALL";
        }
        String upper = status.trim().toUpperCase();
        if (upper.isEmpty()) {
            return "ALL";
        }
        if (STATUS_WAITING.equals(upper) || STATUS_OPEN.equals(upper) || STATUS_REJECT.equals(upper)) {
            return upper;
        }
        if ("ALL".equals(upper)) {
            return "ALL";
        }
        return "ALL";
    }

    private String normalizeAction(String action) {
        if (action == null) {
            return null;
        }
        String upper = action.trim().toUpperCase();
        if (ACTION_APPROVE.equals(upper) || ACTION_REJECT.equals(upper)) {
            return upper;
        }
        return null;
    }
}
