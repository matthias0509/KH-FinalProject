package com.kh.foodding.project.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.project.model.vo.ProjectList;
import com.kh.foodding.project.model.vo.ProjectReward;

@Repository
// 프로젝트 목록 관련 MyBatis 호출을 담당하는 DAO
public class ProjectListDao {

    // 프로젝트 상세 조회용
    public ProjectList selectDetail(SqlSessionTemplate sqlSession, long productNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        return sqlSession.selectOne("projectListMapper.selectProject", params);
    }

    // 최신 프로젝트(검색어 포함) 목록 조회
    public List<ProjectList> selectRecentProjects(SqlSessionTemplate sqlSession, int limit, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("limit", limit);
        params.put("keyword", keyword);
        return sqlSession.selectList("projectListMapper.selectRecentProjects", params);
    }

    // 관리자 페이지용 전체 목록
    public List<ProjectList> selectAllProjects(SqlSessionTemplate sqlSession, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        return sqlSession.selectList("projectListMapper.selectAllProjects", params);
    }

    // 관리자 노출 상태 변경
    public int updateProductVisibility(SqlSessionTemplate sqlSession, long productNo, String productYn) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("productYn", productYn);
        return sqlSession.update("projectListMapper.updateProductVisibility", params);
    }

    // 상세 화면에서 필요한 리워드 목록 조회
    public List<ProjectReward> selectProjectRewards(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectList("projectListMapper.selectProjectRewards", productNo);
    }

}
