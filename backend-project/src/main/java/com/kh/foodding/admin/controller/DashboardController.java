package com.kh.foodding.admin.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.admin.model.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * 대시보드 통계 데이터 반환 API
     * @param period 기간 필터 (daily, monthly, yearly)
     * @return chartData(List) + summary(Object)
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(
            @RequestParam(value = "period", defaultValue = "monthly") String period) {
        
        // 서비스 호출
        Map<String, Object> data = dashboardService.getDashboardStats(period);
        
        return ResponseEntity.ok(data);
    }
}
