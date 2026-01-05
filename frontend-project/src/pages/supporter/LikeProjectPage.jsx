import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; 
import { resolveProjectImageUrl } from '../../utils/projectMedia';

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/LikeFollow.css';

const API_BASE_URL = "http://localhost:8001/foodding/api/mypage";

const LikeProjectsPage = () => {
    const navigate = useNavigate();

    // --- 상태 관리 ---
    const [likedProjects, setLikedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 📄 페이징 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 한 페이지에 6개씩 표시

    // --- 데이터 로딩 ---
    const fetchLikedProjects = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/like`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const mappedProjects = response.data.map((item) => ({
                id: item.productNo,
                title: item.productTitle || '제목 없음',
                maker: item.sellerName || '메이커',
                percent: item.fundingPercent || 0,
                img: resolveProjectImageUrl(item.thumbnail || item.originThumbnail, 'https://via.placeholder.com/260'),
            }));

            setLikedProjects(mappedProjects);
        } catch (error) {
            console.error("좋아요 목록 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchLikedProjects();
    }, [fetchLikedProjects]);

    // --- 페이징 계산 로직 ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // 현재 페이지에 해당하는 6개의 아이템만 추출
    const currentItems = likedProjects.slice(indexOfFirstItem, indexOfLastItem);
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(likedProjects.length / itemsPerPage);

    const handleCardClick = (id) => {
        if (!id) return;
        navigate(`/projects/${id}`); 
    };

    return (
        <MyPageLayout>
            <h2 className="page-title">좋아요한 프로젝트 ❤️</h2>

            {loading ? (
                <div className="empty-state"><p>로딩 중입니다...</p></div>
            ) : likedProjects.length > 0 ? (
                <>
                    {/* 6개씩 끊어서 보여주는 그리드 */}
                    <div className="grid-container">
                        {currentItems.map((item) => (
                            <div key={item.id} className="like-card" onClick={() => handleCardClick(item.id)}>
                                <div className="like-img-wrapper">
                                    <img src={item.img} alt={item.title} />
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

                    {/* 📄 페이지네이션 UI */}
                    {likedProjects.length > itemsPerPage && (
                        <div className="pagination-container" style={{display:'flex', justifyContent:'center', marginTop:'40px', gap:'10px'}}>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="page-btn"
                            >
                                이전
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                    style={{
                                        padding: '5px 12px',
                                        borderRadius: '4px',
                                        backgroundColor: currentPage === i + 1 ? '#fa5252' : '#fff',
                                        color: currentPage === i + 1 ? '#fff' : '#333',
                                        border: '1px solid #ddd',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="page-btn"
                            >
                                다음
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="empty-state">
                    <p>좋아요한 프로젝트가 없습니다.</p>
                </div>
            )}
        </MyPageLayout>
    );
};

export default LikeProjectsPage;