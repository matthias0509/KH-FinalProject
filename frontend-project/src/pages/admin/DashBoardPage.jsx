import React, { useState, useEffect } from 'react';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import '../../styles/Dashboard.css';

// [API 연동 전 더미 데이터 생성 함수]
// 실제로는 백엔드에서 period(daily, weekly...)에 따라 다른 데이터를 받아옵니다.
const generateDummyData = (period) => {
    const data = [];
    let count = period === 'daily' ? 30 : period === 'monthly' ? 12 : 5;
    
    for (let i = 1; i <= count; i++) {
        data.push({
            name: period === 'daily' ? `12/${i}` : period === 'monthly' ? `${i}월` : `${2020 + i}년`,
            amount: Math.floor(Math.random() * 5000000) + 1000000, // 펀딩 금액
            supporters: Math.floor(Math.random() * 200) + 10,      // 후원자 수
            successRate: Math.floor(Math.random() * 30) + 70,      // 성공률 (%)
        });
    }
    return data;
};

const DashboardTab = () => {
    const [filterPeriod, setFilterPeriod] = useState('monthly'); // daily, weekly, monthly, yearly
    const [chartData, setChartData] = useState([]);
    
    // 필터가 변경될 때마다 데이터 갱신 (API 호출 시점)
    useEffect(() => {
        // TODO: 여기서 axios.get(`/api/admin/stats?period=${filterPeriod}`) 호출
        setChartData(generateDummyData(filterPeriod));
    }, [filterPeriod]);

    // 요약 카드용 데이터 (실제로는 API에서 받아온 값을 넣으세요)
    const statSummaryItems = [
        { label: "평균 후원금액", value: "34,500 원", icon: "💰", desc: "전체 프로젝트 기준" },
        { label: "평균 후원자 수", value: "150 명", icon: "👤", desc: "프로젝트 당 평균" },
        { label: "평균 창작자 수", value: "20 명", icon: "🖋️", desc: "월별 신규 가입" },
    ];

    const statRateItems = [
        { label: "펀딩 성공률", value: "85.3 %", icon: "✅", color: "#4caf50" }, // 성공: 초록
        { label: "펀딩 실패율", value: "14.7 %", icon: "❌", color: "#f44336" }, // 실패: 빨강
        { label: "평균 달성률", value: "120 %", icon: "🚀", color: "#2196f3" }, // 달성: 파랑
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2 className="page-title">📊 펀딩 통계 대시보드</h2>
                
                {/* 1. 기간 필터링 영역 (우측 상단 배치 추천) */}
                <div className="filter-controls">
                    <select 
                        value={filterPeriod} 
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        className="period-select"
                    >
                        <option value="daily">일간 (최근 30일)</option>
                        <option value="weekly">주간 (최근 12주)</option>
                        <option value="monthly">월간 (최근 1년)</option>
                        <option value="yearly">연간 (최근 5년)</option>
                    </select>
                </div>
            </header>

            {/* 2. 핵심 요약 통계 (Summary) */}
            <section className="stats-grid">
                {statSummaryItems.map((item, index) => (
                    <div key={index} className="stat-card summary">
                        <div className="stat-icon-wrapper">{item.icon}</div>
                        <div className="stat-info">
                            <span className="stat-label">{item.label}</span>
                            <h3 className="stat-value">{item.value}</h3>
                            <span className="stat-desc">{item.desc}</span>
                        </div>
                    </div>
                ))}
            </section>

            {/* 3. 비율 통계 (Rates) */}
            <section className="stats-grid">
                {statRateItems.map((item, index) => (
                    <div key={index} className="stat-card rate" style={{ borderTop: `4px solid ${item.color}`}}>
                        <div className="stat-icon-wrapper">{item.icon}</div>
                        <div className="stat-info">
                            <span className="stat-label">{item.label}</span>
                            <h3 className="stat-value" style={{ color: item.color }}>{item.value}</h3>
                        </div>
                    </div>
                ))}
            </section>

            {/* 4. 상세 차트 영역 */}
            <section className="charts-section">
                
                {/* 차트 1: 펀딩 금액 추이 (Area Chart 추천 - 면적으로 보여주면 예쁨) */}
                <div className="chart-card">
                    <h3>📈 기간별 펀딩 금액 추이</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip formatter={(value) => `${value.toLocaleString()} 원`} />
                                <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmount)" name="펀딩 금액" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 차트 2: 성공률 vs 후원자 수 (Composed Chart - 막대와 선 혼합) */}
                <div className="chart-card">
                    <h3>👥 후원자 수 및 성공률 분석</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
                                <YAxis yAxisId="right" orientation="right" stroke="#ff7300" unit="%" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="supporters" fill="#82ca9d" name="후원자 수(명)" barSize={20} radius={[5, 5, 0, 0]} />
                                <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#ff7300" name="성공률(%)" strokeWidth={2} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default DashboardTab;