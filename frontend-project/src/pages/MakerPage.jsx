import React from 'react';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar'; 

import '../styles/MakerPage.css';

const MakerPage = ({userInfo}) => {
    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* --- 통합 사이드바 적용 --- */}
                <Sidebar userInfo={userInfo} /> 

                {/* --- 오른쪽 메인 콘텐츠 --- */}
                <main className="main-content">
                    {/* 상단 탭 */}
                    <div className="maker-tabs">
                        <button className="tab-btn active">📈 메이커 홈</button>
                    </div>

                    {/* 1. 작성중인 프로젝트 카드 (모든 클릭 요소를 제거하고 단순 디자인으로 처리) */}
                    <div className="maker-card project-card active-draft"> 
                        <div className="card-header">
                            <span className="project-type">펀딩 · 프리오더</span>
                            <span className="status-badge status-draft">작성 중</span>
                        </div>
                        
                        {/* 제목과 '이어서 작성하기' 텍스트를 담는 컨테이너 */}
                        <div className="project-draft-content simplified">
                            
                            {/* 썸네일/제목 영역 */}
                            <div className="draft-info">
                                <div className="project-thumb-large"></div>
                                <p className="project-placeholder">제목을 입력해 주세요</p>
                            </div>
                            
                            {/* '이어서 작성하기' 텍스트를 중앙에 배치 */}
                            <div className="continue-link-text">
                                <span>이어서 작성하기 &gt;</span>
                            </div>
                        </div>

                        {/* 서비스 링크도 클릭 불가 텍스트로 처리 */}
                        <div className="service-link-wrapper">
                            <span className="service-link-text">
                                와디즈 콘텐츠 제작 서비스를 이용해 보세요 문의하기 &gt;
                            </span>
                        </div>
                    </div>

                    {/* 2. 오늘 데이터 카드 (항목 3개로 변경) */}
                    <div className="maker-card data-card">
                        <div className="card-header-row">
                            <h3>오늘 데이터 한번에 보기 ⟳</h3>
                            <span className="minimize-btn">-</span> 
                        </div>
                        <div className="data-grid data-grid-three"> 
                            <div className="data-item">
                                <span className="label">찜</span>
                                <span className="value">-</span>
                            </div>
                            <div className="data-item border-left">
                                <span className="label">결제(예약)</span>
                                <span className="value">-</span>
                            </div>
                            <div className="data-item border-left">
                                <span className="label">내 푸슐랭</span>
                                <span className="value">-</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. 오늘 펀딩 카드 */}
                    <div className="maker-card today-funding-card">
                        <h3>오늘 펀딩·프리오더</h3>
                        <div className="empty-state">
                            <p className="empty-title">진행 중인 프로젝트가 없어요.</p>
                            <p className="empty-desc">지금 바로 와디즈에서 새로운 프로젝트를 시작해 보세요.</p>
                        </div>
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default MakerPage;