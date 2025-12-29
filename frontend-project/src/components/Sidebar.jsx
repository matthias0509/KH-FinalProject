import React, { useMemo } from 'react'; // useMemo 추가
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/MyPageLayout.css'; 

// 서버 주소
const SERVER_URL = "http://localhost:8001/foodding";

// 이미지 전체 경로 변환 함수
const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${SERVER_URL}${url}`;
};

const Sidebar = ({ userInfo = {} }) => { 
    const navigate = useNavigate();
    const location = useLocation();

    // 1. 닉네임 우선 표시 로직
    const displayName = userInfo.nickname || userInfo.userName || userInfo.name || '사용자';
    const userRole = userInfo.role || 'supporter';
    const isMakerMode = location.pathname.startsWith('/maker');

    // ✅ 수정 포인트: 이미지 캐시 버스터 최적화 (useMemo)
    // 컴포넌트가 처음 마운트되거나, profileImageUrl 자체가 바뀔 때만 시간을 갱신합니다.
    // 단순히 메뉴를 클릭하거나 다른 상태가 변할 때는 이미지를 다시 불러오지 않아 깜빡임을 방지합니다.
    const imageTimestamp = useMemo(() => Date.now(), [userInfo.profileImageUrl]);

    // 메뉴 활성화 로직
    const isActive = (path) => {
        if (path === '/mypage' && location.pathname === '/mypage') return 'active-menu';
        if (path !== '/mypage' && location.pathname.startsWith(path)) return 'active-menu';
        return '';
    };

    const handleMakerClick = () => {
        if (userRole !== 'maker') {
            if (window.confirm("메이커 권한이 없습니다.\n관리자에게 권한을 신청하시겠습니까?")) {
                alert("관리자에게 메이커 권한을 요청했습니다! (승인 대기 중)");
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
                   <img
                    src={
                        userInfo.profileImageUrl
                            // ✅ 여기서 useMemo로 만든 고정된 타임스탬프를 사용
                            ? `${getFullImageUrl(userInfo.profileImageUrl)}?t=${imageTimestamp}`
                            : "/placeholder.png"
                    }
                    alt="프로필"
                    className="sidebar-profile-img"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                    }}
                    />
                </div>
                
                <h3 className="username">
                    {displayName} {isMakerMode ? '메이커' : ''}님 
                    <Link to="/mypage/profile" className="arrow-link"> &gt;</Link>
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
                    /* --- 메이커 모드 메뉴 --- */
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
                    /* --- 서포터 모드 메뉴 --- */
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
                                <Link to='/mypage/qna'>나의 문의(Q&A)</Link>
                            </li>
                            <li>
                                <Link to='/help'>고객센터</Link>
                            </li>
                        </ul>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;