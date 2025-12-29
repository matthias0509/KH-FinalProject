package com.kh.foodding.admin.vo;

import lombok.Data;

public class Dashboard {

    // 1. 검색 조건 (기간 설정)
    @Data
    public static class Search {
        private String periodType;  // "daily", "monthly", "yearly" 등
        private String startDate;   // 조회 시작일 (YYYY-MM-DD)
        private String endDate;     // 조회 종료일 (YYYY-MM-DD)
    }

    // 2. 결과 데이터 (차트 + 요약)
    @Data
    public static class Result {
        // 차트용 필드
        private String label;           // 날짜 (X축)
        private long totalAmount;       // 결제 금액 합계
        private int supporterCount;     // 후원자 수

        // 요약 카드용 필드 (전체 집계)
        private long avgFundingAmount;  // 평균 후원금
        private double successRate;     // 성공률
        private double failRate;        // 실패율
        private double achieveRate;     // 달성률
        private int totalCreators;      // 총 창작자 수
        private int totalSupporters;    // 총 후원자 수
    }
}