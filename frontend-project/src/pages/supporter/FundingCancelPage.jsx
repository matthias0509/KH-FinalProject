import React, { useState } from 'react'; // useState 추가
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';

// 스타일 파일 import (파일명 확인해주세요)
import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css'; 

const FundingCancelPage = () => {
    const navigate = useNavigate();

    // --- [페이지네이션 상태] ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 한 페이지에 5개씩 표시

    const userInfo = {
        name: '푸딩러버',
        profileImg: '🍮',
        role: 'supporter'
    };

    // --- [테스트용 대량 데이터 생성] ---
    // 실제로는 기존 cancelList 대신 이 부분을 API 데이터로 교체하면 됩니다.
    // 테스트를 위해 12개의 취소 데이터를 만듭니다.
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
    })).reverse(); // 최신순

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

    // 메이커 버튼 핸들러
    const handleMakerClick = () => {
        if (userInfo.role !== 'maker') {
            if (window.confirm("메이커 권한이 없습니다.\n관리자에게 권한을 신청하시겠습니까?")) {
                alert("관리자에게 메이커 권한을 요청했습니다! (승인 대기 중)");
            }
        } else {
            navigate('/maker');
        }
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* --- 사이드바 --- */}
               <Sidebar userInfo={userInfo} />

                {/* --- 메인 콘텐츠 --- */}
                <main className="main-content">
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

                    {/* ★ 페이지네이션 컨트롤 (데이터 있을 때만 표시) */}
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
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default FundingCancelPage;