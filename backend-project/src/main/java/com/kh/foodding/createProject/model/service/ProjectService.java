package com.kh.foodding.createProject.model.service;

import java.util.ArrayList;

import com.kh.foodding.createProject.model.vo.Project;

public interface ProjectService {

    int insertProject(Project p);

    int imsiProject(Project p);

    ArrayList<Project> selectProject(int userNo);

    Project selectProjectById(int userNo, long tempNo);

    int deleteProject(int userNo, long tempNo);
}
