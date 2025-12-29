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
public class ProjectReviewDao {

    public List<ProjectReviewSummary> selectProjects(SqlSessionTemplate sqlSession, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        return sqlSession.selectList("projectReviewMapper.selectProjects", params);
    }

    public ProjectReviewDetail selectProjectDetail(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectOne("projectReviewMapper.selectProjectDetail", productNo);
    }

    public List<ProjectReviewReward> selectProjectRewards(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectList("projectReviewMapper.selectProjectRewards", productNo);
    }

    public int approveProject(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.update("projectReviewMapper.approveProject", productNo);
    }

    public int rejectProject(SqlSessionTemplate sqlSession, long productNo, String reason) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("reason", reason);
        return sqlSession.update("projectReviewMapper.rejectProject", params);
    }
}
