package com.kh.foodding.project.model.service;

import com.kh.foodding.project.model.vo.ProjectList;

public interface ProjectListService{

    // 상세조회용
    ProjectList selectDetail(long productNo);

}
