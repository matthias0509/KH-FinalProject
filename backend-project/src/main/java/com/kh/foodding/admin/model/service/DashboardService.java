package com.kh.foodding.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.admin.model.dao.DashboardDao;
import com.kh.foodding.admin.model.vo.Dashboard;

@Service
public class DashboardService {

    @Autowired
    private DashboardDao dashboardDao;

    /**
     * 대시보드 통계 데이터 조회 서비스
     * @param period 기간 필터 (daily, monthly, yearly 등)
     * @return 차트 데이터 리스트 + 요약 정보 객체
     */
    public Map<String, Object> getDashboardData(String period) {
        
        // 1. 검색 조건 VO 생성 (기간 설정)
        Dashboard.Search search = new Dashboard.Search();
        search.setPeriodType(period);
        // 필요 시 search.setStartDate(), setEndDate() 로직 추가 가능

        // 2. DAO 호출하여 데이터 조회
        // 2-1. 그래프용 리스트 데이터 조회
        List<Dashboard.Result> chartData = dashboardDao.selectChartStats(search);
        
        // 2-2. 상단 요약 카드용 전체 집계 데이터 조회
        Dashboard.Result summaryData = dashboardDao.selectSummaryStats();

        // 3. 결과 맵핑 (프론트엔드로 보낼 JSON 구조 생성)
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("chartData", chartData);
        resultMap.put("summary", summaryData);

        return resultMap;
    }
}