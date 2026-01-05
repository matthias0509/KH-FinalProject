import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import AppFooter from "../../components/AppFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "../../styles/ProfileEditPage.css";
import { FiCamera, FiTrash2, FiChevronLeft, FiLock } from "react-icons/fi";

import InputField from "../../components/Login/InputField";
import PostCode from "../../components/Login/PostCode";
import EmailVerificationForm from "../../components/Login/EmailVerificationForm";

const API_BASE_URL = "http://localhost:8001/foodding/api/mypage";
const SERVER_URL = "http://localhost:8001/foodding";
const UPLOAD_PATH = "/uploads/";

const getFullImageUrl = (filename) => {
  if (!filename || filename === "null") return null;
  if (filename.startsWith("http")) return filename;
  return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("base");
  const [loading, setLoading] = useState(true);
  
  const [isVerified, setIsVerified] = useState(false); 
  const [currentPwd, setCurrentPwd] = useState(""); 

  const [pwdMsg, setPwdMsg] = useState('');
  const [isPwdValid, setIsPwdValid] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  const [profile, setProfile] = useState({
    userId: "", userName: "", nickname: "", email: "", phone: "",
    postcode: "", mainAddress: "", detailAddress: "", modifyProfile: "",
  });

  const [accountForm, setAccountForm] = useState({
    newPassword: "", newPasswordConfirm: "", email: "", postcode: "", mainAddress: "", detailAddress: "",
  });

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('token'); 
    return { Authorization: `Bearer ${token}` };
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate('/login');
        return;
      }
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/info`, { headers: getAuthHeader() });
      if (res.data) {
        setProfile(res.data); 
        setAccountForm({
          newPassword: "", newPasswordConfirm: "",
          email: res.data.email || "",
          postcode: res.data.postcode || "",
          mainAddress: res.data.mainAddress || "",
          detailAddress: res.data.detailAddress || "",
        });
      }
    } catch (e) {
      console.error("데이터 로딩 실패:", e);
    } finally {
      setLoading(false);
    }
  }, [navigate, getAuthHeader]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleTabChange = (tab) => {
    if (tab === "account") {
      setIsVerified(false);
      setCurrentPwd("");
    }
    setActiveTab(tab);
  };

  const handleVerifyPassword = async () => {
    if (!currentPwd) return alert("비밀번호를 입력해주세요.");
    try {
      const res = await axios.post(`${API_BASE_URL}/account/verifyPassword`, 
        { password: currentPwd }, 
        { headers: getAuthHeader() }
      );
      if (res.data.success) {
        setIsVerified(true);
        // alert("인증되었습니다."); // 이건 너무 자주 떠서 뺌
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      alert("인증 중 오류 발생");
    }
  };

  // 🔥 [수정됨] 닉네임 저장 -> alert 추가
  const handleUpdateBaseInfo = async () => {
    if (!profile.nickname.trim()) {
      return alert("닉네임을 입력해주세요.");
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/base/updateInfo`, {
        userId: profile.userId,
        userName: profile.userName,
        nickname: profile.nickname,
      }, { headers: getAuthHeader() });

      if (res.status >= 200 && res.status < 300) {
        // 👇 여기서 무조건 뜹니다
        alert("닉네임이 성공적으로 변경되었습니다!");
        await loadUserData(); 
      }
    } catch (e) { 
        console.error("닉네임 저장 실패:", e);
        const errorMsg = e.response?.data?.message || "닉네임 저장에 실패했습니다.";
        alert(errorMsg); 
    }
  };

  // 🔥 [수정됨] 사진 변경 -> alert 추가
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileFile", file);

    try {
      const res = await axios.post(`${API_BASE_URL}/base/updateProfileImage`, formData, {
        headers: { "Content-Type": "multipart/form-data", ...getAuthHeader() },
      });

      if (res.status >= 200 && res.status < 300) {
        const newImageUrl = res.data.profileImageUrl || res.data.modifyProfile;
        if (newImageUrl) {
            setProfile(prev => ({ ...prev, modifyProfile: newImageUrl }));
        }
        // 👇 여기서 무조건 뜹니다
        alert("프로필 사진이 변경되었습니다!");
        await loadUserData();
      }
    } catch (e) { 
        console.error("사진 변경 실패:", e);
        alert("사진 변경 중 오류가 발생했습니다."); 
    } finally { 
        e.target.value = ""; 
    }
  };

  const handleDeleteProfileImage = async () => {
    if (!window.confirm("프로필 사진을 삭제하시겠습니까?")) return;
    try {
      await axios.post(`${API_BASE_URL}/base/deleteProfileImage`, {}, { headers: getAuthHeader() });
      setProfile((prev) => ({ ...prev, modifyProfile: null }));
      alert("기본 이미지로 변경되었습니다.");
    } catch (e) { alert("사진 삭제 실패"); }
  };

  // 🔥 [수정됨] 계정 정보 저장 -> alert 추가
  const handleSaveAccount = async () => {
    if (accountForm.newPassword) {
      if (!isPwdValid) return alert("비밀번호 형식을 확인해주세요.");
      if (accountForm.newPassword !== accountForm.newPasswordConfirm) return alert("새 비밀번호가 일치하지 않습니다.");
    }

    if (accountForm.email !== profile.email && !emailVerified) {
      return alert("이메일 변경 시 인증이 필요합니다.");
    }

    try {
      const token = localStorage.getItem('token');
      const requestData = {
        userId: profile.userId,
        userName: profile.userName,
        nickname: profile.nickname,
        userPwd: accountForm.newPassword || null,
        email: accountForm.email,
        postcode: accountForm.postcode,
        mainAddress: accountForm.mainAddress,
        detailAddress: accountForm.detailAddress,
      };

      const res = await axios.post(`${API_BASE_URL}/account/update`, requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status >= 200 && res.status < 300) {
        const successMsg = res.data?.message || "계정 정보가 변경되었습니다!";
        // 👇 여기서 무조건 뜹니다
        alert(successMsg);
        
        await loadUserData();
        setAccountForm(prev => ({ ...prev, newPassword: "", newPasswordConfirm: "" }));
        setPwdMsg("");
      }
    } catch (e) { 
      const errorMsg = e.response?.data?.message || "저장 중 오류가 발생했습니다.";
      alert(errorMsg);
    }
  };

  const handleWithdraw = () => {
    if (!window.confirm("정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제됩니다.")) return;
    
    axios.delete(`${API_BASE_URL}/withdraw`, { headers: getAuthHeader() })
      .then(() => {
        alert("탈퇴 처리가 완료되었습니다.");
        localStorage.removeItem('token');
        navigate('/');
      }).catch(() => alert("탈퇴 처리 중 오류 발생"));
  };

  if (loading) return <div style={{padding:'100px 0', textAlign:'center'}}>회원 정보를 불러오는 중입니다...</div>;

  return (
    <>
      {/* ToastContainer는 혹시 모르니 남겨둠 */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" style={{ zIndex: 99999999, marginTop: '80px' }} />

      <div className="page-wrapper">
        <Header />
        <div className="profile-edit-container">
          <main className="settings-main">
            <div className="page-header-actions">
              <button onClick={() => navigate(-1)} className="btn-back-link">
                <FiChevronLeft className="back-icon" /> 뒤로가기
              </button>
            </div>
            
            <div className="edit-card">
              <div className="card-header-tab">
                <span className={`tab-item ${activeTab === "base" ? "active" : ""}`} onClick={() => handleTabChange("base")}>기본 정보</span>
                <span className={`tab-item ${activeTab === "account" ? "active" : ""}`} onClick={() => handleTabChange("account")}>계정 정보</span>
              </div>
              
              <div className="card-body">
                {/* 1. 기본 정보 탭 */}
                {activeTab === "base" && (
                  <div className="form-container base-info-form">
                    <div className="photo-section">
                      <div className="photo-wrapper">
                        <img 
                            src={profile.modifyProfile ? `${getFullImageUrl(profile.modifyProfile)}?t=${Date.now()}` : "/placeholder.png"} 
                            alt="프로필" 
                            className="current-photo" 
                            onError={(e) => { e.target.src = "/placeholder.png"; }} 
                        />
                      </div>
                      <div className="photo-buttons">
                        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleProfileImageChange} />
                        <button className="btn-action btn-upload" onClick={() => fileInputRef.current.click()}><FiCamera className="btn-icon" /> 사진 변경</button>
                        <button className="btn-action btn-delete-photo" onClick={handleDeleteProfileImage}><FiTrash2 className="btn-icon" /> 삭제</button>
                      </div>
                    </div>
                    <InputField label="닉네임" value={profile.nickname || ""} onChange={(e) => setProfile({ ...profile, nickname: e.target.value })} placeholder="닉네임을 입력해주세요" />
                    <button className="btn-submit btn-save-nickname" onClick={handleUpdateBaseInfo}>닉네임 저장</button>
                  </div>
                )}

                {/* 2. 계정 정보 탭 */}
                {activeTab === "account" && (
                  <div className="form-container account-info-form">
                    {!isVerified ? (
                      <div style={{textAlign:'center', padding:'40px 0'}}>
                        <FiLock size={48} color="#ff5757" style={{marginBottom:'16px'}} />
                        <p style={{marginBottom:'20px', color:'#666'}}>보안을 위해 현재 비밀번호를 입력해주세요.</p>
                        <div style={{maxWidth:'300px', margin:'0 auto'}}>
                          <InputField type="password" placeholder="현재 비밀번호" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleVerifyPassword()} />
                          <button className="btn-submit" style={{marginTop:'15px', width:'100%'}} onClick={handleVerifyPassword}>확인</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <InputField label="이름" value={profile.userName || ""} readOnly />
                        <InputField label="아이디" value={profile.userId || ""} readOnly />
                        <div>
                          <InputField 
                            label="새 비밀번호" 
                            type="password" 
                            placeholder="변경 시에만 입력하세요" 
                            value={accountForm.newPassword} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setAccountForm({...accountForm, newPassword: val});
                              if (!val) {
                                setPwdMsg(""); setIsPwdValid(false); return;
                              }
                              if (!pwdRegex.test(val)) { setPwdMsg("형식이 올바르지 않습니다."); setIsPwdValid(false); } 
                              else if (val === currentPwd) { setPwdMsg("현재 비밀번호와 동일합니다."); setIsPwdValid(false); } 
                              else { setPwdMsg("사용 가능합니다."); setIsPwdValid(true); }
                            }} 
                          />
                          {pwdMsg && (
                            <p style={{ fontSize: '12px', color: isPwdValid ? '#2ecc71' : '#ff4757', marginTop: '4px' }}>
                              {pwdMsg}
                            </p>
                          )}
                        </div>
                        <InputField label="새 비밀번호 확인" type="password" placeholder="새 비밀번호 다시 입력" value={accountForm.newPasswordConfirm} onChange={(e) => setAccountForm({...accountForm, newPasswordConfirm: e.target.value})} error={accountForm.newPassword && accountForm.newPasswordConfirm && accountForm.newPassword !== accountForm.newPasswordConfirm ? "비밀번호가 일치하지 않습니다." : null} />
                        <InputField label="전화번호" value={profile.phone || ""} readOnly />
                        <EmailVerificationForm email={accountForm.email} onChange={(e) => setAccountForm({...accountForm, email: e.target.value})} onVerified={(val) => setEmailVerified(val)} />
                        <div className="address-section">
                          <div className="postcode-row" style={{display: 'flex', gap: '8px', alignItems: 'flex-end'}}>
                            <div style={{flex: 1}}><InputField label="주소" value={accountForm.postcode} readOnly placeholder="우편번호" /></div>
                            <PostCode onComplete={(data) => setAccountForm({ ...accountForm, postcode: data.zonecode, mainAddress: data.address, detailAddress: '' })} />
                          </div>
                          <InputField value={accountForm.mainAddress} readOnly placeholder="기본 주소" />
                          <InputField value={accountForm.detailAddress} onChange={(e) => setAccountForm({...accountForm, detailAddress: e.target.value})} placeholder="상세 주소를 입력하세요" />
                        </div>
                        <div className="account-action-buttons">
                          <button className="btn-save-account" onClick={handleSaveAccount}>변경사항 저장</button>
                          <button className="btn-cancel-account" onClick={() => setIsVerified(false)}>취소</button>
                        </div>
                        <div className="withdraw-zone">
                          <button className="btn-withdraw-link" onClick={handleWithdraw}>회원탈퇴</button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default ProfileEditPage;