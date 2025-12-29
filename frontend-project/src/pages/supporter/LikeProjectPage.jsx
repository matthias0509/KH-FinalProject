import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout'; // 🚨 Header, Sidebar 대신 이거 하나만 import!

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/LikeFollow.css';

const LikeProjectsPage = () => {
    // const navigate = useNavigate(); // (현재 페이지 로직에서 안 쓰이면 제거해도 됨)

    // ❌ 기존 가짜 userInfo 삭제 (Layout이 처리함)

    // 가상 데이터: 좋아요한 프로젝트
    const likedProjects = [
        {
            id: 1,
            title: '10분 완성! 초간단 홈베이킹 키트',
            maker: '베이킹마스터',
            percent: 350,
            img: 'https://via.placeholder.com/260'
        },
        {
            id: 2,
            title: '입안에서 녹는 수제 생초콜릿',
            maker: '초코공방',
            percent: 120,
            img: 'https://via.placeholder.com/260'
        },
        {
            id: 3,
            title: '제주 유기농 말차 라떼',
            maker: '제주티룸',
            percent: 85,
            img: 'https://via.placeholder.com/260'
        },
        {
            id: 4,
            title: '친환경 대나무 칫솔 & 고체 치약',
            maker: '에코라이프',
            percent: 2100,
            img: 'https://via.placeholder.com/260'
        }
    ];

    // ❌ handleMakerClick 삭제 (Sidebar에서 처리)

    return (
        // ✅ Layout으로 감싸기
        <MyPageLayout>
            <h2 className="page-title">좋아요한 프로젝트 ❤️</h2>

            {likedProjects.length > 0 ? (
                <div className="grid-container">
                    {likedProjects.map((item) => (
                        <div key={item.id} className="like-card">
                            <div className="like-img-wrapper">
                                <img src={item.img} alt={item.title} />
                                <button className="card-heart-btn">♥</button>
                            </div>
                            <div className="like-card-info">
                                <p className="like-percent">{item.percent}% 달성</p>
                                <h3 className="like-title">{item.title}</h3>
                                <p className="like-maker">{item.maker}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>좋아요한 프로젝트가 없습니다.</p>
                </div>
            )}
        </MyPageLayout>
    );
};

export default LikeProjectsPage;