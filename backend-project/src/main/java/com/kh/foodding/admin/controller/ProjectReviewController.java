package com.kh.foodding.admin.controller;

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

import com.kh.foodding.project.dto.ProjectReviewActionRequest;
import com.kh.foodding.project.dto.ProjectReviewDetail;
import com.kh.foodding.project.dto.ProjectReviewSummary;
import com.kh.foodding.project.model.service.ProjectReviewService;

@RestController
@RequestMapping("project/admin/review")
public class ProjectReviewController {

    @Autowired
    private ProjectReviewService projectReviewService;

    @GetMapping
    public ResponseEntity<List<ProjectReviewSummary>> list(@RequestParam(defaultValue = "WAITING") String status) {
        return ResponseEntity.ok(projectReviewService.getProjects(status));
    }

    @GetMapping("/{productNo}")
    public ResponseEntity<ProjectReviewDetail> detail(@PathVariable long productNo) {
        ProjectReviewDetail detail = projectReviewService.getProjectDetail(productNo);
        if (detail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detail);
    }

    @PatchMapping("/{productNo}")
    public ResponseEntity<?> review(
        @PathVariable long productNo,
        @RequestBody ProjectReviewActionRequest request
    ) {
        try {
            String action = request != null ? request.getAction() : null;
            String reason = request != null ? request.getReason() : null;
            ProjectReviewDetail updated = projectReviewService.reviewProject(productNo, action, reason);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException | IllegalStateException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
