package com.kh.foodding.createProject.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.createProject.model.vo.Project;

@Repository
public class ProjectDao {
    
    // 프로젝트 생성
    public int insertProject(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.insert("projectMapper.insertProject", p);
    }
    
    // 프로젝트 임시저장
     public int imsiProject(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.insert("projectMapper.imsiProject", p);
    }

    // 임시저장된 프로젝트 수정 (이어쓰기)
    public int updateDraft(SqlSessionTemplate sqlSession, Project p){
        return sqlSession.update("projectMapper.updateDraft", p);
    }

    public ArrayList<Project> selectProject(SqlSessionTemplate sqlSession, Long sellerNo){
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);

        return (ArrayList)sqlSession.selectList("projectMapper.selectProject", params);
    }

    //
    public Project selectProjectById(SqlSessionTemplate sqlSession, Long sellerNo, long tempNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("tempNo", tempNo);

        return sqlSession.selectOne("projectMapper.selectProjectById", params);
    }

    // 리워드 옵션 
    public List<Project.Reward> selectTempOptions(SqlSessionTemplate sqlSession, long tempNo) {
        return sqlSession.selectList("projectMapper.selectTempOptions", tempNo);
    }

    // 임시저장 프로젝트 삭제
    public int deleteProject(SqlSessionTemplate sqlSession, Long sellerNo, long tempNo){
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("tempNo", tempNo);

        return sqlSession.update("projectMapper.deleteProject", params);
    }

    //
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
