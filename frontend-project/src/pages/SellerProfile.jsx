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
    const { sellerNo } = useParams(); // 🚨 URL에서 판매자 번호 가져오기

    const [myInfo, setMyInfo] = useState(propUserInfo || null);
    const [sellerInfo, setSellerInfo] = useState(null); // 🚨 조회할 판매자 정보
    const [loading, setLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false); // 🚨 내 프로필인지 확인
    
    const [stats, setStats] = useState({ projectCount: 0, followerCount: 0 });
    const [projectStatus, setProjectStatus] = useState({ writing: 0, reviewing: 0, progress: 0, ended: 0 });
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        if (propUserInfo) {
            setMyInfo(propUserInfo);
        }
    }, [propUserInfo]);

    // 🚨 데이터 가져오기 로직 개선
    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            try {
                // 1. 내 정보 먼저 가져오기
                const userInfoRes = await axios.get(`${SERVER_URL}/api/mypage/info`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const currentUserInfo = userInfoRes.data;
                setMyInfo(currentUserInfo);

                // 2. sellerNo가 있으면 해당 판매자 정보 조회, 없으면 내 정보 사용
                if (sellerNo) {
                    // URL에 판매자 번호가 있는 경우 -> 다른 판매자 프로필 보기
                    const currentUserNo = currentUserInfo.userNo || currentUserInfo.USER_NO;
                    
                    // 내 번호와 같으면 내 프로필
                    if (Number(sellerNo) === Number(currentUserNo)) {
                        setIsOwnProfile(true);
                        setSellerInfo(currentUserInfo);
                    } else {
                        // 다른 판매자 프로필 조회
                        setIsOwnProfile(false);
                        const sellerInfoRes = await axios.get(`${SERVER_URL}/api/seller/${sellerNo}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        setSellerInfo(sellerInfoRes.data);
                    }
                } else {
                    // URL에 판매자 번호가 없으면 내 프로필
                    setIsOwnProfile(true);
                    setSellerInfo(currentUserInfo);
                }

                // 3. 대시보드 데이터 (본인 프로필일 때만)
                if (!sellerNo || isOwnProfile) {
                    const dashboardRes = await axios.get(`${SERVER_URL}/api/maker/dashboard`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    const data = dashboardRes.data;
                    if (data) {
                        setStats(data.stats || { projectCount: 0, followerCount: 0 });
                        setProjectStatus(data.status || { writing: 0, reviewing: 0, progress: 0, ended: 0 });
                        setRecentProjects(data.recentProjects || []);
                    }
                } else {
                    // 다른 판매자의 공개 정보만 조회
                    const publicInfoRes = await axios.get(`${SERVER_URL}/api/seller/${sellerNo}/public`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    if (publicInfoRes.data) {
                        setStats(publicInfoRes.data.stats || { projectCount: 0, followerCount: 0 });
                        setRecentProjects(publicInfoRes.data.recentProjects || []);
                    }
                }

            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                if (error.response && error.response.status === 403) {
                    if(window.confirm("메이커 권한이 없습니다. 신청하시겠습니까?")) {
                        navigate('/change');
                    } else {
                        navigate('/mypage');
                    }
                } else if (error.response && error.response.status === 404) {
                    alert("판매자를 찾을 수 없습니다.");
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [navigate, sellerNo]);

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


    const displayInfo = sellerInfo || myInfo;

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* 🚨 내 프로필일 때만 Sidebar 표시 */}
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

                    {/* 🚨 본인 프로필일 때만 프로젝트 현황 표시 */}
                    {isOwnProfile && (
                        <section className="dashboard-grid">
                            <div className="status-card"><h4>작성 중</h4><p className="count">{projectStatus.writing}</p></div>
                            <div className="status-card"><h4>심사 대기</h4><p className="count">{projectStatus.reviewing}</p></div>
                            <div className="status-card"><h4>진행 중</h4><p className="count highlight">{projectStatus.progress}</p></div>
                            <div className="status-card"><h4>종료</h4><p className="count">{projectStatus.ended}</p></div>
                        </section>
                    )}

                    {/* 🚨 본인 프로필일 때만 프로젝트 생성 배너 표시 */}
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
                    </section>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default SellerProfile;