package com.kh.foodding.createProject.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.createProject.model.vo.Project;

@Repository
public class ProjectDao {
    
    public int insertProject(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.insert("projectMapper.insertProject", p);
    }
}
