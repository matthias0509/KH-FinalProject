import React from 'react';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar'; 
import { Outlet } from 'react-router-dom'; // MakerPage가 Layout 역할을 할 때 Outlet 사용
import '../../styles/MakerPage.css'; // 정산 스타일 포함

// 더미 데이터
const dummySettlements = [
    { 
        id: 1, 
        title: "화제의 굿즈! 초경량 티타늄 텀블러", 
        amount: 1450000, 
        status: 'paid', 
        paidDate: '2025.07.10',
        projectEndDate: '2025.06.30'
    },
    { 
        id: 2, 
        title: "인생 리클라이너 소파 펀딩 성공", 
        amount: 5000000, 
        status: 'pending', 
        paidDate: '2025.10.25 (예정)',
        projectEndDate: '2025.09.30'
    },
    { 
        id: 3, 
        title: "DIY 스마트 화분 키트", 
        amount: 850000, 
        status: 'canceled', 
        paidDate: '오류',
        projectEndDate: '2025.05.15'
    },
];

// 정산 항목 카드 컴포넌트
const SettlementListItem = ({ item }) => {
    const formatCurrency = (amount) => amount.toLocaleString('ko-KR');

    const getStatusText = (status) => {
        switch (status) {
            case 'paid':
                return <span className="settlement-status status-paid">지급 완료</span>;
            case 'pending':
                return <span className="settlement-status status-pending">지급 대기</span>;
            case 'canceled':
                return <span className="settlement-status status-canceled">정산 취소</span>;
            default:
                return null;
        }
    };

    return (
        <div className="maker-card settlement-list-item">
            <div className="settlement-project-info">
                <h4>{item.title}</h4>
                <p className="date-info">프로젝트 종료일: {item.projectEndDate}</p>
            </div>
            
            {getStatusText(item.status)}
            
            <div className="settlement-amount">
                {formatCurrency(item.amount)} 원
            </div>
        </div>
    );
};


const SettlementPage = ({ userInfo }) => {

    const totalPaid = dummySettlements
        .filter(i => i.status === 'paid')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalPending = dummySettlements
        .filter(i => i.status === 'pending')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalProjects = dummySettlements.length;

    const formatCurrency = (amount) => amount.toLocaleString('ko-KR');

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 메이커 사이드바 */}
                <Sidebar userInfo={userInfo} />

                {/* 메인 콘텐츠 */}
                <main className="main-content">
                    
                    <h2>정산 관리</h2>

                    {/* 1. 정산 요약 카드 */}
                    <div className="settlement-summary-card">
                        <div className="summary-item">
                            <p className="label">총 정산 프로젝트 수</p>
                            <p className="value">{totalProjects} 건</p>
                        </div>
                        <div className="summary-item">
                            <p className="label">누적 지급 완료 금액</p>
                            <p className="value">{formatCurrency(totalPaid)} 원</p>
                        </div>
                        <div className="summary-item">
                            <p className="label">지급 예정 금액</p>
                            <p className="value primary">{formatCurrency(totalPending)} 원</p>
                        </div>
                    </div>

                    {/* 2. 정산 목록 헤더 */}
                    <div className="settlement-list-header">
                        <span>프로젝트 정산 내역</span>
                        <select className="filter-select">
                            <option>최근 정산일 순</option>
                            <option>지급 상태 순</option>
                        </select>
                    </div>

                    {/* 3. 정산 목록 리스트 */}
                    <div className="settlement-card-list">
                        {dummySettlements.length > 0 ? (
                            dummySettlements.map(item => (
                                <SettlementListItem key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="maker-card">
                                <div className="empty-state">
                                    <p className="empty-title">정산 내역이 없습니다.</p>
                                    <p className="empty-desc">프로젝트 종료 후 정산이 시작됩니다.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default SettlementPage;