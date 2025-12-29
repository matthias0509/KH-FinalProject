import React, { useState, useEffect } from 'react'; // useState, useEffect 추가
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';

import '../styles/MyPageLayout.css';
import '../styles/MyPage.css';

const MyPage = ({ userInfo: initialUserInfo }) => {
    // 1. props로 받은 정보를 초기값으로 설정하되, 내부에서 변경 가능하도록 state로 관리
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    // 2. 화면이 열릴 때(마운트) 서버에서 최신 정보를 다시 가져옴
    useEffect(() => {
        const fetchLatestUserInfo = async () => {
            try {
                // ProfileEditPage와 동일한 API 주소 사용
                const res = await axios.get("http://localhost:8001/foodding/api/mypage/info");
                setUserInfo(res.data); // 최신 정보로 덮어쓰기
            } catch (e) {
                console.error("최신 정보 불러오기 실패", e);
            }
        };

        fetchLatestUserInfo();
    }, []); 

    // 데이터가 없을 경우 방어 코드
    if (!userInfo) return null;

    // --- (아래부터는 기존 코드와 동일) ---
    // 가상 데이터 (서버 연동 전까지 사용)
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
                {/* 3. 최신화된 userInfo를 Sidebar에 전달 */}
                <Sidebar userInfo={userInfo} />
            
                <main className="main-content">
                    <h2 className="greeting">{userInfo.name}님 반가워요! 👋</h2>

                    {/* 활동 현황 배너 */}
                    <div className="activity-banner">
                        <div className="activity-item">
                            <span className="icon">🎁</span>
                            <span className="label">후원 참여</span>
                            <span className="value">{userInfo.stats?.fundingCount || 0}</span>
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="activity-item">
                            <span className="icon">❤️</span>
                            <span className="label">좋아요</span>
                            <span className="value">{userInfo.stats?.likedCount || 0}</span>
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="activity-item">
                            <span className="icon">👀</span>
                            <span className="label">팔로잉</span>
                            <span className="value">{userInfo.stats?.followingCount || 0}</span>
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