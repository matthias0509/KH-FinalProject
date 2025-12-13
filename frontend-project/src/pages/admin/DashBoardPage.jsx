import React, { useState } from 'react';
import '../../styles/Dashboard.css'; 

// 더미 통계 데이터 (UI 구성을 위해 임시로 설정)
const DUMMY_STATS = {
    // 요약 카드 항목
    avgFundingAmount: "34,500 원",
    avgSupporters: "150 명",
    avgCreators: "20 명",
    
    // 비율 항목
    fundingSuccessRate: "85.3 %",
    fundingFailureRate: "14.7 %",
    fundingAchievementRate: "120 %",
};

const DashboardTab = () => {
    const [filterPeriod, setFilterPeriod] = useState('monthly');

    const statSummaryItems = [
        { label: "평균 후원금액", value: DUMMY_STATS.avgFundingAmount, icon: "💰" },
        { label: "평균 후원자 수", value: DUMMY_STATS.avgSupporters, icon: "👤" },
        { label: "평균 창작자 수", value: DUMMY_STATS.avgCreators, icon: "🖋️" },
    ];
    
    const statRateItems = [
        { label: "펀딩 성공률", value: DUMMY_STATS.fundingSuccessRate, icon: "✅" },
        { label: "펀딩 실패율", value: DUMMY_STATS.fundingFailureRate, icon: "❌" },
        { label: "펀딩 달성률", value: DUMMY_STATS.fundingAchievementRate, icon: "🚀" },
    ];

    return (
        <div className="dashboard-tab">
            <h2 className="page-title">📊 대시보드 및 통계 조회</h2>
            
            {/* 1. 기간 필터링 영역 */}
            <div className="filter-area admin-card">
                <label>기간 설정:</label>
                <select 
                    value={filterPeriod} 
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="filter-select"
                >
                    <option value="daily">일간</option>
                    <option value="monthly">월간</option>
                    <option value="yearly">연간</option>
                    <option value="custom">기간 지정</option>
                </select>
                <button className="btn-apply">적용</button>
            </div>

            {/* 2. 핵심 요약 통계 카드 (Average, Counts) */}
            <div className="stats-summary-grid">
                {statSummaryItems.map((item, index) => (
                    <div key={index} className="summary-card">
                        <div className="icon">{item.icon}</div>
                        <div className="data">
                            <p className="label">{item.label}</p>
                            <h3 className="value">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. 비율 통계 카드 (Rates) */}
            <div className="stats-rate-grid">
                {statRateItems.map((item, index) => (
                    <div key={index} className="rate-card">
                        <div className="icon-rate">{item.icon}</div>
                        <div className="data">
                            <p className="label">{item.label}</p>
                            <h3 className="value">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>


            {/* 4. 상세 차트/그래프 영역 (Placeholder) */}
            <div className="chart-area admin-card">
                <h3>기간별 상세 데이터</h3>
                <div className="chart-placeholder">
                    {/* 실제 차트 라이브러리 (Recharts, Chart.js 등)가 들어갈 공간 */}
                    <p>월별/일별 후원액, 성공률 추이 그래프 (유스케이스: 통계 조회)</p>
                </div>
            </div>

            
        </div>
    );
};

export default DashboardTab;