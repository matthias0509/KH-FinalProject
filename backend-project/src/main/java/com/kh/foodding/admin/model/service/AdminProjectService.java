package com.kh.foodding.admin.model.service;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.admin.model.dao.AdminProjectDao;
import com.kh.foodding.admin.model.vo.AdminProject;

@Service
public class AdminProjectService {

    @Autowired
    private AdminProjectDao dao;
    
    @Autowired
    private SqlSessionTemplate sqlSession;

    // 목록 조회
    public List<AdminProject> getProjectList(String status) {
        // 프론트의 'WAITING' 등을 DB 값으로 변환 필요 시 여기서 처리
        return dao.selectProjectList(sqlSession, status);
    }

    // 상세 조회 (프로젝트 정보 + 리워드 정보 합치기)
    public AdminProject getProjectDetail(int productNo) {
        AdminProject project = dao.selectProjectDetail(sqlSession, productNo);
        if (project != null) {
            project.setRewards(dao.selectRewards(sqlSession, productNo));
        }
        return project;
    }

    // 심사 처리
    @Transactional
    public boolean reviewProject(int productNo, String action, String reason) {
        String dbStatus = "";
        
        // 프론트 액션 -> DB 상태값 매핑
        if ("APPROVE".equals(action)) {
            dbStatus = "OPEN"; // 승인 시 '진행중' 상태로 변경
        } else if ("REJECT".equals(action)) {
            dbStatus = "REJECT"; // 반려 상태
        } else {
            return false;
        }
        
        return dao.updateProjectStatus(sqlSession, productNo, dbStatus, reason) > 0;
    }
}