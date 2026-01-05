import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';
import '../../styles/MakerPage.css';
import '../../styles/UserManagement.css'; 
import { resolveProjectImageUrl } from '../../utils/projectMedia';

const SERVER_URL = "http://localhost:8001/foodding";

// --- [컴포넌트] 프로젝트 리스트 아이템 ---
const ProjectListItem = ({ project }) => {
    const navigate = useNavigate();

    // 1. [변수명 방어] DB에서 넘어올 수 있는 모든 이미지 변수명 체크
    const rawImage = 
        project.thumbnail || 
        project.THUMBNAIL || 
        project.thumbnailUrl || 
        project.THUMBNAIL_URL || 
        project.modifyThumbnail || 
        project.MODIFY_THUMBNAIL || 
        project.originThumbnail || 
        project.ORIGIN_THUMBNAIL ||
        project.projectThumb ||      
        project.PROJECT_THUMB;

    // 2. [주소 완성] 여기가 핵심입니다!
    const getImageUrl = (img) => {
        if (!img) return null; // 이미지 없으면 회색박스
        
        // 1) http나 data:로 시작하면 그대로 씀 (외부 링크 등)
        if (img.startsWith('http') || img.startsWith('data:')) return img;

        // 2) DB에 이미 '/uploads/' 경로가 포함되어 있다면? (작성중 파일 등) -> 그대로 연결
        if (img.includes('uploads/') || img.includes('resources/')) {
             const pathPrefix = img.startsWith('/') ? '' : '/';
             return `${SERVER_URL}${pathPrefix}${img}`;
        }

        // 3) [수정됨] 파일명만 딸랑 있는 경우 (진행중 파일 등) -> '/uploads/'를 강제로 붙여줌!
        const pathPrefix = img.startsWith('/') ? '' : '/';
        return `${SERVER_URL}/uploads${pathPrefix}${img}`; 
    };

    const finalImageUrl = getImageUrl(rawImage);

    // 기본 정보 처리
    const title = project.title || project.PROJECT_TITLE || '제목 없음';
    const category = project.category || project.CATEGORY_NAME || '미정';
    const type = project.type || '펀딩';
    const reward = Number(project.reward || project.TOTAL_AMOUNT || 0);
    const backers = Number(project.backers || project.SUPPORT_COUNT || 0);
    const status = project.status || 'draft';
    const id = project.id || project.productNo || project.PROJECT_NO;

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
                
                {/* 이미지가 있을 때만 렌더링 */}
                {finalImageUrl ? (
                    <img 
                        src={finalImageUrl} 
                        alt={title} 
                        className="project-thumb-small" 
                        onError={(e) => { 
                            e.target.style.display = 'none'; 
                            e.target.nextSibling.style.display = 'flex'; 
                        }} 
                    />
                ) : null}

                {/* 이미지가 없거나 깨졌을 때 보여줄 박스 */}
                <div className="project-thumb-small fallback-box" style={{
                    backgroundColor: '#f0f0f0', 
                    display: finalImageUrl ? 'none' : 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#888', 
                    fontSize: '12px',
                    width: '120px',
                    height: '90px',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                }}>
                    No Image
                </div>

                <div className="project-details">
                    <h4>
                        {status === 'draft' && <span className="list-status-badge status-draft">작성 중</span>}
                        {status === 'open' && <span className="list-status-badge status-open">진행 중</span>}
                        {status === 'closed' && <span className="list-status-badge status-closed">종료</span>}
                        {status === 'ban' && <span className="list-status-badge status-closed" style={{backgroundColor:'red'}}>중단됨</span>}
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
const ProjectPage = ({ userInfo }) => {
    const navigate = useNavigate();
    
    // 1. 내 정보 상태 관리
    const [myInfo, setMyInfo] = useState(userInfo || null);
    const [currentTab, setCurrentTab] = useState('draft'); 
    const [projects, setProjects] = useState([]);          
    const [loading, setLoading] = useState(false);

    // 페이지네이션 설정
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 

    // 2. [수정됨] 내 정보 로딩 (조건 없이 무조건 최신 정보 호출)
    useEffect(() => {
        const loadMyInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                // 내 정보 API 호출 (무조건 실행하여 닉네임/프사 갱신)
                const response = await axios.get(`${SERVER_URL}/api/mypage/info`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("내 정보 로딩 성공:", response.data);
                setMyInfo(response.data); // 상태 업데이트 -> Sidebar로 전달됨
            } catch (error) {
                console.error("내 정보 로딩 실패:", error);
            }
        };
        
        loadMyInfo();
    }, [navigate]); // myInfo 의존성 제거 (무한루프 방지 및 강제 로딩)

    // 3. 프로젝트 목록 로딩
    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

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
    }, [currentTab]);

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
                {/* 여기서 확보된 myInfo를 넘겨줍니다 */}
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