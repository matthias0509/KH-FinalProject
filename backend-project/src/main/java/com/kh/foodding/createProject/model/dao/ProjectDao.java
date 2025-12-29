package com.kh.foodding.createProject.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

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

    public List<Project.Reward> selectTempOptions(SqlSessionTemplate sqlSession, long tempNo) {
        return sqlSession.selectList("projectMapper.selectTempOptions", tempNo);
    }

    public int deleteProject(SqlSessionTemplate sqlSession, int userNo, long tempNo){
        Map<String, Object> params = new HashMap<>();
        params.put("userNo", userNo);
        params.put("tempNo", tempNo);

        return sqlSession.update("projectMapper.deleteProject", params);
    }


    public int insertTempOption(SqlSessionTemplate sqlSession, Long tempNo, Project.Reward reward) {
        Map<String, Object> params = new HashMap<>();
        params.put("tempNo", tempNo);
        params.put("title", reward.getTitle());
        params.put("description", reward.getDescription());
        params.put("price", reward.getPrice());
        return sqlSession.insert("projectMapper.insertTempOption", params);
    }

    public int deleteTempOptions(SqlSessionTemplate sqlSession, Long tempNo) {
        return sqlSession.delete("projectMapper.deleteTempOptions", tempNo);
    }

    public int insertProductOption(SqlSessionTemplate sqlSession, Long productNo, Project.Reward reward) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("title", reward.getTitle());
        params.put("description", reward.getDescription());
        params.put("price", reward.getPrice());
        return sqlSession.insert("projectMapper.insertProductOption", params);
    }

    public int deleteProductOptions(SqlSessionTemplate sqlSession, Long productNo) {
        return sqlSession.delete("projectMapper.deleteProductOptions", productNo);
    }

}
