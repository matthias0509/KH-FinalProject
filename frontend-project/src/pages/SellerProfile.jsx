import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';
import '../styles/MakerPage.css';

const SERVER_URL = "http://localhost:8001/foodding";
const UPLOAD_PATH = "/uploads/";

const getFullImageUrl = (filename) => {
    if (!filename || filename === "null") return "/placeholder.png";
    if (filename.startsWith("http")) return filename;
    return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const SellerProfile = ({ userInfo: propUserInfo }) => {
    const navigate = useNavigate();
    const { sellerNo } = useParams();

    const [myInfo, setMyInfo] = useState(propUserInfo || null);
    const [sellerInfo, setSellerInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    
    const [stats, setStats] = useState({ projectCount: 0, followerCount: 0 });
    const [projectStatus, setProjectStatus] = useState({ writing: 0, reviewing: 0, progress: 0, ended: 0 });
    const [recentProjects, setRecentProjects] = useState([]);

    // ✅ 페이징 state 추가
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);
    const itemsPerPage = 10; // 페이지당 프로젝트 수

    useEffect(() => {
        if (propUserInfo) {
            setMyInfo(propUserInfo);
        }
    }, [propUserInfo]);

    // ✅ 페이지 변경 시 데이터 다시 불러오기
    useEffect(() => {
        const fetchAllData = async () => {
            const token = sessionStorage.getItem('loginUser') || localStorage.getItem('token');
            
            // 비로그인 시 처리
            const hasToken = token && token !== 'null' && token !== 'undefined';

            try {
                // 로그인한 경우에만 내 정보 조회
                if (hasToken) {
                    try {
                        const userInfoRes = await axios.get(`${SERVER_URL}/api/mypage/info`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const currentUserInfo = userInfoRes.data;
                        setMyInfo(currentUserInfo);

                        // 본인 프로필인지 확인
                        if (sellerNo) {
                            const currentUserNo = currentUserInfo.userNo || currentUserInfo.USER_NO;
                            setIsOwnProfile(Number(sellerNo) === Number(currentUserNo));
                        } else {
                            setIsOwnProfile(true);
                        }
                    } catch (error) {
                        console.log('내 정보 조회 실패:', error);
                    }
                }

                const headers = hasToken ? { 'Authorization': `Bearer ${token}` } : {};

                // 판매자 정보 조회
                if (sellerNo) {
                    const sellerInfoRes = await axios.get(`${SERVER_URL}/api/seller/${sellerNo}`, {
                        headers
                    });
                    setSellerInfo(sellerInfoRes.data);

                    // ✅ 페이징 포함한 공개 정보 조회
                    const publicInfoRes = await axios.get(
                        `${SERVER_URL}/api/seller/${sellerNo}/public?page=${currentPage}&size=${itemsPerPage}`, 
                        { headers }
                    );
                    
                    if (publicInfoRes.data) {
                        setStats(publicInfoRes.data.stats || { projectCount: 0, followerCount: 0 });
                        setRecentProjects(publicInfoRes.data.recentProjects || publicInfoRes.data.projects || []);
                        
                        // ✅ 페이징 정보 설정
                        setTotalPages(publicInfoRes.data.totalPages || 1);
                        setTotalProjects(publicInfoRes.data.totalProjects || 0);
                        
                        if (publicInfoRes.data.status) {
                            setProjectStatus(publicInfoRes.data.status);
                        }
                    }
                }

            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                
                if (error.response && error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate('/login');
                } else if (error.response && error.response.status === 404) {
                    alert("판매자를 찾을 수 없습니다.");
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        };

        if (sellerNo) {
            fetchAllData();
        }
    }, [navigate, sellerNo, currentPage]); // ✅ currentPage 의존성 추가

    const imageTimestamp = useMemo(() => Date.now(), [sellerInfo?.modifyProfile]);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'WRITING': case 'draft': return <span className="status-badge draft">작성중</span>;
            case 'REVIEW': return <span className="status-badge review">심사중</span>;
            case 'OPEN': return <span className="status-badge open">진행중</span>;
            case 'END': case 'closed': return <span className="status-badge end">종료</span>;
            default: return <span className="status-badge end">{status}</span>;
        }
    };

    // ✅ 페이지 번호 생성 함수
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // 한 번에 보여줄 페이지 번호 개수
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    // ✅ 페이지 변경 핸들러
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const displayInfo = sellerInfo || myInfo;

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {isOwnProfile && <Sidebar userInfo={myInfo} />}

                <main className={`main-content maker-layout ${!isOwnProfile ? 'full-width' : ''}`}>
                    {/* 상단 프로필 */}
                    <section className="maker-profile-card">
                        <div className="profile-info">
                            <div className="profile-image">
                                <img 
                                    src={displayInfo?.modifyProfile 
                                        ? `${getFullImageUrl(displayInfo.modifyProfile)}?t=${imageTimestamp}`
                                        : "/placeholder.png"}
                                    alt="프로필" 
                                    onError={(e) => e.target.src = "/placeholder.png"}
                                />
                            </div>
                            <div className="text-info">
                                <h2>{displayInfo?.nickname || displayInfo?.userName || '메이커'}님</h2>
                                <span className="maker-badge">MAKER</span>
                                {!isOwnProfile && (
                                    <p style={{marginTop: '8px', color: '#666', fontSize: '14px'}}>
                                        {displayInfo?.introduction || '메이커 소개가 없습니다.'}
                                    </p>
                                )}
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

                    {isOwnProfile && (
                        <section className="dashboard-grid">
                            <div className="status-card"><h4>작성 중</h4><p className="count">{projectStatus.writing}</p></div>
                            <div className="status-card"><h4>심사 대기</h4><p className="count">{projectStatus.reviewing}</p></div>
                            <div className="status-card"><h4>진행 중</h4><p className="count highlight">{projectStatus.progress}</p></div>
                            <div className="status-card"><h4>종료</h4><p className="count">{projectStatus.ended}</p></div>
                        </section>
                    )}

                    {isOwnProfile && (
                        <section className="create-project-banner" onClick={() => navigate('/create')}>
                            <div className="banner-text">
                                <h3>나만의 특별한 프로젝트를 시작해보세요!</h3>
                                <p>펀딩/프리오더로 당신의 아이디어를 실현하세요.</p>
                            </div>
                            <button className="btn-create">프로젝트 만들기 +</button>
                        </section>
                    )}

                    <section className="recent-projects">
                        <div className="section-header">
                            <h3>{isOwnProfile ? '최근 프로젝트' : '판매자의 프로젝트'}</h3>
                            {isOwnProfile && <Link to="/maker/project" className="more-link">전체보기 &gt;</Link>}
                        </div>
                        <div className="project-list-container">
                            {recentProjects.length > 0 ? (
                                recentProjects.map((project, index) => (
                                    <div 
                                        key={project.id || index} 
                                        className="project-list-item" 
                                        onClick={() => navigate(`/projects/${project.projectNo || project.id}`)} 
                                        style={{cursor:'pointer'}}
                                    >
                                        <div className="item-info">
                                            {getStatusBadge(project.status)}
                                            <span className="category">[{project.category || '미정'}]</span>
                                            <span className="title">{project.title}</span>
                                        </div>
                                        <div className="item-date">{project.date}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-list">
                                    <p>{isOwnProfile ? '아직 등록된 프로젝트가 없습니다.' : '등록된 프로젝트가 없습니다.'}</p>
                                </div>
                            )}
                        </div>

                        {/* 페이징바 개선 버전 */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                {/* 맨 처음 */}
                                <button 
                                    className="page-btn"
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                >
                                    &lt;&lt;
                                </button>
                                
                                {/* 이전 */}
                                <button 
                                    className="page-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    &lt;
                                </button>
                                
                                {/* 페이지 번호 */}
                                {getPageNumbers().map(page => (
                                    <button
                                        key={page}
                                        className={`page-num ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                {/* 다음 */}
                                <button 
                                    className="page-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    &gt;
                                </button>
                                
                                {/* 맨 끝 */}
                                <button 
                                    className="page-btn"
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    &gt;&gt;
                                </button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default SellerProfile;