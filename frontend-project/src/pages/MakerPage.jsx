import React from 'react';
<<<<<<< Updated upstream
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar'; 

import '../styles/MakerPage.css';

const MakerPage = ({userInfo}) => {
=======
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import '../styles/MakerPage.css'; // 스타일 파일 불러오기

const MakerPage = () => {
>>>>>>> Stashed changes
    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
<<<<<<< Updated upstream
                {/* --- 통합 사이드바 적용 --- */}
                <Sidebar userInfo={userInfo} /> 
=======
                {/* --- 왼쪽 사이드바 --- */}
                <aside className="sidebar">
                    {/* 모드 전환 */}
                    <div className="mode-switch">
                        <Link to="/mypage" className="mode-btn link-btn">
                            서포터
                        </Link>
                        <button className="mode-btn active">메이커</button>
                    </div>

                    {/* 프로필 */}
                    <div className="profile-section">
                        <div className="profile-img">☺</div>
                        <h3 className="username">와디즈 메이커님 <span className="arrow">&gt;</span></h3>
                        <p className="follow-count">팔로워 0</p>
                    </div>

                    {/* 메이커 메뉴 리스트 */}
                    <nav className="menu-list maker-menu">
                        <div className="maker-banner-link">
                            <p><strong>메이커 페이지 만들기</strong></p>
                            <p className="sub">메이커 프로필 만들고 더 넓게 소통해 보세요</p>
                            <span className="arrow-icon">&gt;</span>
                        </div>

                        <p className="menu-category">나의 문의 관리</p>
                        <ul><li>서포터 문의</li></ul>

                        <p className="menu-category">광고 서비스</p>
                        <ul><li>광고센터</li></ul>

                        <p className="menu-category">비즈센터</p>
                        <ul><li>비즈센터</li></ul>

                         <p className="menu-category">메이커 팁</p>
                        <ul>
                            <li>메이커 센터</li>
                            <li>공식 대행 파트너</li>
                            <li>와디즈 스쿨</li>
                            <li>카카오톡 채널 추가</li>
                        </ul>

                        <ul className="no-category">
                            <li>AI 상담받기</li>
                            <li>영상 가이드</li>
                        </ul>
                    </nav>
                </aside>
>>>>>>> Stashed changes

                {/* --- 오른쪽 메인 콘텐츠 --- */}
                <main className="main-content">
                    {/* 상단 탭 */}
                    <div className="maker-tabs">
                        <button className="tab-btn active">📈 메이커 홈</button>
<<<<<<< Updated upstream
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
=======
                        <button className="tab-btn">🪙 매출 UP</button>
                        <button className="tab-btn">💰 정산일</button>
                    </div>

                    {/* 1. 작성중인 프로젝트 카드 */}
                    <div className="maker-card project-card">
                        <div className="card-header">
                            <span className="project-type">펀딩 · 프리오더</span>
                            <span className="status-badge">작성 중</span>
                        </div>
                        <div className="project-content">
                            <div className="project-thumb"></div>
                            <p className="project-placeholder">제목을 입력해 주세요</p>
                        </div>
                        <button className="continue-btn">이어서 작성하기 &gt;</button>
                        <div className="service-link">
                            와디즈 콘텐츠 제작 서비스를 이용해 보세요 <span className="underline">문의하기</span> &gt;
                        </div>
                    </div>

                    {/* 2. 오늘 데이터 카드 */}
                    <div className="maker-card data-card">
                        <div className="card-header-row">
                            <h3>오늘 데이터 한번에 보기 ⟳</h3>
                            <button className="minimize-btn">-</button>
                        </div>
                        <div className="data-grid">
                            <div className="data-item">
                                <span className="label">찜 · 알림신청</span>
>>>>>>> Stashed changes
                                <span className="value">-</span>
                            </div>
                            <div className="data-item border-left">
                                <span className="label">결제(예약)</span>
                                <span className="value">-</span>
                            </div>
                            <div className="data-item border-left">
<<<<<<< Updated upstream
                                <span className="label">내 푸슐랭</span>
=======
                                <span className="label">지지서명</span>
                                <span className="value">-</span>
                            </div>
                            <div className="data-item border-left">
                                <span className="label">앵콜요청</span>
>>>>>>> Stashed changes
                                <span className="value">-</span>
                            </div>
                        </div>
                    </div>

<<<<<<< Updated upstream
                    {/* 3. 오늘 펀딩 카드 */}
=======
                    {/* 3. 오늘 펀딩 카드 (빈 상태) */}
>>>>>>> Stashed changes
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