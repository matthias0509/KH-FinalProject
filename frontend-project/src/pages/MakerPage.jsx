import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';
import '../styles/MakerPage.css';
import { getApiBaseUrl } from '../utils/apiConfig';

// 🚨 백틱(`) 사용 확인
const SERVER_URL = getApiBaseUrl();
const UPLOAD_PATH = "/uploads/";

const getFullImageUrl = (filename) => {
    if (!filename || filename === "null") return "https://placehold.co/80x80?text=User";
    if (filename.startsWith("http")) return filename;
    return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const MakerPage = ({ userInfo: propUserInfo }) => {
    const navigate = useNavigate();

    // 1. 상태 관리
    const [myInfo, setMyInfo] = useState(propUserInfo || null);
    const [loading, setLoading] = useState(true);
    
    // 대시보드 데이터
    const [stats, setStats] = useState({ projectCount: 0, followerCount: 0 });
    const [projectStatus, setProjectStatus] = useState({ writing: 0, reviewing: 0, progress: 0, ended: 0 });
    const [recentProjects, setRecentProjects] = useState([]);

    // 2. props가 나중에라도 들어오면 업데이트
    useEffect(() => {
        if (propUserInfo) {
            setMyInfo(propUserInfo);
        }
    }, [propUserInfo]);

    // 3. 데이터 가져오기 (병렬 처리로 속도 향상)
    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                // API 요청 2개를 동시에 보냄 (내 정보 + 대시보드)
                // 이렇게 하면 myInfo가 없어도 무조건 서버에서 가져옵니다.
                const [userInfoRes, dashboardRes] = await Promise.all([
                    // 1. 내 정보 (닉네임, 프로필용) - 이미 myInfo가 있어도 확실하게 다시 가져옴
                    axios.get(`${SERVER_URL}/api/mypage/info`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    // 2. 대시보드 데이터
                    axios.get(`${SERVER_URL}/api/maker/dashboard`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                // 내 정보 설정
                if (userInfoRes.data) {
                    setMyInfo(userInfoRes.data);
                }

                // 대시보드 설정
                const data = dashboardRes.data;
                if (data) {
                    setStats(data.stats || { projectCount: 0, followerCount: 0 });
                    setProjectStatus(data.status || { writing: 0, reviewing: 0, progress: 0, ended: 0 });
                    setRecentProjects(data.recentProjects || []);
                }

            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                if (error.response && error.response.status === 403) {
                    if(window.confirm("메이커 권한이 없습니다. 신청하시겠습니까?")) {
                        navigate('/change');
                    } else {
                        navigate('/mypage');
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [navigate]);

    const imageTimestamp = useMemo(() => Date.now(), [myInfo?.modifyProfile]);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'WRITING': case 'draft': return <span className="status-badge draft">작성중</span>;
            case 'REVIEW': return <span className="status-badge review">심사중</span>;
            case 'OPEN': return <span className="status-badge open">진행중</span>;
            case 'END': case 'closed': return <span className="status-badge end">종료</span>;
            default: return <span className="status-badge end">{status}</span>;
        }
    };

    if (loading) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="mypage-container">
                    <Sidebar userInfo={myInfo} loading={true} />
                    <main className="main-content maker-layout">
                        <div className="empty-state-box" style={{height: '400px'}}>데이터 불러오는 중...</div>
                    </main>
                </div>
                <AppFooter />
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 🚨 확보한 myInfo 전달 */}
                <Sidebar userInfo={myInfo} />

                <main className="main-content maker-layout">
                    {/* 상단 프로필 */}
                    <section className="maker-profile-card">
                        <div className="profile-info">
                            <div className="profile-image">
                                <img 
                                    src={myInfo?.modifyProfile 
                                        ? `${getFullImageUrl(myInfo.modifyProfile)}?t=${imageTimestamp}`
                                        : "https://placehold.co/80x80?text=User"}
                                    alt="프로필" 
                                    onError={(e) => e.target.src = "https://placehold.co/80x80?text=User"}
                                />
                            </div>
                            <div className="text-info">
                                <h2>{myInfo?.nickname || myInfo?.userName || '메이커'}님</h2>
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

                    {/* 프로젝트 현황 */}
                    <section className="dashboard-grid">
                        <div className="status-card"><h4>작성 중</h4><p className="count">{projectStatus.writing}</p></div>
                        <div className="status-card"><h4>심사 대기</h4><p className="count">{projectStatus.reviewing}</p></div>
                        <div className="status-card"><h4>진행 중</h4><p className="count highlight">{projectStatus.progress}</p></div>
                        <div className="status-card"><h4>종료</h4><p className="count">{projectStatus.ended}</p></div>
                    </section>

                    {/* 배너 및 리스트 (생략 없이 기존 코드 사용) */}
                    <section className="create-project-banner" onClick={() => navigate('/create')}>
                        <div className="banner-text">
                            <h3>나만의 특별한 프로젝트를 시작해보세요!</h3>
                            <p>펀딩/프리오더로 당신의 아이디어를 실현하세요.</p>
                        </div>
                        <button className="btn-create">프로젝트 만들기 +</button>
                    </section>

                    <section className="recent-projects">
                        <div className="section-header">
                            <h3>최근 프로젝트</h3>
                            <Link to="/maker/project" className="more-link">전체보기 &gt;</Link>
                        </div>
                        <div className="project-list-container">
                            {recentProjects.length > 0 ? (
                                recentProjects.map((project, index) => (
                                    <div key={project.id || index} className="project-list-item" onClick={() => navigate(`/maker/project`)} style={{cursor:'pointer'}}>
                                        <div className="item-info">
                                            {getStatusBadge(project.status)}
                                            <span className="category">[{project.category || '미정'}]</span>
                                            <span className="title">{project.title}</span>
                                        </div>
                                        <div className="item-date">{project.date}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-list"><p>아직 등록된 프로젝트가 없습니다.</p></div>
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
