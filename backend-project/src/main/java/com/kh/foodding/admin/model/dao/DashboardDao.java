package com.kh.foodding.admin.model.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.kh.foodding.admin.vo.Dashboard;

@Mapper
public interface DashboardDao {
    
    // 차트용 리스트 데이터 조회 (기간별)
    List<Dashboard.Result> selectChartStats(Dashboard.Search search);

    // 요약 카드용 단일 데이터 조회 (전체 누적)
    Dashboard.Result selectSummaryStats();
}