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
  
  // 🔒 계정 정보 접근 보안 추가
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

  // 탭 변경 시 인증 초기화
  const handleTabChange = (tab) => {
    if (tab === "account") {
      setIsVerified(false);
      setCurrentPwd("");
    }
    setActiveTab(tab);
  };

  // 🔒 현재 비밀번호 확인 로직
  const handleVerifyPassword = async () => {
    if (!currentPwd) return toast.warn("비밀번호를 입력해주세요.");
    try {
      const res = await axios.post(`${API_BASE_URL}/account/verifyPassword`, 
        { password: currentPwd }, 
        { headers: getAuthHeader() }
      );
      if (res.data.success) {
        setIsVerified(true);
        toast.success("인증되었습니다.");
      } else {
        toast.error("비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      toast.error("인증 중 오류 발생");
    }
  };

  const handleUpdateBaseInfo = async () => {
    try {
      await axios.post(`${API_BASE_URL}/base/updateInfo`, {
        userId: profile.userId,
        userName: profile.userName,
        nickname: profile.nickname,
      }, { headers: getAuthHeader() });
      toast.success("닉네임이 저장되었습니다.");
      loadUserData();
    } catch (e) { toast.error("저장 실패"); }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileFile", file);
    try {
      const res = await axios.post(`${API_BASE_URL}/base/updateProfileImage`, formData, {
        headers: { "Content-Type": "multipart/form-data", ...getAuthHeader() },
      });
      const newImageUrl = res.data.profileImageUrl || res.data.modifyProfile;
      setProfile(prev => ({ ...prev, modifyProfile: newImageUrl }));
      toast.success("사진이 변경되었습니다.");
      loadUserData(); 
    } catch (e) { toast.error("사진 변경 실패"); }
    finally { e.target.value = ""; }
  };

  const handleDeleteProfileImage = async () => {
    if (!window.confirm("프로필 사진을 삭제하시겠습니까?")) return;
    try {
      await axios.post(`${API_BASE_URL}/base/deleteProfileImage`, {}, { headers: getAuthHeader() });
      setProfile((prev) => ({ ...prev, modifyProfile: null }));
      toast.success("기본 이미지로 변경되었습니다.");
    } catch (e) { toast.error("사진 삭제 실패"); }
  };

  const handleSaveAccount = async () => {
    // 1. 비밀번호 유효성 검사
    if (accountForm.newPassword) {
      if (!isPwdValid) {
        toast.error("비밀번호 형식을 확인해주세요.");
        return;
      }
      if (accountForm.newPassword !== accountForm.newPasswordConfirm) {
        toast.error("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    // 2. 이메일 인증 체크 (이메일이 실제로 바뀌었을 때만 체크)
    // profile.email은 서버에서 가져온 초기값입니다.
    if (accountForm.email !== profile.email && !emailVerified) {
      toast.warning("이메일 변경 시 인증이 필요합니다.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // 서버로 보낼 데이터 객체
      const requestData = {
        userId: profile.userId,
        userName: profile.userName,
        nickname: profile.nickname,
        userPwd: accountForm.newPassword || null, // 비밀번호 변경 안 하면 null
        email: accountForm.email,
        postcode: accountForm.postcode,
        mainAddress: accountForm.mainAddress,
        detailAddress: accountForm.detailAddress,
      };

      console.log("🚀 저장 시도 데이터:", requestData);

      const res = await axios.post(`${API_BASE_URL}/account/update`, requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3. 성공 문구 출력 (res.status가 200번대면 실행)
      if (res.status === 200 || res.status === 201) {
        console.log("✅ 저장 성공 응답:", res.data);
        
        // 🔥 이 문구가 실행되려면 위에서 return이 발생하면 안 됩니다.
        toast.success("계정 정보가 변경되었습니다!"); 
        
        // 데이터 리로드 (화면 동기화)
        await loadUserData();
        
        // 비밀번호 입력창 초기화
        setAccountForm(prev => ({ 
          ...prev, 
          newPassword: "", 
          newPasswordConfirm: "" 
        }));
      }
    } catch (e) { 
      console.error("❌ 저장 실패 상세:", e.response?.data || e.message);
      toast.error("저장 중 오류가 발생했습니다."); 
    }
  };

  const handleWithdraw = () => {
    if (!window.confirm("정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제됩니다.")) return;
    // 탈퇴 API 호출 로직 (생략된 경우 아래와 같이 작성 가능)
    axios.delete(`${API_BASE_URL}/withdraw`, { headers: getAuthHeader() })
      .then(() => {
        toast.success("탈퇴 처리가 완료되었습니다.");
        localStorage.removeItem('token');
        navigate('/');
      }).catch(() => toast.error("탈퇴 처리 중 오류 발생"));
  };

  if (loading) return <div style={{padding:'100px 0', textAlign:'center'}}>회원 정보를 불러오는 중입니다...</div>;

  return (
    <div className="page-wrapper">
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
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
              {activeTab === "base" && (
                <div className="form-container base-info-form">
                  <div className="photo-section">
                    <div className="photo-wrapper">
                      <img src={profile.modifyProfile ? `${getFullImageUrl(profile.modifyProfile)}?t=${Date.now()}` : "/placeholder.png"} alt="프로필" className="current-photo" onError={(e) => { e.target.src = "/placeholder.png"; }} />
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

              {activeTab === "account" && (
                <div className="form-container account-info-form">
                  {!isVerified ? (
                    /* 🔒 비밀번호 확인 UI (기존 레이아웃 유지하며 추가) */
                    <div style={{textAlign:'center', padding:'40px 0'}}>
                      <FiLock size={48} color="#ff5757" style={{marginBottom:'16px'}} />
                      <p style={{marginBottom:'20px', color:'#666'}}>보안을 위해 현재 비밀번호를 입력해주세요.</p>
                      <div style={{maxWidth:'300px', margin:'0 auto'}}>
                        <InputField type="password" placeholder="현재 비밀번호" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleVerifyPassword()} />
                        <button className="btn-submit" style={{marginTop:'15px', width:'100%'}} onClick={handleVerifyPassword}>확인</button>
                      </div>
                    </div>
                  ) : (
                    /* ✅ 인증 성공 시 실제 폼 노출 */
                    <>
                      <InputField label="이름" value={profile.userName || ""} readOnly />
                      <InputField label="아이디" value={profile.userId || ""} readOnly />
                      <div>
                        <InputField label="새 비밀번호" type="password" placeholder="변경 시에만 입력하세요" value={accountForm.newPassword} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setAccountForm({...accountForm, newPassword: val});
                            if (val && !pwdRegex.test(val)) { setPwdMsg("형식이 올바르지 않습니다."); setIsPwdValid(false); } 
                            else { setPwdMsg(val ? "사용 가능합니다." : ""); setIsPwdValid(true); }
                          }} 
                        />
                        {pwdMsg && <p style={{ fontSize: '12px', color: isPwdValid ? '#2ecc71' : '#ff4757', marginTop: '4px' }}>{pwdMsg}</p>}
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
  );
};

export default ProfileEditPage;