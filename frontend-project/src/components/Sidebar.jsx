import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/MyPageLayout.css'; // 공통 스타일

// userInfo prop에 기본값 {}을 설정하여, userInfo가 undefined일 때 구조분해 오류 방지
const Sidebar = ({ userInfo = {} }) => { 
    // userInfo 객체가 없거나 role이 없을 경우를 대비하여 기본값 설정
    const userRole = userInfo.role || 'supporter';
    const userName = userInfo.name || '사용자';

    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로가 '/maker'로 시작하는지 확인하여 모드 결정
    const isMakerMode = location.pathname.startsWith('/maker');

    // 현재 경로와 메뉴 링크가 일치하는지 확인하는 함수
    const isActive = (path) => {
        return location.pathname === path ? 'active-menu' : '';
    };

    // 메이커 버튼 핸들러 (권한 체크)
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
            {/* 1. 모드 전환 스위치 */}
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

            {/* 2. 프로필 영역 (공통) */}
            <div className="profile-section">
                <div className="profile-img">{userInfo.profileImg || '☺'}</div>
                <h3 className="username">
                    {userName} {isMakerMode ? '메이커' : ''}님 <span className="arrow">&gt;</span>
                </h3>
                {isMakerMode ? (
                    <p className="follow-count">팔로워 0</p>
                ) : (
                    <Link to="/profile" className="profile-setting-btn">내 정보 설정</Link>
                )}
            </div>

            {/* 3. 메뉴 리스트 (조건부 렌더링) */}
            <nav className={`menu-list ${isMakerMode ? 'maker-menu' : ''}`}>
                {isMakerMode ? (
                    /* --- 메이커 모드 메뉴 --- */
                    <>
                        {/* ⚠️ 요청에 따라 '메이커 페이지 만들기' 배너 영역을 완전히 제거했습니다. */}

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
                    /* --- 서포터 모드 메뉴 (기존 유지) --- */
                    <>
                        <p className="menu-category">나의 후원 활동</p>
                        <ul>
                            <li className={isActive('/history')}>
                                <Link to='/history'>
                                    후원 내역 조회 
                                </Link>
                            </li>
                            <li className={isActive('/cancel')}>
                                <Link to='/cancel'>
                                    후원 취소/환불 내역
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
                            <li className={isActive('/chat')}>
                                <Link to='/chat'>1:1 채팅 내역</Link>
                            </li>
                            <li className={isActive('/qna')}>
                                <Link to='/qna'>나의 문의(Q&A)</Link>
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