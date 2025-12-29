package com.kh.foodding.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.admin.model.service.DashboardService;

@RestController
@RequestMapping("/admin/dashboard") // 기본 URL 변경
@CrossOrigin(origins = "http://localhost:5173") // React 포트 허용
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // 통계 데이터 조회 API
    // GET: /admin/dashboard/stats?period=monthly
    @GetMapping("/stats")
    public Map<String, Object> getStats(@RequestParam(defaultValue = "monthly") String period) {
        return dashboardService.getDashboardData(period);
    }
}