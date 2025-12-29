import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import AppFooter from "../../components/AppFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ProfileEditPage.css";
import { FiCamera, FiTrash2, FiChevronLeft } from "react-icons/fi";

<<<<<<< HEAD
// --- 필수 컴포넌트 임포트 (경로 확인 필수) ---
=======
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
import InputField from "../../components/Login/InputField";
import PostCode from "../../components/Login/PostCode";
import EmailVerificationForm from "../../components/Login/EmailVerificationForm";

<<<<<<< HEAD
const API_BASE_URL = "http://localhost:8001/api/mypage";
const SERVER_URL = "http://localhost:8001";

const getFullImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  let safeUrl = url;
  if (!safeUrl.startsWith("/uploads") && !safeUrl.startsWith("/")) {
    safeUrl = `/uploads/${safeUrl}`;
  } else if (!safeUrl.startsWith("/")) {
    safeUrl = `/${safeUrl}`;
  }
  return `${SERVER_URL}${safeUrl}`;
=======
const API_BASE_URL = "http://localhost:8001/foodding/api/mypage";
const SERVER_URL = "http://localhost:8001/foodding";

const getFullImageUrl = (url) => {
  if (!url || url === "null") return null;   // ❗ null은 그냥 null
  if (url.startsWith("http")) return url;
  return `${SERVER_URL}${url}`;
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
};

const ProfileEditPage = () => {
  const navigate = useNavigate();
<<<<<<< HEAD

  // --- 상태 관리 ---
  const [activeTab, setActiveTab] = useState("base");
  const [loading, setLoading] = useState(true);
  
  // 비밀번호 & 이메일 유효성 상태
=======
  const fileInputRef = useRef(null);

  // --- 상태 관리 ---
  const [activeTab, setActiveTab] = useState("base");
  // 💡 로딩 상태 변수는 있지만, 화면 전체를 가리지는 않습니다.
  const [loading, setLoading] = useState(true);
  
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
  const [pwdMsg, setPwdMsg] = useState('');
  const [isPwdValid, setIsPwdValid] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  const [profile, setProfile] = useState({
<<<<<<< HEAD
    userId: "",
    name: "",
    userName: "",
    nickname: "",
    email: "",
    phone: "",
    postcode: "",
    mainAddress: "",
    detailAddress: "",
    profileImageUrl: "",
  });

  const [accountForm, setAccountForm] = useState({
    newPassword: "",
    newPasswordConfirm: "",
    email: "",
    postcode: "",
    mainAddress: "",
    detailAddress: "",
  });

    const fileInputRef = useRef(null);
    useEffect(() => {
    (async () => {
        try {
        const res = await axios.get(`${API_BASE_URL}/info`);
        setProfile(res.data); // 전체 프로필 정보 저장

        // 수정할 폼에 기존 데이터 채우기
        setAccountForm({
            newPassword: "",
            newPasswordConfirm: "",
            email: res.data.email || "",
            postcode: res.data.postcode || "",
            mainAddress: res.data.mainAddress || "",
            detailAddress: res.data.detailAddress || "",
        });
        } catch (e) {
        console.error("데이터 로딩 실패:", e);
        } finally {
        setLoading(false);
        }
    })();
    }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  /** =============== 기본 정보 변경 (닉네임) =============== */
  const handleUpdateBaseInfo = async () => {
    try {
      await axios.post(`${API_BASE_URL}/base/updateInfo`, {
        userId: profile.userId,
        userName: profile.userName || profile.name, // ORA-01407 방지
        nickname: profile.nickname,
      });
      toast.success("닉네임이 저장되었습니다.");
    } catch (e) {
      toast.error("저장 실패");
    }
  };

  /** =============== 프로필 사진 로직 =============== */
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("profileFile", file);
    try {
      await axios.post(`${API_BASE_URL}/base/updateProfileImage`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res2 = await axios.get(`${API_BASE_URL}/info`);
      setProfile(res2.data);
      toast.success("사진이 변경되었습니다.");
    } catch (e) {
      toast.error("사진 변경 실패");
    }
  };

=======
    userId: "", name: "", userName: "", nickname: "", email: "", phone: "",
    postcode: "", mainAddress: "", detailAddress: "", profileImageUrl: "",
  });

  const [accountForm, setAccountForm] = useState({
    newPassword: "", newPasswordConfirm: "", email: "", postcode: "", mainAddress: "", detailAddress: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/info`);
        setProfile(res.data);
        setAccountForm({
          newPassword: "", newPasswordConfirm: "",
          email: res.data.email || "",
          postcode: res.data.postcode || "",
          mainAddress: res.data.mainAddress || "",
          detailAddress: res.data.detailAddress || "",
        });
      } catch (e) {
        console.error("데이터 로딩 실패:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleUpdateBaseInfo = async () => {
    try {
      await axios.post(`${API_BASE_URL}/base/updateInfo`, {
        userId: profile.userId,
        userName: profile.userName || profile.name,
        nickname: profile.nickname,
      });
      toast.success("닉네임이 저장되었습니다.");
    } catch (e) {
      toast.error("저장 실패");
    }
  };

 const handleProfileImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profileFile", file); // ⭐ 서버와 이름 일치

  try {
    const res = await axios.post(
      "http://localhost:8001/foodding/api/mypage/base/updateProfileImage",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // ⭐ 여기 핵심
    setProfile(prev => ({
      ...prev,
      profileImageUrl: res.data.profileImageUrl,
    }));

    toast.success("사진이 변경되었습니다.");
  } catch (e) {
    toast.error("사진 변경 실패");
  } finally {
    e.target.value = "";
  }
};





>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
  const handleDeleteProfileImage = async () => {
    if (!window.confirm("프로필 사진을 삭제하시겠습니까?")) return;
    try {
      await axios.post(`${API_BASE_URL}/base/deleteProfileImage`);
      setProfile((prev) => ({ ...prev, profileImageUrl: null }));
      toast.success("기본 이미지로 변경되었습니다.");
<<<<<<< HEAD
    } catch (e) {
      toast.error("사진 삭제 실패");
    }
  };

 /** =============== 계정 정보 저장 (최종 로직) =============== */
  const handleSaveAccount = async () => {
    if (accountForm.newPassword && !isPwdValid) {
      toast.error("비밀번호 형식을 확인해주세요.");
      return;
    }
    if (accountForm.newPassword !== accountForm.newPasswordConfirm) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 이메일이 변경되었을 때만 인증 체크
    if (accountForm.email !== profile.email && !emailVerified) {
      toast.warning("이메일 변경 시 인증이 필요합니다.");
      return;
    }

    try {
      // 💡 여기서 nickname을 포함해서 보내야 DB 에러(ORA-01407)가 나지 않습니다.
      await axios.post(`${API_BASE_URL}/account/update`, {
        userId: profile.userId,
        userName: profile.userName || profile.name, // 이름 유지
        nickname: profile.nickname,                // 닉네임 유지 (추가됨!)
        userPwd: accountForm.newPassword,          // 비밀번호 (입력시에만 처리)
=======
    } catch (e) { toast.error("사진 삭제 실패"); }
  };

  const handleSaveAccount = async () => {
    if (accountForm.newPassword && !isPwdValid) return toast.error("비밀번호 형식을 확인해주세요.");
    if (accountForm.newPassword !== accountForm.newPasswordConfirm) return toast.error("새 비밀번호가 일치하지 않습니다.");
    if (accountForm.email !== profile.email && !emailVerified) return toast.warning("이메일 변경 시 인증이 필요합니다.");

    try {
      await axios.post(`${API_BASE_URL}/account/update`, {
        userId: profile.userId,
        userName: profile.userName || profile.name,
        nickname: profile.nickname,
        userPwd: accountForm.newPassword,
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
        email: accountForm.email,
        postcode: accountForm.postcode,
        mainAddress: accountForm.mainAddress,
        detailAddress: accountForm.detailAddress,
      });
<<<<<<< HEAD
      
      toast.success("계정 정보가 수정되었습니다.");
      
      // 저장 후 최신 정보를 다시 불러와서 상태 동기화
      const res = await axios.get(`${API_BASE_URL}/info`);
      setProfile(res.data);
    } catch (e) {
      console.error(e);
      toast.error("저장 중 오류 발생 (DB 제약조건 확인)");
    }
=======
      toast.success("계정 정보가 수정되었습니다.");
      const res = await axios.get(`${API_BASE_URL}/info`);
      setProfile(res.data);
    } catch (e) { toast.error("저장 중 오류 발생"); }
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
  };

  const handleWithdraw = () => {
    if (!window.confirm("정말 탈퇴하시겠습니까?")) return;
    toast.info("회원탈퇴 기능 준비 중");
  };

<<<<<<< HEAD
  if (loading) return <div>로딩 중...</div>;

=======
  // 💡 로딩 화면 리턴 제거함 -> 바로 아래 JSX 렌더링
  
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
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
<<<<<<< HEAD
              {/* --- 기본 정보 탭 --- */}
=======
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
              {activeTab === "base" && (
                <div className="form-container base-info-form">
                  <div className="photo-section">
                    <div className="photo-wrapper">
<<<<<<< HEAD
                      <img src={getFullImageUrl(profile.profileImageUrl) || "/placeholder.png"} alt="프로필" className="current-photo" onError={(e) => (e.target.src = "/placeholder.png")} />
=======
                      <img
                        src={
                          profile.profileImageUrl
                            ? `${getFullImageUrl(profile.profileImageUrl)}?t=${Date.now()}`
                            : "/placeholder.png"
                        }
                        alt="프로필"
                        className="current-photo"
                        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                      />

>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
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

<<<<<<< HEAD
            {/* --- 계정 정보 탭 --- */}
            {activeTab === "account" && (
            <div className="form-container account-info-form">
                {/* 1. 이름 & 아이디 (기존 데이터 고정) */}
                <InputField label="이름" value={profile.userName || profile.name || ""} readOnly />
                <InputField label="아이디" value={profile.userId || ""} readOnly />
                
                {/* 2. 비밀번호 변경 (입력 시에만 작동) */}
                <div>
                <InputField 
                    label="새 비밀번호" 
                    type="password" 
                    placeholder="변경 시에만 입력하세요 (8~16자 영문, 숫자, 특수문자)" 
                    value={accountForm.newPassword} 
                    onChange={(e) => {
                    const val = e.target.value;
                    setAccountForm({...accountForm, newPassword: val});
                    if (val && !pwdRegex.test(val)) { 
                        setPwdMsg("형식이 올바르지 않습니다."); 
                        setIsPwdValid(false); 
                    } else { 
                        setPwdMsg(val ? "사용 가능합니다." : ""); 
                        setIsPwdValid(true); 
                    }
                    }} 
                />
                {pwdMsg && <p style={{ fontSize: '12px', color: isPwdValid ? '#2ecc71' : '#ff4757', marginTop: '4px' }}>{pwdMsg}</p>}
                </div>

                {/* 3. 비밀번호 확인 */}
                <InputField 
                label="새 비밀번호 확인" 
                type="password" 
                placeholder="새 비밀번호 다시 입력"
                value={accountForm.newPasswordConfirm} 
                onChange={(e) => setAccountForm({...accountForm, newPasswordConfirm: e.target.value})}
                error={accountForm.newPassword && accountForm.newPasswordConfirm && accountForm.newPassword !== accountForm.newPasswordConfirm ? "비밀번호가 일치하지 않습니다." : null} 
                />

                {/* 4. 전화번호 (기존 데이터 고정) */}
                <InputField label="전화번호" value={profile.phone || ""} readOnly />
                
                {/* 5. 이메일 (기존 데이터가 기본값으로 들어감) */}
                <EmailVerificationForm 
                email={accountForm.email} // accountForm에 담긴 기존 이메일이 보임
                onChange={(e) => setAccountForm({...accountForm, email: e.target.value})} 
                onVerified={(val) => setEmailVerified(val)} 
                />

                {/* 6. 주소 (기존 데이터가 기본값으로 들어감) */}
                <div className="address-section">
                <div className="postcode-row" style={{display: 'flex', gap: '8px', alignItems: 'flex-end'}}>
                    <div style={{flex: 1}}>
                    <InputField 
                        label="주소" 
                        value={accountForm.postcode} // 기존 우편번호
                        readOnly 
                        placeholder="우편번호" 
                    />
                    </div>
                    <PostCode onComplete={(data) => setAccountForm({
                    ...accountForm, 
                    postcode: data.zonecode, 
                    mainAddress: data.address, 
                    detailAddress: ''
                    })} />
                </div>
                <InputField 
                    value={accountForm.mainAddress} // 기존 기본주소
                    readOnly 
                    placeholder="기본 주소" 
                />
                <InputField 
                    value={accountForm.detailAddress} // 기존 상세주소
                    onChange={(e) => setAccountForm({...accountForm, detailAddress: e.target.value})} 
                    placeholder="상세 주소를 입력하세요" 
                />
                </div>

                {/* 하단 버튼 */}
                <div className="account-action-buttons">
                <button className="btn-save-account" onClick={handleSaveAccount}>변경사항 저장</button>
                <button className="btn-cancel-account" onClick={() => navigate(0)}>취소</button>
                </div>
                
                <div className="withdraw-zone">
                <button className="btn-withdraw-link" onClick={handleWithdraw}>회원탈퇴</button>
                </div>
            </div>
            )}
=======
              {activeTab === "account" && (
                <div className="form-container account-info-form">
                  <InputField label="이름" value={profile.userName || profile.name || ""} readOnly />
                  <InputField label="아이디" value={profile.userId || ""} readOnly />
                  
                  <div>
                    <InputField 
                      label="새 비밀번호" type="password" placeholder="변경 시에만 입력하세요" 
                      value={accountForm.newPassword} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setAccountForm({...accountForm, newPassword: val});
                        if (val && !pwdRegex.test(val)) { setPwdMsg("형식이 올바르지 않습니다."); setIsPwdValid(false); } 
                        else { setPwdMsg(val ? "사용 가능합니다." : ""); setIsPwdValid(true); }
                      }} 
                    />
                    {pwdMsg && <p style={{ fontSize: '12px', color: isPwdValid ? '#2ecc71' : '#ff4757', marginTop: '4px' }}>{pwdMsg}</p>}
                  </div>

                  <InputField 
                    label="새 비밀번호 확인" type="password" placeholder="새 비밀번호 다시 입력"
                    value={accountForm.newPasswordConfirm} 
                    onChange={(e) => setAccountForm({...accountForm, newPasswordConfirm: e.target.value})}
                    error={accountForm.newPassword && accountForm.newPasswordConfirm && accountForm.newPassword !== accountForm.newPasswordConfirm ? "비밀번호가 일치하지 않습니다." : null} 
                  />

                  <InputField label="전화번호" value={profile.phone || ""} readOnly />
                  
                  <EmailVerificationForm 
                    email={accountForm.email} 
                    onChange={(e) => setAccountForm({...accountForm, email: e.target.value})} 
                    onVerified={(val) => setEmailVerified(val)} 
                  />

                  <div className="address-section">
                    <div className="postcode-row" style={{display: 'flex', gap: '8px', alignItems: 'flex-end'}}>
                      <div style={{flex: 1}}>
                        <InputField label="주소" value={accountForm.postcode} readOnly placeholder="우편번호" />
                      </div>
                      <PostCode onComplete={(data) => setAccountForm({ ...accountForm, postcode: data.zonecode, mainAddress: data.address, detailAddress: '' })} />
                    </div>
                    <InputField value={accountForm.mainAddress} readOnly placeholder="기본 주소" />
                    <InputField value={accountForm.detailAddress} onChange={(e) => setAccountForm({...accountForm, detailAddress: e.target.value})} placeholder="상세 주소를 입력하세요" />
                  </div>

                  <div className="account-action-buttons">
                    <button className="btn-save-account" onClick={handleSaveAccount}>변경사항 저장</button>
                    <button className="btn-cancel-account" onClick={() => navigate(0)}>취소</button>
                  </div>
                  
                  <div className="withdraw-zone">
                    <button className="btn-withdraw-link" onClick={handleWithdraw}>회원탈퇴</button>
                  </div>
                </div>
              )}
>>>>>>> b21c34a0f086799c3e56286fd412f90bd76873c4
            </div>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default ProfileEditPage;