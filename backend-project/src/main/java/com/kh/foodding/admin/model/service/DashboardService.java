package com.kh.foodding.admin.model.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.kh.foodding.admin.model.dao.DashboardDao;
import com.kh.foodding.admin.model.vo.Dashboard;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardDao dashboardDao;

    public Map<String, Object> getDashboardStats(String period) {
        Map<String, Object> resultMap = new HashMap<>();

        // --- 1. 검색 조건(기간) 설정 ---
        Dashboard.Search search = new Dashboard.Search();
        search.setPeriodType(period); // daily, monthly, yearly

        LocalDate now = LocalDate.now();
        LocalDate startDate = now;

        // 프론트 요청(period)에 따라 조회 범위 자동 계산
        switch (period) {
            case "daily":
                startDate = now.minusDays(30);   // 최근 30일
                break;
            case "monthly":
                startDate = now.minusMonths(12); // 최근 1년
                break;
            case "yearly":
                startDate = now.minusYears(5);   // 최근 5년
                break;
            default:
                startDate = now.minusMonths(12); // 기본값
        }

        // YYYY-MM-DD 형식으로 변환하여 VO에 저장
        search.setEndDate(now.format(DateTimeFormatter.ISO_DATE));
        search.setStartDate(startDate.format(DateTimeFormatter.ISO_DATE));

        // --- 2. DB 조회 ---
        // (A) 차트 데이터 (기간별)
        List<Dashboard.Result> chartData = dashboardDao.selectChartStats(search);
        
        // (B) 요약 데이터 (전체 누적)
        Dashboard.Result summaryData = dashboardDao.selectSummaryStats();

        // --- 3. 결과 맵핑 (React 포맷에 맞춤) ---
        resultMap.put("chartData", chartData);
        resultMap.put("summary", summaryData);

        return resultMap;
    }
}