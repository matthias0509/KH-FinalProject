import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar'; 
import '../../styles/MakerPage.css';

const SERVER_URL = "http://localhost:8001/foodding";
const COMMISSION_RATE = 0.05; // 수수료 5%

// --- [컴포넌트] 정산 리스트 아이템 ---
const SettlementListItem = ({ item }) => {
    // 금액 계산 (원단위 절사)
    const totalAmount = Number(item.amount);
    const fee = Math.floor(totalAmount * COMMISSION_RATE); // 수수료
    const finalAmount = totalAmount - fee; // 최종 지급액

    const formatCurrency = (num) => num.toLocaleString('ko-KR');

    // 상태별 텍스트 및 스타일
    const getStatusInfo = (status) => {
        switch (status) {
            case 'paid': return { text: '지급 완료', className: 'status-paid' };
            case 'pending': return { text: '지급 대기', className: 'status-pending' };
            case 'canceled': return { text: '정산 취소', className: 'status-canceled' };
            default: return { text: '상태 미정', className: '' };
        }
    };

    const { text, className } = getStatusInfo(item.status);

    return (
        <div className="settlement-list-item">
            {/* 1. 프로젝트 정보 */}
            <div className="settlement-project-info">
                <h4>{item.title}</h4>
                <p className="date-info">
                    종료일: {item.projectEndDate} 
                    {item.status === 'paid' && ` · 지급일: ${item.paidDate}`}
                    {item.status === 'pending' && ` · 지급 예정일: ${item.paidDate}`}
                </p>
                {/* 상세 내역 (작게 표시) */}
                <p style={{fontSize: '12px', color: '#999', marginTop: '4px'}}>
                    총 모금액 {formatCurrency(totalAmount)}원 - 수수료 {formatCurrency(fee)}원 (5%)
                </p>
            </div>
            
            {/* 2. 상태 뱃지 */}
            <span className={`settlement-status ${className}`}>
                {text}
            </span>
            
            {/* 3. 최종 지급 금액 (강조) */}
            <div className="settlement-amount">
                {formatCurrency(finalAmount)} 원
            </div>
        </div>
    );
};


// --- [메인 페이지] ---
const SettlementPage = ({ userInfo }) => {
    const navigate = useNavigate();
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. 데이터 가져오기
    useEffect(() => {
        const fetchSettlements = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${SERVER_URL}/api/maker/settlement`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setSettlements(response.data);
            } catch (error) {
                console.error("정산 내역 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchSettlements();
        }
    }, [userInfo, navigate]);

    // 2. 통계 자동 계산 (수수료 제외한 금액 기준)
    const calculateTotal = (status) => {
        return settlements
            .filter(i => i.status === status)
            .reduce((sum, item) => {
                const amount = Number(item.amount);
                const netAmount = amount - Math.floor(amount * COMMISSION_RATE); // 5% 제외
                return sum + netAmount;
            }, 0);
    };

    const totalPaid = calculateTotal('paid');
    const totalPending = calculateTotal('pending');
    const totalProjects = settlements.length;

    const formatCurrency = (amount) => Number(amount).toLocaleString('ko-KR');

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                <Sidebar userInfo={userInfo} />

                <main className="main-content">
                    
                    <h2 className="page-title">정산 관리</h2>

                    {/* 상단 요약 카드 */}
                    <div className="settlement-summary-card">
                        <div className="summary-item">
                            <p className="label">총 정산 프로젝트</p>
                            <p className="value">{totalProjects} 건</p>
                        </div>
                        <div className="summary-item">
                            <p className="label">지급 완료 (수수료 제외)</p>
                            <p className="value">{formatCurrency(totalPaid)} 원</p>
                        </div>
                        <div className="summary-item">
                            <p className="label">지급 예정 (수수료 제외)</p>
                            <p className="value primary">{formatCurrency(totalPending)} 원</p>
                        </div>
                    </div>

                    {/* 리스트 헤더 & 필터 */}
                    <div className="settlement-list-header">
                        <span>상세 내역 <small style={{fontSize:'12px', color:'#888', fontWeight:'400'}}>(수수료 5% 제외 후 지급)</small></span>
                        <select className="filter-select">
                            <option>전체 보기</option>
                            <option>지급 완료</option>
                            <option>지급 대기</option>
                        </select>
                    </div>

                    {/* 정산 목록 리스트 */}
                    <div className="settlement-card-list">
                        {loading ? (
                            <div className="empty-state"><p>데이터를 불러오는 중입니다...</p></div>
                        ) : settlements.length > 0 ? (
                            settlements.map(item => (
                                <SettlementListItem key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <p className="empty-title">정산 내역이 없습니다.</p>
                                <p className="empty-desc">프로젝트가 종료되면 이곳에서 정산 내역을 확인할 수 있습니다.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default SettlementPage;