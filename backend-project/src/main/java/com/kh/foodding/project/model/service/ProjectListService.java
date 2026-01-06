package com.kh.foodding.project.model.service;

import java.util.List;

import com.kh.foodding.project.model.vo.ProjectList;

// 프로젝트 기본 정보 조회 및 관리용 서비스 인터페이스
public interface ProjectListService{

    // 상세조회용
    ProjectList selectDetail(long productNo);

    // 목록 / 검색 조회용
    List<ProjectList> selectRecentProjects(int limit, String keyword);

    // 관리자용 전체 조회
    List<ProjectList> selectAllProjects(String status);

    // 관리자용 노출 상태 변경
    boolean updateProductVisibility(long productNo, String productYn);

}
