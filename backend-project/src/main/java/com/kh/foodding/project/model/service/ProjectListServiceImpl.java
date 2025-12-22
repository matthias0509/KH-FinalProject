package com.kh.foodding.project.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.project.dao.ProjectListDao;
import com.kh.foodding.project.model.vo.ProjectList;

@Service
public class ProjectListServiceImpl implements ProjectListService {

    @Autowired
    private ProjectListDao projectListDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public ProjectList selectDetail(long productNo) {
        return projectListDao.selectDetail(sqlSession, productNo);
    }

}
