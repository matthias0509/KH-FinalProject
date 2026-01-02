import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';
import '../../styles/MyPageLayout.css';

const FundingDetailPage = () => {
    const { fundingNo } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                const userRes = await axios.get("http://localhost:8001/foodding/api/mypage/info", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserInfo(userRes.data);

                const response = await axios.get(`http://localhost:8001/foodding/api/mypage/funding/${fundingNo}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDetail(response.data);

            } catch (error) {
                console.error("상세 정보 로딩 실패", error);
            }
        };

        fetchDetail();
    }, [fundingNo, navigate]);

    if (!detail || !userInfo) return <div className="page-wrapper"><Header /><div className="mypage-container"><main className="main-content"><p style={{padding:'40px', textAlign:'center'}}>로딩 중...</p></main></div></div>;

    const shippingFee = detail.shippingFee || 3000;
    const rewardPrice = detail.rewardPrice || 0;
    const quantity = detail.quantity || 1;
    const itemTotal = rewardPrice * quantity;

    const handleProjectClick = () => {
        if (detail.productNo) {
            navigate(`/projects/${detail.productNo}`);
        }
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                <Sidebar userInfo={userInfo} />
                
                <main className="main-content">
                    <h2 className="page-title">후원 상세 정보</h2>

                    {/* 1. 프로젝트 정보 카드 */}
                    <div className="project-info-card" onClick={handleProjectClick} title="프로젝트 보러가기">
                        <span className={`status-badge-lg ${detail.orderStatus === 'PAY' ? 'done' : ''}`}>
                            {detail.orderStatus === 'PAY' ? '결제완료' : detail.orderStatus}
                        </span>
                        
                        <div className="project-detail-row">
                            <img 
                                src={detail.projectThumb ? (detail.projectThumb.startsWith('http') ? detail.projectThumb : `http://localhost:8001/foodding${detail.projectThumb}`) : "https://via.placeholder.com/140"} 
                                alt="썸네일" 
                                className="project-thumb-lg" 
                            />
                            <div className="project-text-info">
                                <span className="maker-name">{detail.makerName}</span>
                                <h3 className="project-title-lg">{detail.projectTitle}</h3>
                                <span className="funding-date">{detail.orderDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. 상세 정보 그리드 (디자인 리뉴얼) */}
                    <div className="detail-grid-container">
                        
                        {/* 왼쪽: 결제 정보 (영수증 스타일) */}
                        <div className="payment-summary-box">
                            <h3 className="payment-title">결제 정보</h3>
                            
                            <div className="payment-row">
                                <span className="payment-label">선택 리워드</span>
                                <span className="payment-value">{detail.rewardName}</span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">수량</span>
                                <span className="payment-value">{quantity}개</span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">리워드 금액</span>
                                <span className="payment-value">{itemTotal.toLocaleString()}원</span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">배송비</span>
                                <span className="payment-value">{shippingFee.toLocaleString()}원</span>
                            </div>

                            <div className="payment-total-row">
                                <span className="total-label">총 결제금액</span>
                                <span className="total-amount">{detail.totalAmount.toLocaleString()}원</span>
                            </div>
                        </div>

                        {/* 오른쪽: 배송지 정보 (깔끔한 박스) */}
                        <div className="delivery-info-box">
                            <div>
                                <h3 className="delivery-title">배송지 정보</h3>
                                <div className="delivery-row">
                                    <span className="delivery-label">받는 사람</span>
                                    <span className="delivery-value">{userInfo.userName}</span>
                                </div>
                                <div className="delivery-row">
                                    <span className="delivery-label">연락처</span>
                                    <span className="delivery-value">{userInfo.phone}</span>
                                </div>
                                <div className="delivery-row">
                                    <span className="delivery-label">주소</span>
                                    <span className="delivery-value">
                                        ({detail.postcode})<br/>
                                        {detail.address}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="delivery-status-badge">
                                배송 상태 : {detail.deliveryStatus === 'READY' ? '배송 준비 중' : detail.deliveryStatus}
                            </div>
                        </div>

                    </div>

                    <div className="btn-group-center">
                        <button className="list-btn" onClick={() => navigate('/mypage/history')}>
                            목록으로 돌아가기
                        </button>
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default FundingDetailPage;