package com.kh.foodding.createProject.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.createProject.model.vo.Project;

@Repository
public class ProjectDao {
    
    public int insertProject(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.insert("projectMapper.insertProject", p);
    }

     public int imsiProject(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.insert("projectMapper.imsiProject", p);
    }

    public int updateDraft(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.update("projectMapper.updateDraft", p);
    }

    public ArrayList<Project> selectProject(SqlSessionTemplate sqlSession, int userNo){
        Map<String, Object> params = new HashMap<>();
        params.put("userNo", userNo);

        return (ArrayList)sqlSession.selectList("projectMapper.selectProject", params);
    }

    public Project selectProjectById(SqlSessionTemplate sqlSession, int userNo, long tempNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("userNo", userNo);
        params.put("tempNo", tempNo);

        return sqlSession.selectOne("projectMapper.selectProjectById", params);
    }
}
