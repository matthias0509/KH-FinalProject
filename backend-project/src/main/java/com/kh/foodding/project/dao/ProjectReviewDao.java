package com.kh.foodding.project.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.project.dto.ProjectReviewDetail;
import com.kh.foodding.project.dto.ProjectReviewReward;
import com.kh.foodding.project.dto.ProjectReviewSummary;

@Repository
// 프로젝트 심사 전용 MyBatis DAO
public class ProjectReviewDao {

    // 상태별 심사 대상 목록
    public List<ProjectReviewSummary> selectProjects(SqlSessionTemplate sqlSession, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        return sqlSession.selectList("projectReviewMapper.selectProjects", params);
    }

    // 심사 상세 정보 조회
    public ProjectReviewDetail selectProjectDetail(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectOne("projectReviewMapper.selectProjectDetail", productNo);
    }

    // 심사 상세 화면에 필요한 리워드 목록
    public List<ProjectReviewReward> selectProjectRewards(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectList("projectReviewMapper.selectProjectRewards", productNo);
    }

    // 승인 처리 (OPEN 전환)
    public int approveProject(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.update("projectReviewMapper.approveProject", productNo);
    }

    // 반려 처리 및 사유 저장
    public int rejectProject(SqlSessionTemplate sqlSession, long productNo, String reason) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("reason", reason);
        return sqlSession.update("projectReviewMapper.rejectProject", params);
    }
}
