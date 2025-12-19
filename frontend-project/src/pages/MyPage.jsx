import React from 'react';
import { Link } from 'react-router-dom'; // useNavigate 삭제 (안 씀)
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';

import '../styles/MyPageLayout.css';
import '../styles/MyPage.css';

// App.js에서 userInfo를 props로 받아옵니다.
const MyPage = ({ userInfo }) => {

    // --- 가상 데이터 (서버 연동 전까지 사용) ---
    const fundingHistory = [
        {
            id: 101,
            title: '입안에서 사르르 녹는 수제 커스터드 푸딩',
            status: '결제완료',
            amount: 25000,
            date: '2025.10.24',
            img: 'https://via.placeholder.com/100'
        },
    ];

    const likedProjects = [
        { id: 1, title: '초코 듬뿍 브라우니', percent: 120, img: 'https://via.placeholder.com/150' },
        { id: 2, title: '제주 말차 라떼 키트', percent: 85, img: 'https://via.placeholder.com/150' },
        { id: 3, title: '비건 쌀 쿠키', percent: 240, img: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 사이드바에 유저 정보를 전달하면, 알아서 잠금/해제 처리함 */}
                <Sidebar userInfo={userInfo} />
            
                {/* --- 메인 콘텐츠 (Dashboard) --- */}
                <main className="main-content">
                    <h2 className="greeting">{userInfo.name}님 반가워요! 👋</h2>

                    {/* 활동 현황 배너 */}
                    <div className="activity-banner">
                        <div className="activity-item">
                            <span className="icon">🎁</span>
                            <span className="label">후원 참여</span>
                            <span className="value">{userInfo.stats.fundingCount}</span>
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="activity-item">
                            <span className="icon">❤️</span>
                            <span className="label">좋아요</span>
                            <span className="value">{userInfo.stats.likedCount}</span>
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="activity-item">
                            <span className="icon">👀</span>
                            <span className="label">팔로잉</span>
                            <span className="value">{userInfo.stats.followingCount}</span>
                        </div>
                    </div>

                    {/* 최근 후원 내역 섹션 */}
                    <section className="section-block">
                        <div className="section-header">
                            <h3>최근 후원 내역</h3>
                            <Link to="/history" className="more-link">더보기 &gt;</Link>
                        </div>
                        
                        {fundingHistory.length > 0 ? (
                            <div className="funding-list">
                                {fundingHistory.map(item => (
                                    <div key={item.id} className="funding-item">
                                        <img src={item.img} alt="썸네일" className="thumb" />
                                        <div className="info">
                                            <div className="status-row">
                                                <span className="date">{item.date}</span>
                                                <span className={`status-badge ${item.status === '결제완료' ? 'done' : ''}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="title">{item.title}</p>
                                            <p className="amount">{item.amount.toLocaleString()}원</p>
                                        </div>
                                        <Link to={`/history/${item.id}`} className="detail-btn">상세 보기</Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-box">
                                <p>아직 후원한 내역이 없습니다.</p>
                            </div>
                        )}
                    </section>

                    {/* 좋아요한 프로젝트 섹션 */}
                    <section className="section-block">
                        <div className="section-header">
                            <h3>좋아요한 프로젝트 ❤️</h3>
                            <Link to="/like" className="more-link">전체보기 &gt;</Link>
                        </div>
                        <div className="card-list">
                            {likedProjects.map((item) => (
                                <div key={item.id} className="product-card">
                                    <div className="img-wrapper">
                                        <img src={item.img} alt={item.title} />
                                        <button className="heart-btn active">♥</button>
                                    </div>
                                    <div className="card-info">
                                        <p className="percent">{item.percent}% 달성</p>
                                        <p className="title">{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
              
            </div>
            <AppFooter />
        </div>
    );
};

export default MyPage;