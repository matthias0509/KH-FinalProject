import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/LikeFollow.css';

const FollowProjectPage = () => {
    const navigate = useNavigate();

    const userInfo = {
        name: '푸딩러버',
        profileImg: '🍮',
        role: 'supporter'
    };

    // 가상 데이터: 팔로우 중인 메이커
    const [followingList, setFollowingList] = useState([
        { id: 1, name: '푸딩공작소', bio: '매일 만드는 신선한 수제 푸딩', img: '🍮' },
        { id: 2, name: '제주티룸', bio: '제주의 향기를 담은 프리미엄 티', img: '🍵' },
        { id: 3, name: '캠핑마스터', bio: '아웃도어 라이프의 모든 것', img: '⛺' },
    ]);

    // 팔로우 취소 핸들러 (단순 기능 예시)
    const toggleFollow = (id) => {
        if(window.confirm('팔로우를 취소하시겠습니까?')) {
            setFollowingList(followingList.filter(maker => maker.id !== id));
        }
    };

    const handleMakerClick = () => {
        if (userInfo.role !== 'maker') {
            if (window.confirm("메이커 권한이 없습니다.\n신청하시겠습니까?")) {
                alert("요청되었습니다!");
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
                    <h2 className="page-title">팔로우 목록 조회 👀</h2>

                    <div className="follow-list-container">
                        {followingList.length > 0 ? (
                            followingList.map((maker) => (
                                <div key={maker.id} className="follow-card">
                                    <div className="follow-info-group">
                                        <div className="maker-profile-img">{maker.img}</div>
                                        <div className="maker-details">
                                            <span className="maker-name">{maker.name}</span>
                                            <span className="maker-bio">{maker.bio}</span>
                                        </div>
                                    </div>
                                    <button 
                                        className="following-btn active"
                                        onClick={() => toggleFollow(maker.id)}
                                    >
                                        팔로잉 v
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>팔로우 중인 메이커가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default FollowProjectPage;