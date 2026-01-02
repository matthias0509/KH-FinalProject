import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; 

// 스타일 파일
import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css'; 

const SERVER_URL = "http://localhost:8001/foodding";

const FundingCancelPage = () => {
    const navigate = useNavigate();

    // --- [상태 관리] ---
    const [cancelList, setCancelList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    // --- [데이터 가져오기] ---
    useEffect(() => {
        const fetchCancelHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                // 🚨 실제 백엔드 API 호출
                const response = await axios.get(`${SERVER_URL}/api/mypage/funding/cancel`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // 데이터 매핑
                const mappedList = response.data.map(item => ({
                    id: item.orderNo,
                    date: item.fundingDate,
                    // 취소일이 DB에 없다면 '처리완료' 등으로 표시하거나, 주문일자를 대신 사용
                    cancelDate: item.cancelDate || '처리완료', 
                    title: item.projectTitle,
                    maker: item.makerName,
                    price: item.totalAmount,
                    status: '취소완료',
                    reason: '사용자 요청 취소', // 취소 사유 컬럼이 없다면 고정값 사용
                    // 썸네일 경로 처리
                    img: item.projectThumb 
                        ? (item.projectThumb.startsWith('http') ? item.projectThumb : `${SERVER_URL}${item.projectThumb}`)
                        : 'https://via.placeholder.com/150',
                    productNo: item.productNo
                }));

                setCancelList(mappedList);

            } catch (error) {
                console.error("취소 내역 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCancelHistory();
    }, [navigate]);

    // --- [페이지네이션 계산] ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cancelList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cancelList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <MyPageLayout>
            <h2 className="page-title">후원 취소/환불 내역</h2>

            <div className="funding-filter-container">
                <button className="funding-filter-tab active">전체</button>
            </div>

            <div className="funding-list-container">
                {loading ? (
                    <div className="empty-state-box"><p>내역을 불러오는 중입니다...</p></div>
                ) : currentItems.length > 0 ? (
                    currentItems.map(item => (
                        <div key={item.id} className="history-card cancel-card">
                            
                            {/* 상단: 날짜 및 상태 */}
                            <div className="card-top">
                                <span className="date-label">{item.date} 후원</span>
                                <span className="status-label cancel">
                                    {item.status}
                                </span>
                            </div>

                            {/* 본문: 이미지 및 정보 */}
                            <div className="card-body">
                                <img src={item.img} alt={item.title} className="thumb-img grayscale" />
                                
                                <div className="card-info">
                                    <p className="maker-name">{item.maker}</p>
                                    <h3 className="project-title disabled">{item.title}</h3>
                                    <p className="price-text" style={{textDecoration:'line-through', color:'#999'}}>
                                        {item.price.toLocaleString()}원
                                    </p>
                                    
                                    <p className="cancel-reason">
                                        ⚠️ {item.reason}
                                    </p>
                                </div>
                            </div>

                            {/* 하단: 버튼 영역 */}
                            <div className="card-actions">
                                <Link to={`/projects/${item.productNo}`} className="action-btn">
                                    프로젝트 보기
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state-box">
                        <p>취소/환불된 내역이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* 페이지네이션 */}
            {!loading && cancelList.length > 0 && (
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

export default FundingCancelPage;