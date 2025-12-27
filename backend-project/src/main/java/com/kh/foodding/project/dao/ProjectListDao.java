package com.kh.foodding.project.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.project.model.vo.ProjectList;

@Repository
public class ProjectListDao {

    // 프로젝트 상세 조회용
    public ProjectList selectDetail(SqlSessionTemplate sqlSession, long productNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        return sqlSession.selectOne("projectListMapper.selectProject", params);
    }

    public List<ProjectList> selectRecentProjects(SqlSessionTemplate sqlSession, int limit) {
        Map<String, Object> params = new HashMap<>();
        params.put("limit", limit);
        return sqlSession.selectList("projectListMapper.selectRecentProjects", params);
    }

    public List<ProjectList> selectAllProjects(SqlSessionTemplate sqlSession, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        return sqlSession.selectList("projectListMapper.selectAllProjects", params);
    }

    public int updateProductVisibility(SqlSessionTemplate sqlSession, long productNo, String productYn) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("productYn", productYn);
        return sqlSession.update("projectListMapper.updateProductVisibility", params);
    }

}
