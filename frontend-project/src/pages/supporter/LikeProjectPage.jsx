import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; 
import { resolveProjectImageUrl } from '../../utils/projectMedia';

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
                const mappedProjects = response.data.map((item, index) => ({
                    id: item.productNo || item.PRODUCT_NO || `like-${index}`,
                    title: item.productTitle || item.PRODUCT_TITLE || '제목 없음',
                    maker: item.sellerName || item.SELLER_NAME || '메이커',
                    percent: item.fundingPercent || item.FUNDING_PERCENT || 0,
                    img: resolveProjectImageUrl(
                        item.thumbnail ||
                          item.THUMBNAIL ||
                          item.thumbnailUrl ||
                          item.THUMBNAIL_URL ||
                          item.originThumbnail ||
                          item.ORIGIN_THUMBNAIL,
                        'https://via.placeholder.com/260',
                    ),
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
        navigate(`/projects/${id}`);
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
