import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; 

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/LikeFollow.css';

const LikeProjectsPage = () => {
    const navigate = useNavigate();

    // 1. 상태 관리 (데이터, 로딩)
    const [likedProjects, setLikedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. 서버에서 좋아요한 목록 가져오기
    useEffect(() => {
        const fetchLikedProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("로그인이 필요합니다.");
                    navigate('/login');
                    return;
                }

                // 백엔드 API 호출
                const response = await axios.get("http://localhost:8001/foodding/api/mypage/like", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // 받아온 데이터 가공 (이미지 경로 처리 등)
                const mappedProjects = response.data.map(item => ({
                    id: item.productNo,          // 백엔드: productNo
                    title: item.productTitle,    // 백엔드: productTitle
                    maker: item.sellerName,      // 백엔드: sellerName
                    percent: item.fundingPercent,// 백엔드: fundingPercent
                    // 썸네일 경로 처리 (http로 시작하면 그대로, 아니면 서버 주소 붙이기)
                    img: item.thumbnail 
                        ? (item.thumbnail.startsWith('http') 
                            ? item.thumbnail 
                            : `http://localhost:8001/foodding${item.thumbnail}`)
                        : 'https://via.placeholder.com/260' // 이미지 없을 때 기본값
                }));

                setLikedProjects(mappedProjects);

            } catch (error) {
                console.error("좋아요 목록 로딩 실패:", error);
                if (error.response && error.response.status === 401) {
                    alert("로그인 정보가 만료되었습니다.");
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLikedProjects();
    }, [navigate]);

    // 3. 카드 클릭 시 상세 페이지로 이동
    const handleCardClick = (id) => {
        navigate(`/project/${id}`); // 상세 페이지 라우트 주소에 맞게 수정하세요 (예: /project/1)
    };

    return (
        <MyPageLayout>
            <h2 className="page-title">좋아요한 프로젝트 ❤️</h2>

            {loading ? (
                <div className="empty-state"><p>로딩 중입니다...</p></div>
            ) : likedProjects.length > 0 ? (
                <div className="grid-container">
                    {likedProjects.map((item) => (
                        <div key={item.id} className="like-card" onClick={() => handleCardClick(item.id)}>
                            <div className="like-img-wrapper">
                                <img src={item.img} alt={item.title} />
                                {/* 하트 버튼은 장식용(이미 좋아요한 페이지니까 채워진 하트) */}
                                <button className="card-heart-btn" style={{color: '#fa5252'}}>♥</button>
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