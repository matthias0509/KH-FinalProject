    import React from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import '../styles/MyPageLayout.css'; // 공통 스타일 필요

    const Sidebar = ({ userInfo }) => {
        const navigate = useNavigate();
        const location = useLocation(); // 현재 주소를 알아내는 훅

        // 현재 경로와 메뉴 링크가 일치하는지 확인하는 함수
        const isActive = (path) => {
            return location.pathname === path ? 'active-menu' : '';
        };

        // 메이커 버튼 핸들러
        const handleMakerClick = () => {
            if (userInfo.role !== 'maker') {
                if (window.confirm("메이커 권한이 없습니다.\n관리자에게 권한을 신청하시겠습니까?")) {
                    alert("관리자에게 메이커 권한을 요청했습니다! (승인 대기 중)");
                }
            } else {
                navigate('/maker');
            }
        };

        return (
            <aside className="sidebar">
                {/* 모드 전환 */}
                <div className="mode-switch">
                    <Link to="/mypage" className={`mode-btn ${location.pathname === '/mypage' ? 'active' : ''}`}>
                        서포터
                    </Link>
                    
                    {userInfo.role === 'maker' ? (
                        <Link to="/maker" className="mode-btn link-btn">메이커</Link>
                    ) : (
                        <div className="mode-btn link-btn locked" onClick={handleMakerClick}>
                            메이커 <span className="lock-icon">🔒</span>
                        </div>
                    )}
                </div>

                {/* 프로필 영역 */}
                <div className="profile-section">
                    <div className="profile-img">{userInfo.profileImg}</div>
                    <h3 className="username">{userInfo.name} 님 <span className="arrow">&gt;</span></h3>
                    <Link to="/profile" className="profile-setting-btn">내 정보 설정</Link>
                </div>

                {/* 메뉴 리스트 */}
                <nav className="menu-list">
                    <p className="menu-category">나의 후원 활동</p>
                    <ul>
                        <li className={isActive('/history')}>
                            <Link to='/history'>
                                후원 내역 조회 
                                {isActive('/history') && <span className="badge-dot">●</span>}
                            </Link>
                        </li>
                        <li className={isActive('/cancel')}>
                            <Link to='/cancel'>
                                후원 취소/환불 내역
                                {isActive('/cancel') && <span className="badge-dot">●</span>}
                            </Link>
                        </li>
                    </ul>

                    <p className="menu-category">관심 활동</p>
                    <ul>
                        <li className={isActive('/like')}>
                            <Link to='/like'>좋아요한 프로젝트</Link>
                        </li>
                        <li className={isActive('/follow')}>
                            <Link to='/follow'>팔로우 목록 조회</Link>
                        </li>

                    </ul>

                    <p className="menu-category">문의</p>
                    <ul>
                        <li className={isActive('/chats')}>
                            <Link to='/chat'>1:1 채팅 내역</Link>
                        </li>
                        <li className={isActive('/inquiries')}>
                            <Link to='/qna'>나의 문의(Q&A)</Link>
                        </li>
                        <li className={isActive('/inquiries')}>
                            <Link to='/qna'>고객센터</Link>
                        </li>

                    </ul>
                </nav>
            </aside>
        );
    
    };


    export default Sidebar;