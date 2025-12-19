<<<<<<< Updated upstream
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
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 임포트
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import '../styles/MyPage.css';

const MyPage = () => {
    // 모드 상태 관리 (supporter | maker)
    const [userMode, setUserMode] = useState('supporter'); 

    // 임시 데이터 (최근 본 상품)
    const recentItems = [
        { id: 1, title: '아직도 리프팅 받으시나요? 한 달 2만원...', percent: 7530, price: 348900, img: 'https://via.placeholder.com/150' },
        { id: 2, title: '15분 완성! 국내산 제육볶음', percent: 271, price: 12900, img: 'https://via.placeholder.com/150' },
        { id: 3, title: '만족도 4.9, 누적 30억 고주파...', percent: 122251, price: 298000, img: 'https://via.placeholder.com/150' },
        { id: 4, title: '최초 공개! 가장 작고 강력한 드라이기', percent: 25717, price: 89000, img: 'https://via.placeholder.com/150' },
>>>>>>> Stashed changes
    ];

    return (
        <div className="page-wrapper">
            <Header />
<<<<<<< Updated upstream
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
=======
            
            <div className="mypage-container">
                {/* --- 좌측 사이드바 --- */}
                <aside className="sidebar">
                    {/* 모드 전환 토글 */}
                    <div className="mode-switch">
                        <button 
                            className={`mode-btn ${userMode === 'supporter' ? 'active' : ''}`}
                            onClick={() => setUserMode('supporter')}
                        >
                            서포터
                        </button>
                        <Link to="/maker" className="mode-btn link-btn">
                            메이커
                        </Link>
                    </div>

                    {/* 프로필 영역 */}
                    <div className="profile-section">
                        <div className="profile-img">😐</div>
                        <h3 className="username">juhyeon00 <span className="arrow">&gt;</span></h3>
                        <Link to='/profile' className="profile-setting-btn">내 정보 변경</Link>
                    </div>

                    {/* 메뉴 리스트 */}
                    <nav className="menu-list">
                        <p className="menu-category">나의 활동</p>
                        <ul>
                            <li>최근본</li>
                            <li>찜·알림신청</li>
                            <li>친구초대 <span className="badge">5,000P</span></li>
                            <li>초대 코드 입력 <span className="badge">5,000P</span></li>
                            <li>팔로잉</li>
                            <li>간편결제 설정</li>
                            <li>메이커 문의내역</li>
                        </ul>
                    </nav>
                </aside>

                {/* --- 우측 메인 콘텐츠 --- */}
                <main className="main-content">
                    {/* 인사말 */}
                    <h2 className="greeting">juhyeon00님 안녕하세요.</h2>

                    {/* 배너 */}
                    <div className="top-banner">
                        <span className="icon">CLUB</span> 서포터클럽 3개월 무료 혜택 받기
                    </div>

                    {/* 대시보드 (활동 내역 & 포인트) */}
                    <div className="dashboard-grid">
                        <div className="status-card">
                            <div className="status-item">
                                <span className="icon">🎁</span>
                                <span className="label">펀딩+</span>
                                <span className="value">0</span>
                            </div>
                            <div className="status-item">
                                <span className="icon">🏪</span>
                                <span className="label">스토어</span>
                                <span className="value">0</span>
                            </div>
                            <div className="status-item">
                                <span className="icon">👏</span>
                                <span className="label">지지서명</span>
                                <span className="link">보기</span>
                            </div>
                            <div className="status-item">
                                <span className="icon">🔔</span>
                                <span className="label">알림신청</span>
                                <span className="link">보기</span>
                            </div>
                        </div>

                        <div className="point-card">
                            <div className="point-row">
                                <span>포인트</span>
                                <span className="point-val">0 P</span>
                            </div>
                            <div className="divider"></div>
                            <div className="point-row">
                                <span>쿠폰</span>
                                <span className="coupon-val">3장</span>
                            </div>
                        </div>
                    </div>

                    {/* 광고 배너 영역 */}
                    <div className="promo-banners">
                        <div className="promo-box">
                            <p className="promo-tag">메이커 추천하기</p>
                            <p className="promo-text">메이커 추천하면 최대 50,000포인트</p>
                            <div className="promo-icon">P</div>
                        </div>
                        <div className="promo-box">
                            <p className="promo-tag">글로벌 서비스 오픈</p>
                            <p className="promo-text">친구와 함께 5,000P 혜택 받기!</p>
                            <div className="promo-icon">🌍</div>
                        </div>
                    </div>

                    {/* 최근 본 상품 리스트 */}
                    <section className="recent-section">
                        <h3>juhyeon00 님이 최근에 봤어요</h3>
                        <div className="card-list">
                            {recentItems.map((item) => (
                                <div key={item.id} className="product-card">
                                    <div className="img-wrapper">
                                        <img src={item.img} alt={item.title} />
                                        <button className="heart-btn">♡</button>
                                    </div>
                                    <div className="card-info">
                                        <p className="percent">{item.percent.toLocaleString()}% 달성</p>
                                        <p className="title">{item.title}</p>
                                        <div className="tags">
                                            <span className="tag">무료배송</span>
                                        </div>
>>>>>>> Stashed changes
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
<<<<<<< Updated upstream
              
            </div>
=======
            </div>

>>>>>>> Stashed changes
            <AppFooter />
        </div>
    );
};

export default MyPage;