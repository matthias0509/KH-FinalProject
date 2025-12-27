package com.kh.foodding.project.model.service;

import java.util.List;

import com.kh.foodding.project.model.vo.ProjectList;

public interface ProjectListService{

    // 상세조회용
    ProjectList selectDetail(long productNo);

    // 목록 조회용
    List<ProjectList> selectRecentProjects(int limit);

    // 관리자용 전체 조회
    List<ProjectList> selectAllProjects(String status);

    // 관리자용 노출 상태 변경
    boolean updateProductVisibility(long productNo, String productYn);

}
