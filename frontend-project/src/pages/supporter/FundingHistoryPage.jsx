import React, { useState } from 'react'; // useState 추가 필수
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';

import '../../styles/MyPageLayout.css';
import '../../styles/Funding.css';


const FundingHistoryPage = () => {
    const navigate = useNavigate();

    // --- [페이지네이션 상태 관리] ---
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 5; // 한 페이지에 보여줄 개수 (5개씩)

    const userInfo = {
        name: '푸딩러버',
        profileImg: '🍮',
        role: 'supporter'
    };

    // --- [테스트용 대량 데이터 생성] ---
    // 실제로는 API에서 받아오거나 기존 historyList를 사용하시면 됩니다.
    // 여기서는 테스트를 위해 15개의 더미 데이터를 만듭니다.
    const historyList = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        date: `2025.10.${(i % 30) + 1}`,
        title: `맛있는 푸딩 프로젝트 ${i + 1}탄`,
        maker: i % 2 === 0 ? '푸딩공작소' : '달콤베이커리',
        price: (i + 1) * 10000,
        status: '펀딩성공',
        img: 'https://via.placeholder.com/150'
    })).reverse(); // 최신순 정렬처럼 보이게 뒤집기

    // --- [페이지네이션 로직] ---
    const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 인덱스
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 인덱스
    const currentItems = historyList.slice(indexOfFirstItem, indexOfLastItem); // 데이터 자르기
    const totalPages = Math.ceil(historyList.length / itemsPerPage); // 총 페이지 수 계산

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // 페이지 넘기면 맨 위로 스크롤
    };

    const handleMakerClick = () => {
        if (userInfo.role !== 'maker') {
            if (window.confirm("메이커 권한이 없습니다.\n관리자에게 권한을 신청하시겠습니까?")) {
                alert("관리자에게 메이커 권한을 요청했습니다!");
            }
        } else {
            navigate('/maker');
        }
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
              <Sidebar userInfo={userInfo} />

                <main className="main-content">
                    <h2 className="page-title">후원 내역 조회</h2>
                    
                    <div className="filter-tabs">
                        <button className="filter-btn active">전체</button>
                        <button className="filter-btn">최근 3개월</button>
                        <button className="filter-btn">2025년</button>
                    </div>

                    {/* ★ 리스트 영역 (currentItems 사용) */}
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

                    {/* ★ 페이지네이션 컨트롤 (데이터가 있을 때만 표시) */}
                    {historyList.length > 0 && (
                        <div className="pagination">
                            {/* 이전 버튼 */}
                            <button 
                                className="page-control-btn" 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>

                            {/* 페이지 번호들 */}
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`page-number-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* 다음 버튼 */}
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

export default FundingHistoryPage;