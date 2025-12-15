package com.kh.foodding.createProject.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.createProject.model.dao.CreateProjectDao;

@Service
public class CreateProjectServiceImpl {
    @Autowired 
    CreateProjectDao createProjectDao;

    @Autowired 
    SqlSessionTemplate sqlSession;

    }
