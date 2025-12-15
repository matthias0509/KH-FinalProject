package com.kh.foodding.createProject.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.foodding.createProject.model.dao.CreateProjectDao;
import com.kh.foodding.createProject.model.vo.CreateProject;

@Service
public class CreateProjectServiceImpl implements CreateProjectService {

    private final CreateProjectDao createProjectDao;
    private final SqlSessionTemplate sqlSession;

    public CreateProjectServiceImpl(CreateProjectDao createProjectDao, SqlSessionTemplate sqlSession) {
        this.createProjectDao = createProjectDao;
        this.sqlSession = sqlSession;
    }

    @Override
    public int MinsertProject(CreateProject project) {
        if (project == null) {
            return 0;
        }

        // TODO: wire dao + mapper when schema is ready
        return 0;
    }
}
