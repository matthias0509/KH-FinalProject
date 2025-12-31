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

const Sidebar = ({ userInfo = {}, loading = false }) => { 
    const navigate = useNavigate();
    const location = useLocation();

    // null 안전 처리
    const displayName = userInfo?.nickname || userInfo?.userName || userInfo?.name || '사용자';
    
    // 🚨 [수정된 부분] 권한 체크: DB값(MAKER)과 프론트값(maker) 대소문자 무시하고 비교
    // userInfo.role이 있으면 소문자로 변환, 없으면 'supporter'
    const userRole = userInfo?.role ? userInfo.role.toLowerCase() : 'supporter';
    
    const isMakerMode = location.pathname.startsWith('/maker');

    const imageTimestamp = useMemo(() => Date.now(), [userInfo?.modifyProfile]);

    const isActive = (path) => {
        if (path === '/mypage' && location.pathname === '/mypage') return 'active-menu';
        if (path !== '/mypage' && location.pathname.startsWith(path)) return 'active-menu';
        return '';
    };

    const handleMakerClick = () => {
        // userRole은 이미 소문자로 변환되었으므로 'maker'와 비교
        if (userRole !== 'maker') {
            // 메이커가 아니면 -> 신청 페이지(/change)로 이동할지 물어봄
            if (window.confirm("메이커 권한이 없습니다.\n메이커 전환 신청 페이지로 이동하시겠습니까?")) {
                navigate('/change');
            }
        } else {
            // 이미 메이커면 -> 메이커 관리 페이지로 이동
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
                
                {/* userRole은 소문자 'maker'로 통일됨 */}
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
                        <div style={{ 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            background: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            ...
                        </div>
                    ) : (
                        <img
                            src={
                                userInfo?.modifyProfile
                                    ? `${getFullImageUrl(userInfo.modifyProfile)}?t=${imageTimestamp}`
                                    : "/placeholder.png"
                            }
                            alt="프로필"
                            className="sidebar-profile-img"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "/placeholder.png";
                            }}
                        />
                    )}
                </div>
                
                <h3 className="username">
                    {loading ? '로딩 중...' : `${displayName} ${isMakerMode ? '메이커' : ''}님`}
                </h3>
                
                {isMakerMode ? (
                    <p className="follow-count">팔로워 0</p>
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
                            <li className={isActive('/maker/chat-history')}>
                                <Link to='/maker/chat-history'>서포터 문의</Link>
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
                            <li className={isActive('/qna')}>
                                <Link to='/inquiries'>나의 문의(Q&A)</Link>
                            </li>
                            <li>
                                <Link to='/notice/:noticeNo'>고객센터</Link>
                            </li>
                        </ul>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;