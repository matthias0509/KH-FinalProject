import React, { useMemo } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/MyPageLayout.css'; 

// 1. 서버 주소 상수
const SERVER_URL = "http://localhost:8001/foodding";

// 2. 업로드 경로 상수 (백엔드 WebMvcConfig와 일치해야 함)
// 주의: 끝에 슬래시(/)가 꼭 있어야 경로가 자연스럽게 이어집니다.
const UPLOAD_PATH = "/uploads/"; 

// 3. 이미지 전체 경로 변환 함수 (핵심 로직)
const getFullImageUrl = (filename) => {
    // 파일명이 없으면 null 반환 (-> 나중에 placeholder 처리됨)
    if (!filename) return null;

    // (1) 소셜 로그인 등으로 이미 http로 시작하는 완벽한 주소인 경우 -> 그대로 사용
    if (filename.startsWith("http")) return filename;
    
    // (2) 우리가 업로드한 파일인 경우 -> "http://.../uploads/파일명.png" 형태로 조립
    return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const Sidebar = ({ userInfo = {} }) => { 
    const navigate = useNavigate();
    const location = useLocation();

    // 디버깅용: 콘솔에서 userInfo.modifyProfile 값이 파일명인지 확인하세요.
    // console.log("Sidebar userInfo:", userInfo); 

    // 1. 닉네임 우선 표시 로직
    const displayName = userInfo.nickname || userInfo.userName || userInfo.name || '사용자';
    const userRole = userInfo.role || 'supporter';
    const isMakerMode = location.pathname.startsWith('/maker');

    // ✅ 수정 포인트: 이미지 캐시 버스터 최적화 (useMemo)
    // 변수명을 DB 컬럼 매핑값인 modifyProfile로 통일했습니다.
    const imageTimestamp = useMemo(() => Date.now(), [userInfo.modifyProfile]);

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
                   {/* 🚨 여기가 가장 중요한 이미지 태그 부분입니다 🚨 */}
                   <img
                    src={
                        // 1. modifyProfile 값이 존재하는지 확인
                        userInfo.modifyProfile
                            // 2. 존재하면 전체 주소 생성 + 캐시 갱신용 파라미터 추가
                            ? `${getFullImageUrl(userInfo.modifyProfile)}?t=${imageTimestamp}`
                            // 3. 없으면 기본 이미지
                            : "/placeholder.png"
                    }
                    alt="프로필"
                    className="sidebar-profile-img"
                    // 4. 엑박(404)이 뜨면 기본 이미지로 대체하는 안전장치
                    onError={(e) => {
                        // 무한루프 방지를 위해 onerror 핸들러 제거 후 src 변경
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