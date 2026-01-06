package com.kh.foodding.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.project.dto.ProductVisibilityUpdateRequest;
import com.kh.foodding.project.model.service.ProjectListService;
import com.kh.foodding.project.model.vo.ProjectList;
import com.kh.foodding.search.model.service.SearchLogService;


@RestController
@RequestMapping("project")
public class ProjectListController {
    @Autowired
    private ProjectListService projectListService;
    
    @Autowired
    private SearchLogService searchLogService;

    // 프로젝트 상세 조회용
    @GetMapping("detail/{productNo}")
    public ResponseEntity<ProjectList> selectDetail(@PathVariable long productNo) {
        ProjectList detail = projectListService.selectDetail(productNo);
        if (detail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detail);
    }

    // 프로젝트 목록 조회용
    @GetMapping("list")
    public ResponseEntity<List<ProjectList>> selectList(
        @RequestParam(defaultValue = "12") int limit,
        @RequestParam(required = false) String keyword
    ) {
        List<ProjectList> projects = projectListService.selectRecentProjects(limit, keyword);
        if (keyword != null && !keyword.trim().isEmpty()) {
            searchLogService.recordKeyword(keyword);
        }
        return ResponseEntity.ok(projects);
    }

    // 관리자용 전체 프로젝트 목록
    @GetMapping("admin/list")
    public ResponseEntity<List<ProjectList>> selectAdminList(@RequestParam(defaultValue = "ALL") String status) {
        List<ProjectList> projects = projectListService.selectAllProjects(status);
        return ResponseEntity.ok(projects);
    }

    // 관리자용 노출 상태 변경
    @PatchMapping("admin/{productNo}/visibility")
    public ResponseEntity<Void> updateVisibility(
        @PathVariable long productNo,
        @RequestBody ProductVisibilityUpdateRequest request
    ) {
        String desiredStatus = request != null ? request.getProductYn() : null;
        if (desiredStatus == null) {
            return ResponseEntity.badRequest().build();
        }

        String normalized = desiredStatus.trim().toUpperCase();
        if (!"Y".equals(normalized) && !"N".equals(normalized)) {
            return ResponseEntity.badRequest().build();
        }

        boolean updated = projectListService.updateProductVisibility(productNo, normalized);
        if (!updated) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
    
}
