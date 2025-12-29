import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout'; // 🚨 Header, Sidebar 대신 이거 하나만 import!

// 스타일 파일
import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css'; 

const FundingCancelPage = () => {
    // const navigate = useNavigate(); // (현재 페이지 로직에서 안 쓰이면 제거해도 됨)

    // --- [페이지네이션 상태] ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    // ❌ 기존 가짜 userInfo 삭제 (Layout이 처리함)

    // --- [테스트용 대량 데이터] ---
    const cancelList = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        date: `2025.10.${(i % 30) + 1}`,
        cancelDate: `2025.10.${(i % 30) + 3}`,
        title: `취소된 프로젝트 ${i + 1}`,
        maker: '캠핑마스터',
        price: (i + 1) * 5000,
        status: '취소완료',
        reason: '단순 변심',
        img: 'https://via.placeholder.com/150'
    })).reverse(); 

    // --- [데이터 자르기 로직] ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cancelList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cancelList.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // ❌ handleMakerClick 삭제 (Sidebar 내부에서 처리함)

    return (
        // ✅ Header, Sidebar, Footer 다 지우고 Layout 하나로 감싸기!
        <MyPageLayout>
            <h2 className="page-title">후원 취소/환불 내역</h2>

            <div className="funding-list-container">
                {currentItems.length > 0 ? (
                    currentItems.map(item => (
                        <div key={item.id} className="history-card cancel-card">
                            <div className="card-top">
                                <span className="date-label">{item.date} 후원</span>
                                <span className="status-label cancel">{item.status} ({item.cancelDate})</span>
                            </div>
                            <div className="card-body">
                                <img src={item.img} alt={item.title} className="thumb-img grayscale" />
                                <div className="card-info">
                                    <p className="maker-name">{item.maker}</p>
                                    <h3 className="project-title disabled">{item.title}</h3>
                                    <p className="price-text">{item.price.toLocaleString()}원</p>
                                    <p className="cancel-reason">사유: {item.reason}</p>
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="action-btn">상세 내역</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state-box">
                        <p>취소/환불 내역이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* ★ 페이지네이션 컨트롤 */}
            {cancelList.length > 0 && (
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

export default FundingCancelPage;