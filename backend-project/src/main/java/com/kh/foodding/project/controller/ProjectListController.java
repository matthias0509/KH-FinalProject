package com.kh.foodding.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.project.model.service.ProjectListService;
import com.kh.foodding.project.model.vo.ProjectList;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("project")
public class ProjectListController {
    @Autowired
    private ProjectListService projectListService;

    // 프로젝트 상세 조회용
    @GetMapping("detail/{productNo}")
    public ResponseEntity<ProjectList> selectDetail(@PathVariable long productNo) {
        ProjectList detail = projectListService.selectDetail(productNo);
        if (detail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detail);
    }
}
