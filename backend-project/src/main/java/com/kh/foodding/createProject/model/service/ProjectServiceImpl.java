package com.kh.foodding.createProject.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.createProject.model.dao.ProjectDao;
import com.kh.foodding.createProject.model.vo.Project;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

   

    @Transactional
    @Override
    public int insertProject(Project p) {
        if (p == null) {
            return 0;
        }

        if (p.getUserNo() == null) {
            p.setUserNo(1L); // TODO: replace with actual authenticated user
        }

        if (p.getShipStartDate() == null) {
            p.setShipStartDate(p.getFundEndDate());
        }

        return projectDao.insertProject(sqlSession, p);
    }
}
