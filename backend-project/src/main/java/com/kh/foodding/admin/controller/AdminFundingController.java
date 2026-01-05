package com.kh.foodding.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.admin.model.service.AdminFundingService;
import com.kh.foodding.admin.model.vo.AdminFunding;

@RestController
@RequestMapping("/admin/funding") // URL을 /admin/funding 으로 그룹화
public class AdminFundingController {

    @Autowired
    private AdminFundingService adminFundingService;

    /**
     * 💰 후원/환불 관리 목록 조회 API
     * URL: /admin/funding/all?status=ALL&keyword=검색어
     */
    @GetMapping("/all")
    public ResponseEntity<?> getFundingList(
            @RequestParam(value = "status", defaultValue = "ALL") String status,
            @RequestParam(value = "keyword", required = false) String keyword
    ) {
        // 서비스 호출
        List<AdminFunding> list = adminFundingService.getAdminFundingList(status, keyword);
        return ResponseEntity.ok(list);
    }
}