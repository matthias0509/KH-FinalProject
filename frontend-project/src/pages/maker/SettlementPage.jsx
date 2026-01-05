import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar'; 
import '../../styles/MakerPage.css';
import '../../styles/UserManagement.css'; 

const SERVER_URL = "http://localhost:8001/foodding";
const COMMISSION_RATE = 0.05; // 수수료 5%

// --- [컴포넌트] 정산 리스트 아이템 ---
const SettlementListItem = ({ item }) => {
    const navigate = useNavigate();
    
    // 금액 계산
    const totalAmount = Number(item.amount);
    const fee = Math.floor(totalAmount * COMMISSION_RATE);
    const finalAmount = totalAmount - fee;

    const formatCurrency = (num) => num.toLocaleString('ko-KR');

    // 상태 표시
    const getStatusText = (status) => {
        switch (status) {
            case 'paid': return '지급 완료';
            case 'pending': return '지급 대기';
            case 'canceled': return '정산 취소';
            default: return '진행 중';
        }
    };

    return (
        <div 
            className="settlement-list-item" 
            onClick={() => navigate(`/projects/${item.id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="settlement-project-info">
                <h4>{item.title}</h4>
                <p className="date-info">
                    종료일: {item.projectEndDate} · {getStatusText(item.status)}
                </p>
                <p style={{fontSize: '12px', color: '#999', marginTop: '4px'}}>
                    총 모금액 {formatCurrency(totalAmount)}원 - 수수료 {formatCurrency(fee)}원 (5%)
                </p>
            </div>
            
            <div className="settlement-amount">
                <span style={{fontSize: '14px', color: '#666', marginRight: '8px'}}>최종 정산액</span>
                {formatCurrency(finalAmount)} 원
            </div>
        </div>
    );
};


// --- [메인 페이지] ---
const SettlementPage = ({ userInfo }) => {
    const navigate = useNavigate();
    
    // 1. 내 정보 상태 관리 (props가 없으면 null)
    const [myInfo, setMyInfo] = useState(userInfo || null);
    
    const [settlements, setSettlements] = useState([]);
    const [loading, setLoading] = useState(true);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 2. [핵심 수정] 내 정보 로딩 (조건 없이 무조건 실행)
    useEffect(() => {
        const loadMyInfo = async () => {
            // 이미 정보가 있다면 API 호출 생략 (선택 사항)
            // if (myInfo) return; 

            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                // 내 정보 API 호출 (무조건 실행하여 닉네임/프사 갱신)
                const response = await axios.get(`${SERVER_URL}/api/mypage/info`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("내 정보 로딩 성공(정산페이지):", response.data);
                setMyInfo(response.data); // 상태 업데이트 -> Sidebar로 전달됨
            } catch (error) {
                console.error("내 정보 로딩 실패:", error);
            }
        };
        
        loadMyInfo();
    }, [navigate]); // 의존성 배열에서 myInfo 제거

    // 3. 정산 내역 로딩
    useEffect(() => {
        const fetchSettlements = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

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

        fetchSettlements();
    }, []);

    // 통계 및 페이징 로직
    const totalProjects = settlements.length;
    const totalPendingAmount = settlements
        .filter(i => i.status === 'pending')
        .reduce((sum, item) => {
            const amount = Number(item.amount);
            return sum + (amount - Math.floor(amount * COMMISSION_RATE));
        }, 0);

    const totalPages = Math.ceil(settlements.length / itemsPerPage);
    const currentItems = settlements.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatCurrency = (amount) => Number(amount).toLocaleString('ko-KR');

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 🚨 확보된 myInfo 전달 */}
                <Sidebar userInfo={myInfo} />

                <main className="main-content">
                    <h2 className="page-title">정산 관리</h2>

                    {/* 상단 요약 카드 */}
                    <div className="settlement-summary-card">
                        <div className="summary-item">
                            <p className="label">총 정산 프로젝트</p>
                            <p className="value">{totalProjects} 건</p>
                        </div>
                        <div className="summary-item">
                            <p className="label">플랫폼 수수료율</p>
                            <p className="value" style={{ color: '#888' }}>5 %</p>
                        </div>
                        <div className="summary-item">
                            <p className="label">지급 예정 총액 <small>(수수료 제외)</small></p>
                            <p className="value primary">{formatCurrency(totalPendingAmount)} 원</p>
                        </div>
                    </div>

                    <div className="settlement-list-header">
                        <span>전체 정산 내역 <small style={{fontSize:'12px', color:'#888', fontWeight:'400'}}>(클릭 시 프로젝트 상세로 이동)</small></span>
                    </div>

                    <div className="settlement-card-list">
                        {loading ? (
                            <div className="empty-state"><p>데이터를 불러오는 중입니다...</p></div>
                        ) : currentItems.length > 0 ? (
                            <>
                                {currentItems.map(item => (
                                    <SettlementListItem key={item.id} item={item} />
                                ))}

                                {/* 페이지네이션 UI */}
                                {totalPages > 1 && (
                                    <div className="pagination-area" style={{ marginTop: '30px' }}>
                                        <button 
                                            className="btn-page" 
                                            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo(0,0); }}
                                            disabled={currentPage === 1}
                                        >
                                            &lt;
                                        </button>
                                        <span className="page-info">{currentPage} / {totalPages}</span>
                                        <button 
                                            className="btn-page" 
                                            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0,0); }}
                                            disabled={currentPage === totalPages}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="empty-state">
                                <p className="empty-title">정산 내역이 없습니다.</p>
                                <p className="empty-desc">종료된 프로젝트가 생기면 이곳에 정산 정보가 표시됩니다.</p>
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