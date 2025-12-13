import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import '../../styles/MyPageLayout.css'; // 공통 레이아웃
import '../../styles/ProfileEditPage.css'; // 전용 CSS

// ===================================================
// A. 계정 정보 변경 탭 컴포넌트 (AccountSettingsTab)
// ===================================================
const AccountSettingsTab = ({ profile, accountSettings, handleAccountChange }) => { // accountSettings 상태와 핸들러 추가
    return (
        <div className="form-container account-settings-tab">
            
            <h3 className="section-title">로그인 정보</h3>

            {/* 이름 (변경 가능) */}
            <div className="form-group">
                <label className="input-label">이름</label>
                <input 
                    type="text" 
                    name="name"
                    className="input-field" 
                    value={accountSettings.name}
                    onChange={handleAccountChange}
                />
            </div>

            {/* 아이디 (변경 불가) */}
            <div className="form-group">
                <label className="input-label">아이디</label>
                <input 
                    type="text" 
                    className="input-field read-only" 
                    value={profile.userId} // profile에서 userId 가져옴
                    readOnly
                />
            </div>

            {/* 현재 비밀번호 입력 */}
            <div className="form-group">
                <label className="input-label">비밀번호</label>
                <div className="input-row">
                    <input 
                        type="password" 
                        name="password"
                        className="input-field" 
                        value={accountSettings.password}
                        onChange={handleAccountChange}
                        placeholder="현재 비밀번호를 입력해주세요"
                    />
                    <button className="btn-outline">비밀번호 변경</button>
                </div>
                <p className="input-guide">비밀번호 변경 시 새로운 페이지로 이동합니다.</p>
            </div>
            
            <div className="divider"></div>

            <h3 className="section-title">연락처 정보</h3>

            {/* 이메일 변경 */}
            <div className="form-group">
                <label className="input-label">이메일</label>
                <div className="input-row">
                    <input 
                        type="text" 
                        className="input-field read-only" 
                        value={profile.email}
                        readOnly 
                    />
                    <button className="btn-outline">변경</button>
                </div>
            </div>
            
            {/* 휴대폰 번호 변경 */}
            <div className="form-group">
                <label className="input-label">휴대폰 번호</label>
                <div className="input-row">
                    <input 
                        type="text" 
                        className="input-field read-only" 
                        value={profile.phone}
                        readOnly
                    />
                    <button className="btn-outline">변경</button>
                </div>
            </div>

            <div className="divider"></div>
            
            {/* 저장 버튼 그룹 추가 */}
            <div className="btn-group">
                <button className="btn-save">변경 사항 저장</button>
                <button className="btn-cancel">취소</button>
            </div>

            <h3 className="section-title">계정 관리</h3>
            
            {/* 회원 탈퇴 */}
            <div className="form-group withdrawal-group">
                <label className="input-label">계정 삭제</label>
                <div className="input-row">
                    <span className="info-text">탈퇴 시 모든 데이터는 삭제되며 복구할 수 없습니다.</span>
                    <button className="btn-delete">회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
};


// ===================================================
// B. 기본 정보 변경 탭 컴포넌트 (BaseInfoTab)
//    - 동일
// ===================================================
const BaseInfoTab = ({ profile, handleChange }) => {
    return (
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

            <div className="divider"></div>

            {/* 저장 버튼 */}
            <div className="btn-group">
                <button className="btn-save">변경 사항 저장</button>
                <button className="btn-cancel">취소</button>
            </div>
        </div>
    );
};


// ===================================================
// C. 메인 페이지 컴포넌트 (ProfileEditPage)
// ===================================================
const ProfileEditPage = () => {
    // 탭 상태 관리
    const [activeTab, setActiveTab] = useState('base'); 
    
    // 1. 기본 정보 및 공유 연락처 상태
    const [profile, setProfile] = useState({
        nickname: 'juhyeon00',
        userId: 'juhyeon_main', // 아이디 추가
        email: 'juhyeon00@example.com',
        phone: '010-1234-5678',
        intro: '안녕하세요. 펀딩을 사랑하는 서포터입니다.',
    });

    // 2. 계정 설정 전용 상태 (이름, 비밀번호 등)
    const [accountSettings, setAccountSettings] = useState({
        name: '김주현', // 이름 상태 추가
        password: '', // 비밀번호 입력 필드 상태
    });

    // 기본 정보 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // 계정 설정 핸들러
    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccountSettings({ ...accountSettings, [name]: value });
    };


    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                {/* --- 사이드바 (동일) --- */}
                <aside className="sidebar">
                    <div className="mode-switch">
                        <Link to="/mypage" className="mode-btn active">서포터</Link>
                        <Link to="/maker" className="mode-btn link-btn">메이커</Link>
                    </div>

                    <div className="profile-section">
                        <div className="profile-img">😐</div>
                        <h3 className="username">{profile.nickname} <span className="arrow">&gt;</span></h3>
                        <button className="profile-setting-btn active">내 정보 설정</button>
                    </div>
                </aside>

                {/* --- 메인 콘텐츠 (설정 폼) --- */}
                <main className="main-content">
                    <h2 className="page-title">설정</h2>

                    <div className="edit-card">
                        <div className="card-header-tab">
                            <span 
                                className={`tab-item ${activeTab === 'base' ? 'active' : ''}`}
                                onClick={() => setActiveTab('base')}
                            >
                                기본 정보 변경
                            </span>
                            <span 
                                className={`tab-item ${activeTab === 'account' ? 'active' : ''}`}
                                onClick={() => setActiveTab('account')}
                            >
                                계정 정보 변경
                            </span>
                        </div>

                        {/* 탭 내용 분기 */}
                        {activeTab === 'base' ? (
                            <BaseInfoTab profile={profile} handleChange={handleChange} />
                        ) : (
                            <AccountSettingsTab 
                                profile={profile} 
                                accountSettings={accountSettings} 
                                handleAccountChange={handleAccountChange}
                            />
                        )}

                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default ProfileEditPage;