import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import '../../styles/Dashboard.css';

const DashboardTab = () => {
    const [filterPeriod, setFilterPeriod] = useState('monthly');
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);     // 에러 상태 추가
    
    // 초기값을 안전하게 0으로 설정
    const [summaryData, setSummaryData] = useState({
        avgFundingAmount: 0,
        totalSupporters: 0,
        totalCreators: 0,
        successRate: 0,
        failRate: 0,
        achieveRate: 0
    });

    // 데이터 불러오기 함수
    const fetchDashboardData = async () => {
        try {
            setLoading(true); // 로딩 시작
            
            // API 호출 (주소 확인 필요!)
            const response = await axios.get('http://localhost:8080/admin/dashboard/stats', {
                params: { period: filterPeriod }
            });

            console.log("서버 응답 데이터:", response.data); // F12 콘솔에서 데이터 확인용

            if (response.data) {
                // 데이터가 비어있을 경우를 대비해 빈 배열/객체 처리
                setChartData(response.data.chartData || []);
                setSummaryData(response.data.summary || {
                    avgFundingAmount: 0, totalSupporters: 0, totalCreators: 0, 
                    successRate: 0, failRate: 0, achieveRate: 0
                });
            }
        } catch (err) {
            console.error("에러 발생:", err);
            setError("데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false); // 로딩 끝
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [filterPeriod]);

    // 로딩 중일 때 화면
    if (loading) return <div className="dashboard-loading">⏳ 통계 데이터를 불러오는 중입니다...</div>;
    
    // 에러 발생 시 화면
    if (error) return <div className="dashboard-error">⚠️ {error}</div>;

    // 요약 카드용 아이템 설정 (여기서 || 0 처리가 중요함)
    const statSummaryItems = [
        { 
            label: "평균 후원금액", 
            value: `${(summaryData.avgFundingAmount || 0).toLocaleString()} 원`, 
            icon: "💰", 
            desc: "전체 프로젝트 기준" 
        },
        { 
            label: "총 후원자 수", 
            value: `${(summaryData.totalSupporters || 0).toLocaleString()} 명`, 
            icon: "👤", 
            desc: "누적 후원자" 
        },
        { 
            label: "총 창작자 수", 
            value: `${(summaryData.totalCreators || 0).toLocaleString()} 명`, 
            icon: "🖋️", 
            desc: "활동 중인 메이커" 
        },
    ];

    const statRateItems = [
        { label: "펀딩 성공률", value: `${summaryData.successRate || 0} %`, icon: "✅", color: "#4caf50" },
        { label: "펀딩 실패율", value: `${summaryData.failRate || 0} %`, icon: "❌", color: "#f44336" },
        { label: "평균 달성률", value: `${summaryData.achieveRate || 0} %`, icon: "🚀", color: "#2196f3" },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2 className="page-title">📊 펀딩 통계 대시보드</h2>
                <div className="filter-controls">
                    <select 
                        value={filterPeriod} 
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        className="period-select"
                    >
                        <option value="daily">일간</option>
                        <option value="monthly">월간</option>
                        <option value="yearly">연간</option>
                    </select>
                </div>
            </header>

            {/* 상단 요약 카드 */}
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

            {/* 비율 카드 */}
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

            {/* 차트 영역 */}
            <section className="charts-section">
                <div className="chart-card">
                    <h3>📈 기간별 펀딩 금액 추이</h3>
                    <div className="chart-wrapper">
                        {/* 데이터가 없으면 안내 문구 표시 */}
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip formatter={(value) => `${value.toLocaleString()} 원`} />
                                    <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmount)" name="펀딩 금액" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="no-data">데이터가 없습니다.</div>
                        )}
                    </div>
                </div>

                <div className="chart-card">
                    <h3>👥 기간별 후원자 수</h3>
                    <div className="chart-wrapper">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="label" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="supporterCount" fill="#82ca9d" name="후원자 수(명)" barSize={30} radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="no-data">데이터가 없습니다.</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardTab;