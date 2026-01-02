import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { resolveProjectImageUrl } from '../../utils/projectMedia';
import MyPageLayout from '../../components/MyPageLayout';
import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css';

const FundingHistoryPage = () => {
    const navigate = useNavigate();

    const [historyList, setHistoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 데이터 불러오기 함수 (재사용을 위해 분리)
    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            const response = await axios.get("http://localhost:8001/foodding/api/mypage/funding/history", {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // 데이터 매핑
            const mappedList = response.data.map(item => ({
                id: item.orderNo,
                date: item.fundingDate,
                title: item.projectTitle,
                maker: item.makerName,
                price: item.totalAmount,
                status: item.fundingStatus, // 'PAY', 'CANCEL' 등
                img: resolveProjectImageUrl(
                    item.projectThumb || item.originThumbnail,
                    'https://via.placeholder.com/150',
                ),
                productNo: item.productNo
            }));

            setHistoryList(mappedList);

        } catch (error) {
            console.error("후원 내역 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [navigate]);

    // 🚨 [추가] 후원 취소 핸들러
    const handleCancel = async (orderNo) => {
        if (!window.confirm("정말로 이 후원을 취소하시겠습니까?\n취소 후에는 복구가 불가능합니다.")) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:8001/foodding/api/mypage/funding/cancel", 
                { orderNo: orderNo },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            alert("후원이 취소되었습니다.");
            fetchHistory(); // 목록 새로고침

        } catch (error) {
            console.error("취소 실패:", error);
            alert("후원 취소에 실패했습니다. 이미 배송이 시작되었거나 취소 불가능한 상태일 수 있습니다.");
        }
    };

    // ... (페이지네이션 로직은 기존과 동일) ...
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historyList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(historyList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };
    
    // 상태 뱃지 클래스
    const getStatusClass = (status) => {
        if (status === '결제완료' || status === 'PAY') return 'pay';
        if (status === '취소' || status === 'CANCEL') return 'cancel';
        return '';
    };

    const getStatusText = (status) => {
        if (status === 'PAY') return '결제완료';
        if (status === 'CANCEL') return '후원취소';
        return status;
    };

    return (
        <MyPageLayout>
            <h2 className="page-title">후원 내역 조회</h2>
            
            <div className="funding-filter-container">
                <button className="funding-filter-tab active">전체</button>
            </div>

            <div className="funding-list-container">
                {loading ? (
                    <div className="empty-state-box"><p>로딩 중입니다...</p></div>
                ) : currentItems.length > 0 ? (
                    currentItems.map(item => (
                        <div key={item.id} className="history-card">
                            <img src={item.img} alt={item.title} className="history-thumb" />
                            
                            <div className="history-content">
                                <div>
                                    <div className="history-meta">
                                        <span className="history-date">{item.date}</span>
                                        <span className={`history-status ${getStatusClass(item.status)}`}>
                                            {getStatusText(item.status)}
                                        </span>
                                    </div>
                                    <h3 className="history-title">{item.title}</h3>
                                </div>
                                <p className="history-maker">{item.maker}</p>
                            </div>

                            <div className="history-actions">
                                <span className="history-price">{item.price.toLocaleString()}원</span>
                                <div style={{display:'flex', flexDirection:'column', gap:'5px', width:'100%'}}>
                                    <Link to={`/mypage/history/${item.id}`} className="history-btn">
                                        상세 보기
                                    </Link>
                                    
                                    {/* 🚨 [추가] 결제 완료 상태일 때만 취소 버튼 표시 */}
                                    {item.status === 'PAY' && (
                                        <button 
                                            className="history-btn" 
                                            style={{color:'#e74c3c', borderColor:'#e74c3c'}}
                                            onClick={() => handleCancel(item.id)}
                                        >
                                            후원 취소
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state-box">
                        <p>아직 후원한 내역이 없습니다.</p>
                    </div>
                )}
            </div>
            
            {/* 페이지네이션 UI (기존 코드 유지) */}
            {!loading && historyList.length > 0 && (
                <div className="pagination">
                    <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    ))}
                    <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                </div>
            )}
        </MyPageLayout>
    );
};

export default FundingHistoryPage;
