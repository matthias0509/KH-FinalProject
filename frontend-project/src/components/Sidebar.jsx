import React, { useMemo } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/MyPageLayout.css'; 

const SERVER_URL = "http://localhost:8001/foodding";
const UPLOAD_PATH = "/uploads/"; 

const getFullImageUrl = (filename) => {
    if (!filename || filename === "null") return null;
    if (filename.startsWith("http")) return filename;
    return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const Sidebar = ({ userInfo, loading }) => { 
    const navigate = useNavigate();
    const location = useLocation();

    // 1. [수정] 서버 데이터(userRole, role)와 대소문자(MAKER)를 모두 잡는 안전한 로직
    const safeInfo = userInfo || {};
    
    // 닉네임 우선 -> 이름 -> 없으면 '사용자'
    const displayName = safeInfo.nickname || safeInfo.userName || safeInfo.userName || '사용자';
    
    // 🚨 역할 체크 로직 강화: safeInfo.userRole(서버응답값)을 먼저 확인
    const rawRole = safeInfo.userRole || safeInfo.role || 'supporter';
    const userRole = String(rawRole).toLowerCase(); // 'maker' 또는 'supporter'로 통일
    
    const isMakerMode = location.pathname.startsWith('/maker');

    const imageTimestamp = useMemo(() => Date.now(), [safeInfo.modifyProfile]);

    const isActive = (path) => {
        if (path === '/mypage' && location.pathname === '/mypage') return 'active-menu';
        if (path !== '/mypage' && location.pathname.startsWith(path)) return 'active-menu';
        return '';
    };

    const handleMakerClick = () => {
        if (userRole !== 'maker') {
            if (window.confirm("메이커 권한이 없습니다.\n전환 신청 페이지로 이동하시겠습니까?")) {
                navigate('/change');
            }
        } else {
            navigate('/maker');
        }
    };

    return (
        <aside className="sidebar">
            {/* 모드 전환 스위치 */}
            <div className="mode-switch">
                <Link 
                    to="/mypage" 
                    className={`mode-btn link-btn ${!isMakerMode ? 'active' : ''}`}
                >
                    서포터
                </Link>
                
                {/* 🚨 수정됨: userRole 로직 적용 */}
                {userRole === 'maker' ? (
                    <Link 
                        to="/maker" 
                        className={`mode-btn link-btn ${isMakerMode ? 'active' : ''}`}
                    >
                        메이커
                    </Link>
                ) : (
                    <div 
                        className={`mode-btn link-btn locked ${isMakerMode ? 'active' : ''}`} 
                        onClick={handleMakerClick}
                    >
                        메이커 <span className="lock-icon">🔒</span>
                    </div>
                )}
            </div>

            {/* 프로필 영역 */}
            <div className="profile-section">
                <div className="profile-img-wrapper">
                    {loading ? (
                        <div className="loading-circle">...</div>
                    ) : (
                        <img
                            src={
                                safeInfo.modifyProfile
                                    ? `${getFullImageUrl(safeInfo.modifyProfile)}?t=${imageTimestamp}`
                                    : "https://placehold.co/80x80?text=User"
                            }
                            alt="프로필"
                            className="sidebar-profile-img"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/80x80?text=User";
                            }}
                        />
                    )}
                </div>
                
                <h3 className="username">
                    {loading ? '로딩 중...' : `${displayName} ${isMakerMode ? '메이커' : ''}님`}
                </h3>
                
                {isMakerMode ? (
                    <p className="follow-count">Maker Studio</p>
                ) : (
                    <Link to="/mypage/profile" className="profile-setting-btn">내 정보 설정</Link>
                )}
            </div>

            {/* 메뉴 리스트 */}
            <nav className={`menu-list ${isMakerMode ? 'maker-menu' : ''}`}>
                {isMakerMode ? (
                    <>
                        <p className="menu-category">나의 문의 관리</p>
                        <ul>
                            <li className={isActive('/maker/chat')}>
                                <Link to='/maker/chat'>서포터 문의</Link>
                            </li>
                        </ul>
                        <p className="menu-category">프로젝트 관리</p>
                        <ul>
                            <li className={isActive('/maker/project')}>
                                <Link to='/maker/project'>내 프로젝트</Link>
                            </li>
                        </ul>
                        <p className="menu-category">비즈센터</p>
                        <ul>
                            <li className={isActive('/maker/settlement')}>
                                <Link to='/maker/settlement'>정산하기</Link>
                            </li>
                        </ul>
                         
                          <p className="menu-category">계정</p>
                        <ul>
                            <li>
                                <Link to='/logout'>로그아웃</Link>
                            </li>
                            </ul>
                    </>
                ) : (
                    <>
                        <p className="menu-category">나의 후원 활동</p>
                        <ul>
                            <li className={isActive('/mypage/history')}>
                                <Link to='/mypage/history'>후원 내역 조회</Link>
                            </li>
                            <li className={isActive('/mypage/cancel')}>
                                <Link to='/mypage/cancel'>후원 취소/환불 내역</Link>
                            </li>
                        </ul>

                        <p className="menu-category">관심 활동</p>
                        <ul>
                            <li className={isActive('/mypage/like')}>
                                <Link to='/mypage/like'>좋아요한 프로젝트</Link>
                            </li>
                            <li className={isActive('/mypage/follow')}>
                                <Link to='/mypage/follow'>팔로우 목록 조회</Link>
                            </li>
                        </ul>

                        <p className="menu-category">문의</p>
                        <ul>
                            <li className={isActive('/mypage/chat')}>
                                <Link to='/mypage/chat'>1:1 채팅 내역</Link>
                            </li>
                            <li className={isActive('/mypage/qna')}>
                                <Link to='/inquiries'>나의 문의(Q&A)</Link>
                            </li>
                          
                        </ul>
                          <p className="menu-category">계정</p>
                        <ul>
                            <li>
                                <Link to='/logout' style={{ color: '#e03131', fontWeight: 'bold' }}>로그아웃</Link>
                            </li>
                            </ul>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
