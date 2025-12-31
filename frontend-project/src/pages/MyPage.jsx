import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';

import '../styles/MyPageLayout.css';
import '../styles/MyPage.css';

const MyPage = () => {
    const navigate = useNavigate();
    
    // --- [상태 관리] ---
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // 추가된 상태: 좋아요한 프로젝트 목록, 후원 내역
    const [likedProjects, setLikedProjects] = useState([]);
    const [fundingHistory, setFundingHistory] = useState([]);

    // --- [데이터 가져오기] ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate('/login');
                    return;
                }

                // 1. 내 정보 가져오기 (통계 포함)
                const userRes = await axios.get("http://localhost:8001/foodding/api/mypage/info", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUserInfo(userRes.data);

                // 2. 좋아요한 프로젝트 가져오기 (API 호출)
                try {
                    const likeRes = await axios.get("http://localhost:8001/foodding/api/mypage/like", {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    // 서버 데이터 구조에 맞춰 매핑 (필요시)
                    const mappedLikes = likeRes.data.map(item => ({
                        id: item.productNo, // DB 컬럼명에 맞게 수정 필요
                        title: item.productTitle,
                        maker: item.sellerName || '메이커',
                        percent: item.fundingPercent || 0,
                        img: item.thumbnailUrl ? `http://localhost:8001/foodding${item.thumbnailUrl}` : 'https://via.placeholder.com/150'
                    }));
                    setLikedProjects(mappedLikes);
                } catch (err) {
                    console.error("좋아요 목록 로딩 실패:", err);
                    setLikedProjects([]); // 실패 시 빈 배열
                }

                // 3. 최근 후원 내역 가져오기 (API 호출 - 예시)
                try {
                    const historyRes = await axios.get("http://localhost:8001/foodding/api/mypage/funding/history?limit=3", { // 최근 3개만
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    const mappedHistory = historyRes.data.map(item => ({
                        id: item.fundingNo,
                        title: item.projectTitle,
                        status: item.fundingStatus, // '결제완료', '펀딩성공' 등
                        amount: item.totalAmount,
                        date: item.fundingDate, // 날짜 포맷팅 필요할 수 있음
                        img: item.projectThumb ? `http://localhost:8001/foodding${item.projectThumb}` : 'https://via.placeholder.com/100'
                    }));
                    setFundingHistory(mappedHistory);

                } catch (err) {
                    console.error("후원 내역 로딩 실패:", err);
                    // 실패 시 빈 배열 (화면 깨짐 방지)
                    setFundingHistory([]); 
                }
                
            } catch (error) {
                console.error("데이터 초기화 실패:", error);
                if (error.response && error.response.status === 401) {
                    alert("로그인 정보가 만료되었습니다.");
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);


    // --- [렌더링] ---
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

    if (!userInfo) return null;

    return (
        <div className="page-wrapper">
            <Header />
            
            <div className="mypage-container">
                <Sidebar userInfo={userInfo} />
            
                <main className="main-content">
                    <h2 className="greeting">
                        {userInfo.userName || userInfo.nickname}님 반가워요! 👋
                    </h2>

                    {/* 활동 현황 배너 (API 데이터 연동) */}
                    <div className="activity-banner">
                        <div className="activity-item">
                            <span className="icon">🎁</span>
                            <span className="label">후원 참여</span>
                            {/* userInfo에 stats가 없으면 0 처리 */}
                            <span className="value">{fundingHistory.length || 0}</span> 
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="activity-item">
                            <span className="icon">❤️</span>
                            <span className="label">좋아요</span>
                            <span className="value">{likedProjects.length || 0}</span>
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="activity-item">
                            <span className="icon">👀</span>
                            <span className="label">팔로잉</span>
                            <span className="value">{userInfo.followCount || 0}</span> {/* API에서 followCount를 준다고 가정 */}
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
                        
                        {likedProjects.length > 0 ? (
                            <div className="card-list">
                                {likedProjects.map((item) => (
                                    <div key={item.id} className="product-card" onClick={() => navigate(`/project/${item.id}`)}>
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
                        ) : (
                            <div className="empty-box">
                                <p>좋아요한 프로젝트가 없습니다.</p>
                            </div>
                        )}
                    </section>
                </main>
            </div>
            
            <AppFooter />
        </div>
    );
};

export default MyPage;