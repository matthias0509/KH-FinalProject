package com.kh.foodding.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kh.foodding.admin.model.service.AdminProjectService;
import com.kh.foodding.admin.model.vo.AdminProject;

@RestController
@RequestMapping("/api/admin/project") // 프론트 API 경로와 일치시킴
public class AdminProjectController {

    @Autowired
    private AdminProjectService service;

    // 1. 목록 조회
    @GetMapping("/review")
    public ResponseEntity<?> getReviewList(@RequestParam(defaultValue = "WAITING") String status) {
        List<AdminProject> list = service.getProjectList(status);
        return ResponseEntity.ok(list);
    }

    // 2. 상세 조회
    @GetMapping("/review/{no}")
    public ResponseEntity<?> getReviewDetail(@PathVariable int no) {
        AdminProject detail = service.getProjectDetail(no);
        if (detail == null) {
            return ResponseEntity.status(404).body("프로젝트를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok(detail);
    }

    // 3. 심사 처리 (승인/반려)
    @PostMapping("/review/{no}")
    public ResponseEntity<?> reviewProject(@PathVariable int no, @RequestBody Map<String, String> payload) {
        String action = payload.get("action"); // APPROVE or REJECT
        String reason = payload.get("reason");
        
        boolean result = service.reviewProject(no, action, reason);
        
        if (result) {
            return ResponseEntity.ok("처리되었습니다.");
        } else {
            return ResponseEntity.status(500).body("처리 중 오류가 발생했습니다.");
        }
    }
}
