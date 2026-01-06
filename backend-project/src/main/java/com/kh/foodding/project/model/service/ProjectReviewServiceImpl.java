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
// 프로젝트 심사(승인/반려) 흐름을 담당하는 서비스 구현체
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
    // 상태별로 심사 대상 프로젝트를 조회
    public List<ProjectReviewSummary> getProjects(String status) {
        String normalized = normalizeStatus(status);
        List<ProjectReviewSummary> projects = projectReviewDao.selectProjects(sqlSession, normalized);
        return projects == null ? Collections.emptyList() : projects;
    }

    @Override
    // 단일 프로젝트의 심사 상세(리워드 포함) 조회
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
    // 심사 결과를 승인/반려로 기록하고 갱신된 상세 정보를 반환
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

    // 허용된 상태 코드만 반환하도록 정규화
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

    // 심사 액션 문자열을 승인/반려 둘 중 하나로 제한
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
