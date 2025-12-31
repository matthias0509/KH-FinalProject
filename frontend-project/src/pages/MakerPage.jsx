import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';
import '../styles/MakerPage.css';

// --- 이미지 경로 처리 함수 (Sidebar.js와 동일한 로직) ---
const SERVER_URL = "http://localhost:8001/foodding";
const UPLOAD_PATH = "/uploads/";

const getFullImageUrl = (filename) => {
    if (!filename || filename === "null") return null;
    if (filename.startsWith("http")) return filename;
    return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const MakerPage = ({ userInfo }) => {
    const navigate = useNavigate();

    // 프로필 이미지 캐싱 방지용 타임스탬프 (프로필 변경 시 즉시 반영)
    const imageTimestamp = useMemo(() => Date.now(), [userInfo?.modifyProfile]);

    // 임시 통계 데이터 (나중에 API 연결 필요)
    const [stats, setStats] = useState({
        projectCount: 0,
        followerCount: 0,
    });

    const [projectStatus, setProjectStatus] = useState({
        writing: 0, 
        reviewing: 0, 
        progress: 0, 
        ended: 0, 
    });

    // 최근 프로젝트 예시 데이터
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        // TODO: 실제 서버에서 메이커 통계(프로젝트 수, 팔로워 수) 가져오는 API 호출 필요
        if(userInfo) {
            // 예시: API 호출 후 setStats({ ... }) 
            setStats({ projectCount: 0, followerCount: 0 });
        }
    }, [userInfo]);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'WRITING': return <span className="status-badge draft">작성중</span>;
            case 'REVIEW': return <span className="status-badge review">심사중</span>;
            case 'OPEN': return <span className="status-badge open">진행중</span>;
            case 'END': return <span className="status-badge end">종료</span>;
            default: return null;
        }
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* --- 사이드바 (userInfo 전달) --- */}
                <Sidebar userInfo={userInfo} />

                {/* --- 메인 콘텐츠 --- */}
                <main className="main-content maker-layout">
                    
                    {/* 1. 상단 프로필 & 통계 섹션 */}
                    <section className="maker-profile-card">
                        <div className="profile-info">
                            <div className="profile-image">
                                {/* 서포터 프로필과 동일한 이미지 로직 적용 */}
                                <img 
                                    src={
                                        userInfo?.modifyProfile
                                            ? `${getFullImageUrl(userInfo.modifyProfile)}?t=${imageTimestamp}`
                                            : "/placeholder.png"
                                    }
                                    alt="프로필" 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder.png";
                                    }}
                                />
                            </div>
                            <div className="text-info">
                                {/* 서포터 닉네임과 동일하게 표시 */}
                                <h2>{userInfo?.nickname || userInfo?.userName || '메이커'}님</h2>
                                <span className="maker-badge">MAKER</span>
                            </div>
                        </div>
                        
                        <div className="maker-stats">
                            <div className="stat-item">
                                <span className="label">내 프로젝트</span>
                                <span className="value">{stats.projectCount}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="label">팔로워</span>
                                <span className="value">{stats.followerCount}</span>
                            </div>
                        </div>
                    </section>

                    {/* 2. 프로젝트 현황 대시보드 */}
                    <section className="dashboard-grid">
                        <div className="status-card">
                            <h4>작성 중</h4>
                            <p className="count">{projectStatus.writing}</p>
                        </div>
                        <div className="status-card">
                            <h4>심사 대기</h4>
                            <p className="count">{projectStatus.reviewing}</p>
                        </div>
                        <div className="status-card">
                            <h4>진행 중</h4>
                            <p className="count highlight">{projectStatus.progress}</p>
                        </div>
                        <div className="status-card">
                            <h4>종료</h4>
                            <p className="count">{projectStatus.ended}</p>
                        </div>
                    </section>

                    {/* 3. 새 프로젝트 만들기 배너 */}
                    <section className="create-project-banner" onClick={() => navigate('/maker/project/create')}>
                        <div className="banner-text">
                            <h3>나만의 특별한 프로젝트를 시작해보세요!</h3>
                            <p>펀딩/프리오더로 당신의 아이디어를 실현하세요.</p>
                        </div>
                        <button className="btn-create">프로젝트 만들기 +</button>
                    </section>

                    {/* 4. 최근 프로젝트 리스트 */}
                    <section className="recent-projects">
                        <div className="section-header">
                            <h3>최근 프로젝트</h3>
                            <Link to="/maker/project" className="more-link">전체보기 &gt;</Link>
                        </div>

                        <div className="project-list-container">
                            {recentProjects.length > 0 ? (
                                recentProjects.map(project => (
                                    <div key={project.id} className="project-list-item">
                                        <div className="item-info">
                                            {getStatusBadge(project.status)}
                                            <span className="category">[{project.category}]</span>
                                            <span className="title">{project.title}</span>
                                        </div>
                                        <div className="item-date">
                                            {project.date}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-list">
                                    <p>아직 진행 중인 프로젝트가 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </section>

                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default MakerPage;