import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 컴포넌트 import (경로는 프로젝트 구조에 맞게 확인해주세요)
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';

// CSS import
import '../styles/MyPageLayout.css';
import '../styles/MyPage.css';

const MyPage = () => {
    const navigate = useNavigate();
    
    // 1. 상태 관리
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보
    const [loading, setLoading] = useState(true);   // 로딩 상태

    // 2. 데이터 가져오기 (마운트 시 실행)
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // 저장된 토큰 가져오기 (로그인 시 저장한 키 이름: 'token' 또는 'accessToken')
                const token = localStorage.getItem('token'); 

                // 토큰이 없으면 로그인 페이지로 리다이렉트
                if (!token) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate('/login');
                    return;
                }

                // 서버 요청 (헤더에 토큰 포함)
                const response = await axios.get("http://localhost:8001/foodding/api/mypage/info", {
                    headers: {
                        'Authorization': `Bearer ${token}` // ✅ 핵심: JWT 토큰 전송
                    }
                });

                // 받아온 데이터 저장
                setUserInfo(response.data);
                
            } catch (error) {
                console.error("내 정보 불러오기 실패:", error);
                
                // 401 에러(인증 실패) 시 처리
                if (error.response && error.response.status === 401) {
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    localStorage.removeItem('token'); // 만료된 토큰 삭제
                    navigate('/login');
                }
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchUserInfo();
    }, [navigate]);

    // 3. 가상 데이터 (추후 서버 API가 준비되면 이 부분도 axios로 가져오게 수정)
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

    // 4. 렌더링 로직
    
    // 로딩 중일 때 표시할 화면
    if (loading) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="mypage-container" style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>내 정보를 불러오는 중입니다...</p>
                </div>
                <AppFooter />
            </div>
        );
    }

    // 데이터 로드 실패 혹은 데이터가 없을 때
    if (!userInfo) return null;

    return (
        <div className="page-wrapper">
            <Header />
            
            <div className="mypage-container">
                {/* ✅ 서버에서 가져온 userInfo를 사이드바에 전달 */}
                <Sidebar userInfo={userInfo} />
            
                <main className="main-content">
                    {/* 사용자 이름 표시 */}
                    <h2 className="greeting">
                        {userInfo.userName || userInfo.name || userInfo.nickname}님 반가워요! 👋
                    </h2>

                    {/* 활동 현황 배너 */}
                    <div className="activity-banner">
                        <div className="activity-item">
                            <span className="icon">🎁</span>
                            <span className="label">후원 참여</span>
                            {/* userInfo 내부에 stats 객체가 없어도 에러 안 나게 처리 (?.) */}
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
                            <Link to="/mypage/history" className="more-link">더보기 &gt;</Link>
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
                            <Link to="/mypage/like" className="more-link">전체보기 &gt;</Link>
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