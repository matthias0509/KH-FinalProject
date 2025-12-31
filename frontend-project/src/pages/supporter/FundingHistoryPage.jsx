import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; 

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css';

const FundingHistoryPage = () => {
    const navigate = useNavigate();

    // 1. 상태 관리
    const [historyList, setHistoryList] = useState([]); // 전체 데이터 저장용
    const [loading, setLoading] = useState(true);
    
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 2. 서버에서 후원 내역 가져오기
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("로그인이 필요합니다.");
                    navigate('/login');
                    return;
                }

                // 백엔드 API 호출
                const response = await axios.get("http://localhost:8001/foodding/api/mypage/funding/history", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // 데이터 매핑
                const mappedList = response.data.map(item => ({
                    id: item.orderNo,       // 주문번호 (PK) -> id
                    date: item.fundingDate, // 날짜
                    title: item.projectTitle,
                    maker: item.makerName,
                    price: item.totalAmount,
                    status: item.fundingStatus,
                    // 썸네일 경로 처리 (http 포함 여부 확인)
                    img: item.projectThumb 
                        ? (item.projectThumb.startsWith('http') 
                            ? item.projectThumb 
                            : `http://localhost:8001/foodding${item.projectThumb}`)
                        : 'https://via.placeholder.com/150',
                    productNo: item.productNo // 상세 이동용 상품 번호
                }));

                setHistoryList(mappedList);

            } catch (error) {
                console.error("후원 내역 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    // 3. 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historyList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(historyList.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <MyPageLayout>
            <h2 className="page-title">후원 내역 조회</h2>
            
            {/* 필터 탭 (기능 구현은 나중에, 일단 UI만) */}
            <div className="filter-tabs">
                <button className="filter-btn active">전체</button>
                <button className="filter-btn">최근 3개월</button>
                <button className="filter-btn">2025년</button>
            </div>

            {/* ★ 리스트 영역 */}
            <div className="funding-list-container">
                {loading ? (
                    <div className="empty-state-box"><p>로딩 중입니다...</p></div>
                ) : currentItems.length > 0 ? (
                    currentItems.map(item => (
                        <div key={item.id} className="history-card">
                            <div className="card-top">
                                <span className="date-label">{item.date} 후원</span>
                                <span className="status-text-orange">{item.status}</span>
                            </div>
                            <div className="card-body">
                                <img src={item.img} alt={item.title} className="thumb-img" />
                                <div className="card-info">
                                    <p className="maker-name">{item.maker}</p>
                                    <h3 className="project-title">{item.title}</h3>
                                    <p className="price-text">{item.price.toLocaleString()}원</p>
                                </div>
                            </div>
                            <div className="card-actions">
                                {/* 상세 페이지 이동 링크 (productNo 사용) */}
                                <Link to={`/project/${item.productNo}`} className="action-btn primary">
                                    후원 상세
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state-box">
                        <p>아직 후원한 내역이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* ★ 페이지네이션 컨트롤 */}
            {!loading && historyList.length > 0 && (
                <div className="pagination">
                    <button 
                        className="page-control-btn" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`page-number-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button 
                        className="page-control-btn" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </MyPageLayout>
    );
};

export default FundingHistoryPage;