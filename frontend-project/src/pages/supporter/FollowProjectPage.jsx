import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; 

// 스타일
import '../../styles/MyPageLayout.css';
import '../../styles/LikeFollow.css';
import { getApiBaseUrl } from '../../utils/apiConfig';

const SERVER_URL = getApiBaseUrl();

const FollowProjectPage = () => {
    const navigate = useNavigate();

    // 1. 상태 관리
    const [followingList, setFollowingList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. 팔로우 목록 불러오기 (API 연동)
    useEffect(() => {
        const fetchFollowList = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("로그인이 필요합니다.");
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${SERVER_URL}/api/mypage/follow`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // 데이터 매핑 (이미지 경로 처리 포함)
                const mappedList = response.data.map(item => ({
                    id: item.sellerNo,          // 백엔드: sellerNo -> 프론트: id
                    name: item.sellerName,      // 백엔드: sellerName -> 프론트: name
                    bio: item.sellerBio || '소개글이 없습니다.', // 백엔드: sellerBio -> 프론트: bio
                    img: item.sellerImage 
                        ? (item.sellerImage.startsWith('http') 
                            ? item.sellerImage 
                            : `${SERVER_URL}/uploads/${item.sellerImage}`)
                        : null // 이미지가 없으면 null (나중에 렌더링 때 처리)
                }));

                setFollowingList(mappedList);

            } catch (error) {
                console.error("팔로우 목록 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowList();
    }, [navigate]);

    // 판매자 프로필로 이동
    const handleSellerClick = (seller) => {
        console.log('판매자 클릭:', seller);
        const sellerUserNo = seller.userNo || seller.id;
        
        if (!sellerUserNo) {
            console.error('판매자 번호가 없습니다:', seller);
            return;
        }
        
        navigate(`/seller/${sellerUserNo}`);
    };

    // 3. 언팔로우 핸들러 (InteractionController API 호출)
    const handleUnfollow = async (e, sellerNo, sellerName) => {

        // 이벤트 버블링 방지 (카드 클릭 이벤트와 충돌 방지)
        e.stopPropagation();

        if (!window.confirm(`'${sellerName}' 님을 팔로우 취소하시겠습니까?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            // 팔로우 토글 API 호출 (이미 팔로우 중이므로 취소됨)
            await axios.post(`http://localhost:8001/foodding/api/interaction/follow/${sellerNo}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // 성공 시 목록에서 즉시 제거 (새로고침 없이 반영)
            setFollowingList(prevList => prevList.filter(maker => maker.id !== sellerNo));

        } catch (error) {
            console.error("언팔로우 실패:", error);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <MyPageLayout>
            <h2 className="page-title">팔로우 목록 조회 👀</h2>

            <div className="follow-list-container">
                {loading ? (
                    <div className="empty-state"><p>로딩 중입니다...</p></div>
                ) : followingList.length > 0 ? (
                    followingList.map((maker) => (
                        <div 
                            key={maker.id} 
                            className="follow-card"
                            onClick={() => handleSellerClick(maker)}
                            style={{ 
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div className="follow-info-group">
                                {/* 프로필 이미지 처리: 이미지가 있으면 img 태그, 없으면 이모지나 기본값 */}
                                <div className="maker-profile-img" style={{overflow:'hidden'}}>
                                    {maker.img ? (
                                        <img 
                                            src={maker.img} 
                                            alt={maker.name} 
                                            style={{width:'100%', height:'100%', objectFit:'cover'}}
                                            onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='🍮'}}
                                        />
                                    ) : '🍮'}
                                </div>
                                <div className="maker-details">
                                    <span className="maker-name">{maker.name}</span>
                                    <span className="maker-bio">{maker.bio}</span>
                                </div>
                            </div>
                            <button 
                                className="following-btn active"
                                onClick={(e) => handleUnfollow(e, maker.id, maker.name)}
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
        </MyPageLayout>
    );
};

export default FollowProjectPage;
