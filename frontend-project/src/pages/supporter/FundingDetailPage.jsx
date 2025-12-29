import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyPageLayout from '../../components/MyPageLayout'; // 🚨 Header, Sidebar 대신 이거 하나만 import!

import '../../styles/MyPage.css';

const FundingDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // ❌ 가상 userInfo 삭제 (Layout이 처리함)

    // 상세 데이터 (가상)
    const detailData = {
        projectId: 101,
        status: '펀딩중',
        dDay: 'D-12',
        title: '입안에서 사르르 녹는 수제 커스터드 푸딩',
        maker: '푸딩공작소',
        img: 'https://via.placeholder.com/300x200',
        
        rewardName: '[슈퍼얼리버드] 커스터드 푸딩 6구 세트',
        rewardOption: '옵션: 오리지널 3 + 초코 3',
        quantity: 1,
        price: 25000,
        shippingFee: 3000,
        totalPrice: 28000,

        recipient: '푸딩러버',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123, 푸딩빌딩 301호',
        
        paymentMethod: '카카오페이 (카드)',
        paymentDate: '2025.10.24',
    };

    // ❌ handleMakerClick 삭제 (Sidebar에서 처리)

    return (
        // ✅ Layout으로 감싸기
        <MyPageLayout>
            <div className="page-header-row">
                <h2 className="page-title">후원 상세 정보</h2>
                <button className="filter-btn" onClick={() => navigate(-1)}>목록으로</button>
            </div>

            <div className="detail-card">
                <div className="detail-header">
                    <div className="status-badge-group">
                        <span className="d-day-badge">{detailData.dDay}</span>
                        <span className="status-text">{detailData.status}</span>
                    </div>
                    <h3 className="detail-project-title">{detailData.title}</h3>
                    <p className="detail-maker">{detailData.maker}</p>
                </div>

                <div className="detail-section project-summary">
                    <img src={detailData.img} alt="프로젝트 이미지" className="detail-img" />
                    <div className="summary-text">
                        <p>펀딩이 성공하면 <strong>{detailData.paymentDate}</strong>에 결제됩니다.</p>
                        <button className="contact-maker-btn">메이커에게 문의하기</button>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="detail-section">
                    <h4 className="section-title">선택한 리워드</h4>
                    <div className="info-box">
                        <p className="reward-name">{detailData.rewardName}</p>
                        <p className="reward-option">{detailData.rewardOption}</p>
                        <div className="price-row">
                            <span>{detailData.price.toLocaleString()}원 x {detailData.quantity}개</span>
                            <span className="bold">{detailData.price.toLocaleString()}원</span>
                        </div>
                        <div className="price-row shipping">
                            <span>배송비</span>
                            <span>{detailData.shippingFee.toLocaleString()}원</span>
                        </div>
                        <div className="total-row">
                            <span>최종 후원 금액</span>
                            <span className="total-price">{detailData.totalPrice.toLocaleString()}원</span>
                        </div>
                    </div>
                </div>

                <div className="detail-section">
                    <h4 className="section-title">배송지 정보</h4>
                    <div className="info-table">
                        <div className="info-row">
                            <span className="label">받는 분</span>
                            <span className="value">{detailData.recipient}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">연락처</span>
                            <span className="value">{detailData.phone}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">주소</span>
                            <span className="value">{detailData.address}</span>
                        </div>
                        <button className="outline-btn small">배송지 변경</button>
                    </div>
                </div>

                <div className="detail-section">
                    <h4 className="section-title">결제 정보</h4>
                    <div className="info-table">
                        <div className="info-row">
                            <span className="label">결제 수단</span>
                            <span className="value">{detailData.paymentMethod}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">결제 상태</span>
                            <span className="value status-ok">예약 완료</span>
                        </div>
                        <button className="outline-btn small">결제 수단 변경</button>
                    </div>
                </div>

                <div className="detail-footer">
                    <button className="cancel-funding-btn">후원 취소하기</button>
                </div>
            </div>
        </MyPageLayout>
    );
};

export default FundingDetailPage;