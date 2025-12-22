import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import '../styles/ProfileEditPage.css'; // 전용 CSS

const ProfileEditPage = () => {
    // 폼 데이터 상태 관리
    const [profile, setProfile] = useState({
        nickname: 'juhyeon00',
        email: 'juhyeon00@example.com',
        phone: '010-1234-5678',
        intro: '안녕하세요. 펀딩을 사랑하는 서포터입니다.',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* --- 사이드바 (서포터 모드 유지) --- */}
                <aside className="sidebar">
                    <div className="mode-switch">
                        <Link to="/mypage" className="mode-btn active">서포터</Link>
                        <Link to="/maker" className="mode-btn link-btn">메이커</Link>
                    </div>

                    <div className="profile-section">
                        <div className="profile-img">😐</div>
                        <h3 className="username">juhyeon00 <span className="arrow">&gt;</span></h3>
                        {/* 현재 설정 페이지에 있음을 표시 */}
                        <button className="profile-setting-btn active">내 정보 설정</button>
                    </div>

                    <nav className="menu-list">
                        <p className="menu-category">나의 활동</p>
                        <ul>
                            <li>최근본</li>
                            <li>찜·알림신청</li>
                            <li>팔로잉</li>
                        </ul>
                    </nav>
                </aside>

                {/* --- 메인 콘텐츠 (설정 폼) --- */}
                <main className="main-content">
                    <h2 className="page-title">설정</h2>

                    <div className="edit-card">
                        <div className="card-header-tab">
                            <span className="tab-item active">기본 정보 변경</span>
                            <span className="tab-item">계정 정보 변경</span>
                        </div>

                        <div className="form-container">
                            {/* 프로필 사진 변경 */}
                            <div className="form-group photo-section">
                                <label className="input-label">프로필 사진</label>
                                <div className="photo-wrapper">
                                    <div className="current-photo">😐</div>
                                    <div className="photo-buttons">
                                        <button className="btn-upload">사진 변경</button>
                                        <button className="btn-delete">삭제</button>
                                    </div>
                                </div>
                            </div>

                            {/* 닉네임 */}
                            <div className="form-group">
                                <label className="input-label">닉네임</label>
                                <input 
                                    type="text" 
                                    name="nickname"
                                    className="input-field" 
                                    value={profile.nickname} 
                                    onChange={handleChange}
                                />
                                <p className="input-guide">한글, 영문, 숫자 포함 2~10자</p>
                            </div>

                            {/* 소개 */}
                            <div className="form-group">
                                <label className="input-label">소개</label>
                                <textarea 
                                    name="intro"
                                    className="input-field textarea-field" 
                                    value={profile.intro}
                                    onChange={handleChange}
                                    placeholder="나를 소개하는 글을 써보세요."
                                />
                            </div>

                            {/* 이메일 (읽기 전용 예시) */}
                            <div className="form-group">
                                <label className="input-label">이메일</label>
                                <input 
                                    type="text" 
                                    className="input-field read-only" 
                                    value={profile.email} 
                                    readOnly 
                                />
                            </div>

                            {/* 휴대폰 번호 */}
                            <div className="form-group">
                                <label className="input-label">휴대폰 번호</label>
                                <div className="input-row">
                                    <input 
                                        type="text" 
                                        name="phone"
                                        className="input-field" 
                                        value={profile.phone} 
                                        onChange={handleChange}
                                    />
                                    <button className="btn-outline">변경</button>
                                </div>
                            </div>

                            <div className="divider"></div>

                            {/* 저장 버튼 */}
                            <div className="btn-group">
                                <button className="btn-save">변경 사항 저장</button>
                                <button className="btn-cancel">취소</button>
                            </div>
                            
                            <p className="withdrawal-link">회원 탈퇴 &gt;</p>
                        </div>
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default ProfileEditPage;