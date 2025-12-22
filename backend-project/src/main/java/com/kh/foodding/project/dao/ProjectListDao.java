package com.kh.foodding.project.dao;

import java.util.HashMap;
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
}
