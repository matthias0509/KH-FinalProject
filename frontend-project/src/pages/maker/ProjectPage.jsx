import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';
import '../../styles/MakerPage.css';

const SERVER_URL = "http://localhost:8001/foodding";
const UPLOAD_PATH = "/uploads/";

// 이미지 경로 처리
const getFullImageUrl = (filename) => {
    if (!filename || filename === "null") return null;
    if (filename.startsWith("http")) return filename;
    return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

// --- [컴포넌트] 프로젝트 리스트 아이템 ---
const ProjectListItem = ({ project }) => {
    const navigate = useNavigate();
    
    const title = project.title || '제목 없음';
    const category = project.category || '미정';
    const type = project.type || '펀딩';
    const reward = Number(project.reward || 0);
    const backers = Number(project.backers || 0);
    const thumbnail = project.thumbnail;
    const status = project.status || 'draft';
    const id = project.id || project.productNo;

    const formatCurrency = (amount) => amount.toLocaleString('ko-KR');

    // 상태 뱃지
    const getStatusBadge = (status) => {
        switch (String(status).toLowerCase()) {
            case 'draft': return <span className="list-status-badge status-draft">작성 중</span>;
            case 'open': return <span className="list-status-badge status-open">진행 중</span>;
            case 'closed': return <span className="list-status-badge status-closed">종료</span>;
            default: return null;
        }
    };

    return (
        <div className="project-list-item">
            <div className="project-info-row">
                {/* 🚨 [수정] 외부 이미지 대신 회색 박스 사용 (에러 방지) */}
                {thumbnail ? (
                    <img src={getFullImageUrl(thumbnail)} alt={title} className="project-thumb-small" 
                         onError={(e) => { e.target.style.display='none'; }} />
                ) : (
                    <div className="project-thumb-small" style={{backgroundColor: '#eee', display:'flex', alignItems:'center', justifyContent:'center', color:'#999', fontSize:'12px'}}>
                        No Image
                    </div>
                )}

                <div className="project-details">
                    <h4>
                        {getStatusBadge(status)}
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
                {status === 'draft' && (
                    <button className="action-btn primary-btn" onClick={() => navigate(`/maker/project/edit/${id}`)}>
                        이어서 작성
                    </button>
                )}
                {/* ... 버튼 로직 생략 ... */}
            </div>
        </div>
    );
};

// --- [메인 페이지] ---
const ProjectPage = ({ userInfo: propUserInfo }) => {
    const navigate = useNavigate();
    
    // 1. 내 정보 상태 관리
    const [myInfo, setMyInfo] = useState(propUserInfo || null);
    
    // 2. 프로젝트 리스트 상태
    const [currentTab, setCurrentTab] = useState('draft'); 
    const [projects, setProjects] = useState([]);          
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    // 3. props 동기화
    useEffect(() => {
        if (propUserInfo) {
            console.log("✅ [ProjectPage] 부모에게서 유저정보 받음:", propUserInfo);
            setMyInfo(propUserInfo);
        }
    }, [propUserInfo]);

    // 4. 내 정보 직접 가져오기 (새로고침 대응)
    useEffect(() => {
        const fetchUserInfo = async () => {
            // 이미 정보가 있으면 패스
            if (myInfo) return; 

            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                console.log("📡 [ProjectPage] 내 정보 서버 요청 시작...");
                const response = await axios.get(`${SERVER_URL}/api/mypage/info`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("👤 [ProjectPage] 내 정보 로드 성공:", response.data);
                setMyInfo(response.data);
            } catch (error) {
                console.error("❌ 내 정보 로딩 실패:", error);
            }
        };
        fetchUserInfo();
    }, [myInfo]);

    // 5. 프로젝트 리스트 가져오기
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
                
                console.log(`📂 [${currentTab}] 프로젝트 리스트 로드됨:`, response.data);
                setProjects(response.data);
                setCurrentPage(1);

            } catch (error) {
                console.error("프로젝트 목록 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [currentTab, navigate]);

    // 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); 
    };

    const tabs = [
        { key: 'draft', name: '작성 중' },
        { key: 'open', name: '진행 중' },
        { key: 'closed', name: '종료' },
    ];

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 🚨 Sidebar에 myInfo 전달 (콘솔에서 myInfo 데이터 확인) */}
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
                            <div className="project-card-list">
                                {currentItems.map((project, index) => (
                                    <ProjectListItem key={project.id || index} project={project} />
                                ))}
                            </div>
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
                        
                        {/* 페이지네이션 UI */}
                        {projects.length > itemsPerPage && (
                            <div className="pagination" style={{marginTop:'40px', display:'flex', justifyContent:'center', gap:'8px'}}>
                                {/* ... 페이지네이션 버튼 ... */}
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