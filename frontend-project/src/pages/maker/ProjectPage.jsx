import React, { useState } from 'react';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar'; // 공통 사이드바 import
import '../../styles/MakerPage.css'; 

// --- 더미 데이터 ---
const dummyProjects = [
    { 
        id: 1, 
        title: "[작성 중] 최고의 펀딩 프로젝트를 위한 가이드북 초안", 
        status: 'draft', 
        type: '펀딩', 
        reward: 0, 
        backers: 0 
    },
    { 
        id: 2, 
        title: "화제의 굿즈! 초경량 티타늄 텀블러", 
        status: 'open', 
        type: '프리오더', 
        reward: 1500000, 
        backers: 120 
    },
    { 
        id: 3, 
        title: "인생 리클라이너 소파 펀딩 성공 (배송 완료)", 
        status: 'closed', 
        type: '펀딩', 
        reward: 5500000, 
        backers: 550 
    },
];

// --- 프로젝트 카드 컴포넌트 (리스트용) ---
const ProjectListItem = ({ project }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'draft':
                return <span className="list-status-badge status-draft">작성 중</span>;
            case 'open':
                return <span className="list-status-badge status-open">진행 중</span>;
            case 'closed':
                return <span className="list-status-badge status-closed">종료</span>;
            default:
                return null;
        }
    };

    const formatCurrency = (amount) => amount.toLocaleString('ko-KR');

    return (
        <div className="maker-card project-list-item">
            <div className="project-info-row">
                <div className="project-thumb-small"></div> {/* 썸네일 Placeholder */}
                <div className="project-details">
                    <h4>
                        {getStatusBadge(project.status)}
                        {project.title}
                    </h4>
                    <div className="project-stats">
                        <span>종류: <strong>{project.type}</strong></span>
                        {project.status !== 'draft' && (
                            <>
                                <span>누적 금액: <strong>{formatCurrency(project.reward)}원</strong></span>
                                <span>서포터: <strong>{formatCurrency(project.backers)}명</strong></span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="project-actions">
                {project.status === 'draft' && (
                    <button className="action-btn primary-btn">이어서 작성</button>
                )}
                {project.status === 'open' && (
                    <>
                        <button className="action-btn">수정 요청</button>
                        <button className="action-btn primary-btn">데이터 분석</button>
                    </>
                )}
                {project.status === 'closed' && (
                    <button className="action-btn">앵콜 요청</button>
                )}
            </div>
        </div>
    );
};


// --- 메인 페이지 컴포넌트 ---
const ProjectPage = ({ userInfo }) => {
    // 탭 상태 관리: draft, open, closed
    const [currentTab, setCurrentTab] = useState('draft'); 

    // 필터링된 프로젝트 목록
    const filteredProjects = dummyProjects.filter(p => p.status === currentTab);

    const tabs = [
        { key: 'draft', name: '작성 중', count: dummyProjects.filter(p => p.status === 'draft').length },
        { key: 'open', name: '진행 중', count: dummyProjects.filter(p => p.status === 'open').length },
        { key: 'closed', name: '종료', count: dummyProjects.filter(p => p.status === 'closed').length },
    ];

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 1. 공통 사이드바 */}
                <Sidebar userInfo={userInfo} />

                {/* 2. 내 프로젝트 메인 콘텐츠 */}
                <main className="main-content">
                    
                    {/* 상단 탭 (프로젝트 상태별) */}
                    <div className="maker-tabs">
                        {tabs.map(tab => (
                            <button 
                                key={tab.key}
                                className={`tab-btn ${currentTab === tab.key ? 'active' : ''}`}
                                onClick={() => setCurrentTab(tab.key)}
                            >
                                {tab.name} ({tab.count})
                            </button>
                        ))}
                    </div>

                    <div className="project-list-container">
                        
                        {/* 정렬 및 개수 표시 */}
                        <div className="project-filters">
                            <span className="project-count">총 {filteredProjects.length}개</span>
                            <select className="filter-select">
                                <option>최신순</option>
                                <option>오래된 순</option>
                            </select>
                        </div>

                        {/* 프로젝트 목록 */}
                        {filteredProjects.length > 0 ? (
                            <div className="project-card-list">
                                {filteredProjects.map(project => (
                                    <ProjectListItem key={project.id} project={project} />
                                ))}
                            </div>
                        ) : (
                            // 프로젝트가 없을 때 Empty State
                            <div className="maker-card today-funding-card">
                                <h3>{tabs.find(t => t.key === currentTab).name}인 프로젝트 목록</h3>
                                <div className="empty-state">
                                    <p className="empty-title">
                                        {tabs.find(t => t.key === currentTab).name}인 프로젝트가 없어요.
                                    </p>
                                    <p className="empty-desc">
                                        {currentTab === 'draft' ? "지금 바로 새로운 프로젝트를 시작해 보세요." : "다른 탭을 확인해 보세요."}
                                    </p>
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

export default ProjectPage;