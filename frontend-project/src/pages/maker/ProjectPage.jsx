import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';
import '../../styles/MakerPage.css';
import '../../styles/UserManagement.css'; 

// 🚨 유틸리티 함수 가져오기
import { resolveProjectImageUrl } from '../../utils/projectMedia';

const SERVER_URL = "http://localhost:8001/foodding";

// --- [컴포넌트] 프로젝트 리스트 아이템 ---
const ProjectListItem = ({ project }) => {
    const navigate = useNavigate();
    
    const title = project.title || '제목 없음';
    const category = project.category || '미정';
    const type = project.type || '펀딩';
    const reward = Number(project.reward || 0);
    const backers = Number(project.backers || 0);
    const status = project.status || 'draft';
    const id = project.id || project.productNo;

    // 🚨 모든 가능성 있는 필드명을 전부 체크합니다 (매퍼 별칭 대응)
    const thumbnailPath = project.thumbnail || 
                         project.thumbnailUrl || 
                         project.MODIFY_THUMBNAIL || 
                         project.ORIGIN_THUMBNAIL || 
                         project.modifyThumbnail;

    const formatCurrency = (amount) => amount.toLocaleString('ko-KR');

    const handleDetailClick = () => {
        if (status === 'draft') {
            navigate(`/create/new?draft=${id}`);
        } else {
            navigate(`/projects/${id}`);
        }
    };

    return (
        <div className="project-list-item">
            <div className="project-info-row" onClick={handleDetailClick} style={{ cursor: 'pointer' }}>
                {/* 🚨 유효한 파일명이 있고, 기본 이미지명이 아닐 때만 출력 */}
                {thumbnailPath && 
                 thumbnailPath !== "null" && 
                 thumbnailPath !== "undefined" && 
                 thumbnailPath !== "DEFAULT_THUMBNAIL.png" ? (
                    <img 
                        src={resolveProjectImageUrl(thumbnailPath)} 
                        alt={title} 
                        className="project-thumb-small" 
                        onError={(e) => { 
                            e.target.style.display = 'none'; // 에러 시 이미지 숨기고 배경색 노출
                            e.target.nextSibling.style.display = 'flex'; 
                        }} 
                    />
                ) : null}
                
                {/* 이미지가 없거나 에러일 때 보여줄 대체 박스 */}
                <div className="project-thumb-small fallback-box" style={{
                    backgroundColor: '#eee', 
                    display: (thumbnailPath && thumbnailPath !== "DEFAULT_THUMBNAIL.png") ? 'none' : 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#999', 
                    fontSize: '12px'
                }}>
                    No Image
                </div>

                <div className="project-details">
                    <h4>
                        {status === 'draft' && <span className="list-status-badge status-draft">작성 중</span>}
                        {status === 'open' && <span className="list-status-badge status-open">진행 중</span>}
                        {status === 'closed' && <span className="list-status-badge status-closed">종료</span>}
                        {title}
                    </h4>
                    <div className="project-stats">
                        <span>분야: <strong>{category}</strong></span>
                        <span>방식: <strong>{type}</strong></span>
                        {status !== 'draft' && (
                            <>
                                <span>모금액: <strong>{formatCurrency(reward)}원</strong></span>
                                <span>참여자: <strong>{formatCurrency(backers)}명</strong></span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="project-actions">
                {status === 'draft' ? (
                    <button className="action-btn primary-btn" onClick={() => navigate(`/create/new?draft=${id}`)}>
                        이어서 작성
                    </button>
                ) : (
                    <button className="action-btn" onClick={() => navigate(`/projects/${id}`)}>
                        상세 보기
                    </button>
                )}
            </div>
        </div>
    );
};

// --- [메인 페이지] ---
const ProjectPage = ({ userInfo: propUserInfo }) => {
    const navigate = useNavigate();
    
    const [myInfo, setMyInfo] = useState(propUserInfo || null);
    const [currentTab, setCurrentTab] = useState('draft'); 
    const [projects, setProjects] = useState([]);          
    const [loading, setLoading] = useState(false);

    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 

    useEffect(() => {
        if (propUserInfo) setMyInfo(propUserInfo);
    }, [propUserInfo]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (myInfo) return; 
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get(`${SERVER_URL}/api/mypage/info`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMyInfo(response.data);
            } catch (error) {
                console.error("❌ 내 정보 로딩 실패:", error);
            }
        };
        fetchUserInfo();
    }, [myInfo]);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/api/maker/projects`, {
                    params: { status: currentTab },
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProjects(response.data);
                setCurrentPage(1); 
            } catch (error) {
                console.error("프로젝트 목록 로딩 실패:", error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [currentTab, navigate]);

    // 페이지네이션 로직
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const currentItems = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const tabs = [
        { key: 'draft', name: '작성 중' },
        { key: 'open', name: '진행 중' },
        { key: 'closed', name: '종료' },
    ];

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                <Sidebar userInfo={myInfo} />

                <main className="main-content">
                    <h2 className="page-title">내 프로젝트 관리</h2>

                    <div className="maker-tabs">
                        {tabs.map(tab => (
                            <button 
                                key={tab.key}
                                className={`tab-btn ${currentTab === tab.key ? 'active' : ''}`}
                                onClick={() => setCurrentTab(tab.key)}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    <div className="project-list-container">
                        <div className="project-filters">
                            <span className="project-count">총 {projects.length}개</span>
                        </div>

                        {loading ? (
                            <div className="empty-state"><p>불러오는 중...</p></div>
                        ) : currentItems.length > 0 ? (
                            <>
                                <div className="project-card-list">
                                    {currentItems.map((project, index) => (
                                        <ProjectListItem key={project.id || index} project={project} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="pagination-area" style={{ marginTop: '30px' }}>
                                        <button 
                                            className="btn-page" 
                                            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo(0,0); }}
                                            disabled={currentPage === 1}
                                        >
                                            &lt;
                                        </button>
                                        <span className="page-info">{currentPage} / {totalPages}</span>
                                        <button 
                                            className="btn-page" 
                                            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0,0); }}
                                            disabled={currentPage === totalPages}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="empty-state">
                                <p className="empty-title">
                                    '{tabs.find(t => t.key === currentTab).name}' 상태인 프로젝트가 없습니다.
                                </p>
                                {currentTab === 'draft' && (
                                    <Link to="/create" className="list-btn" style={{marginTop: '20px', display:'inline-block'}}>
                                        새 프로젝트 만들기
                                    </Link>
                                )}
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