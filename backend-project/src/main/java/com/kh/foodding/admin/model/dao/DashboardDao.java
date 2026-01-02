package com.kh.foodding.admin.model.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.kh.foodding.admin.model.vo.Dashboard;

@Mapper
public interface DashboardDao {

    // 1. 기간별 차트 데이터 조회
    // XML의 selectChartStats 호출
    List<Dashboard.Result> selectChartStats(Dashboard.Search search);

    // 2. 전체 요약 통계 조회
    // XML의 selectSummaryStats 호출
    Dashboard.Result selectSummaryStats();
}