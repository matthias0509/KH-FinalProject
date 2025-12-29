import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout'; // 🚨 Header, Sidebar 대신 이거 하나만 import!

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css';

const FundingHistoryPage = () => {
    // const navigate = useNavigate(); // (현재 페이지 로직에서 안 쓰이면 제거해도 됨)

    // --- [페이지네이션 상태 관리] ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ❌ 기존 가짜 userInfo 삭제 (Layout이 처리함)

    // --- [테스트용 대량 데이터] ---
    const historyList = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        date: `2025.10.${(i % 30) + 1}`,
        title: `맛있는 푸딩 프로젝트 ${i + 1}탄`,
        maker: i % 2 === 0 ? '푸딩공작소' : '달콤베이커리',
        price: (i + 1) * 10000,
        status: '펀딩성공',
        img: 'https://via.placeholder.com/150'
    })).reverse();

    // --- [페이지네이션 로직] ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historyList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(historyList.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // ❌ handleMakerClick 삭제 (Sidebar에서 처리)

    return (
        // ✅ Layout으로 감싸기
        <MyPageLayout>
            <h2 className="page-title">후원 내역 조회</h2>
            
            <div className="filter-tabs">
                <button className="filter-btn active">전체</button>
                <button className="filter-btn">최근 3개월</button>
                <button className="filter-btn">2025년</button>
            </div>

            {/* ★ 리스트 영역 */}
            <div className="funding-list-container">
                {currentItems.length > 0 ? (
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
                                <Link to='/detail' className="action-btn primary">
                                    후원 상세
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state-box">
                        <p>후원 내역이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* ★ 페이지네이션 컨트롤 */}
            {historyList.length > 0 && (
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