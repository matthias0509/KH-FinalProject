package com.kh.foodding.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.admin.model.service.ProjectManagementService;

@RestController
@RequestMapping("/api/admin/project") // 공통 URL (ContextPath 제외)
public class AdminProjectManagementController {

    @Autowired
    private ProjectManagementService projectService;

    // 1. 프로젝트 목록 조회 API
    // GET: /api/admin/project/list?page=1&size=10&status=all&category=all&keyword=...
    @GetMapping("/list")
    public Map<String, Object> getProjectList(
            @RequestParam(value="page", defaultValue="1") int page,
            @RequestParam(value="size", defaultValue="10") int size,
            @RequestParam(value="status", defaultValue="all") String status,
            @RequestParam(value="category", defaultValue="all") String category,
            @RequestParam(value="keyword", defaultValue="") String keyword
    ) {
        return projectService.getProjectList(page, size, status, category, keyword);
    }

    // 2. 프로젝트 상태 변경 API (모달 저장 버튼)
    // PUT: /api/admin/project/status
    // Body: { "projectNo": 101, "status": "STOP", "adminMemo": "신고 접수" }
    @PutMapping("/status")
    public String updateProjectStatus(@RequestBody Map<String, Object> paramMap) {
        
        boolean result = projectService.updateProjectStatus(paramMap);
        
        return result ? "Success" : "Fail";
    }
}