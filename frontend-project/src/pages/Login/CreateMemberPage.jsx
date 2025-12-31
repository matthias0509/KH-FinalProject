import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import SubmitButton from '../../components/Login/SubmitButton';
import PostCode from "../../components/Login/PostCode";
import axios from "axios";
import EmailVerificationForm from "../../components/Login/EmailVerificationForm";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CreateMember() {
    const [form, setForm] = useState({
        // 1. 필수 입력 필드
        userId: '',            // USER_ID
        userPwd: '',           // USER_PWD
        confirmPassword: '',   // 비밀번호 확인 (프론트엔드용)
        userName: '',          // USER_NAME
        nickname: '',          // NICKNAME
        birthDate: '',         // BIRTH_DATE
        gender: 'M',           // GENDER (기본값 설정)
        email: '',             // EMAIL
        phone: '',             // PHONE
        
        // 2. 주소 필드
        postcode: '',          // POSTCODE
        mainAddress: '',       // MAIN_ADDRESS
        detailAddress: ''      // DETAIL_ADDRESS
    });
    
    // 프로필파일 객체
    const [profileFile, setProfileFile] = useState(null);
    const [emailVerified, setEmailVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    // 파일 선택시 실행될 핸들러
    const handleFileChange = (e) => {
        setProfileFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value });

        // 비밀번호 입력 실시간 유효성 검사
        if (name === 'userPwd') {
            if (value && !pwdRegex.test(value)) {
                setIsPwdValid(false);
                setPwdMsg("비밀번호는 8~16자 영문, 숫자, 특수문자를 포함해야 합니다.");
            } else {
                setIsPwdValid(true);
                setPwdMsg("사용가능한 비밀번호입니다.");
            }
        }
    };

    const handleAddressSelect = (data) => {
        setForm(prevForm => ({
            ...prevForm,
            postcode: data.zonecode,
            mainAddress: data.address,
            detailAddress: '' // 새 주소 검색 시 상세 주소 초기화
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. 필수 입력값 및 중복 확인 체크리스트
        if (!form.userId) {
            toast.warning("아이디를 입력해주세요.");
            return;
        }
        if (!isIdValid) {
            toast.error("아이디 중복 확인이 필요하거나 형식이 올바르지 않습니다.");
            return;
        }

        if (!isPwdValid) {
            toast.error("비밀번호 조건을 확인해주세요. (8~16자 영문, 숫자, 특수문자 포함)");
            return;
        }
        if (form.userPwd !== form.confirmPassword) {
            toast.error("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!form.nickname) {
            toast.warning("닉네임을 입력해주세요.");
            return;
        }
        if (!isNickValid) {
            toast.error("닉네임 중복 확인이 필요하거나 형식이 올바르지 않습니다.");
            return;
        }

        if (!emailVerified) {
            toast.warning("이메일 인증을 완료해주세요.");
            return;
        }

        if (!form.userName || !form.birthDate || !form.phone || !form.postcode) {
            toast.warning("나머지 필수 정보(이름, 생년월일, 전화번호, 주소)를 모두 입력해주세요.");
            return;
        }

        // 2. 모든 검사 통과 시 실제 데이터 전송 시작
        setIsLoading(true);

        // 💡 핵심: 새로운 FormData 생성
        const formData = new FormData();

        // 2. 텍스트 필드 전부 추가 (birthDate 포함)
        Object.keys(form).forEach(key => {
            if (key !== 'confirmPassword') { // 확인용 필드 제외
                formData.append(key, form[key]);
            }
        });

        // 3. 파일 객체 추가 (가장 중요!)
        // 여기서 'upfile'이라는 이름은 Java의 @RequestPart("upfile") 또는 매개변수 이름과 일치해야 합니다.
        if (profileFile) {
            formData.append('upfile', profileFile); 
            console.log("파일 첨부됨:", profileFile.name);
        } else {
            console.log("파일이 선택되지 않았습니다.");
        }

        try {
            const API_URL = "http://localhost:8001/foodding";
            
            // 4. 전송 시 헤더 설정 (Axios는 FormData 전송 시 자동으로 설정해주지만 명시하면 더 안전함)
            await axios.post(`${API_URL}/member/insert`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/login' , {state: {message: '회원가입이 완료되었습니다. 로그인해주세요!'}});
        } catch (error) {
            console.error('회원가입 실패:', error);
            toast.error('회원가입 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
};

const [idMsg, setIdMsg] = useState('');
const [nickMsg, setNickMsg] = useState('');
const [isIdValid, setIsIdValid] = useState(false);
const [isNickValid, setIsNickValid] = useState(false);
const [pwdMsg, setPwdMsg] = useState('');
const [isPwdValid, setIsPwdValid] = useState(false);

const handleIdBlur = async () => {
    if (!form.userId) {
        setIdMsg("")
        setIsIdValid(false);
        return;
    }

    if (form.userId.length < 4 || form.userId.length > 15) {
        setIdMsg("아이디는 4~15자 사이로 입력해주세요.");
        setIsIdValid(false);
        return;
    }

    try {
        const response = await axios.get("http://localhost:8001/foodding/member/idCheck",{
            params: { userId: form.userId }
        });
        if (response.data === "available") {
            setIdMsg("사용 가능한 아이디입니다.");
            setIsIdValid(true);
        } else {
            setIdMsg("이미 사용 중인 아이디입니다.");
            setIsIdValid(false);
        }
    } catch (error) {
        console.error("아이디 중복 확인 실패:", error);
    }
};

const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^0-9]/g, '');
    
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

const handlePhoneChange = (e) => {
    const formattted = formatPhoneNumber(e.target.value);
    setForm({...form, phone: formattted });
}

const handleNickBlur = async () => {
    if (!form.nickname) {
        setNickMsg("");
        setIsNickValid(false);
        return;
    }

    if (form.nickname.length < 2 || form.nickname.length > 15) {
        setNickMsg("닉네임은 2~15자 사이로 입력해주세요.");
        setIsNickValid(false);
        return;
    }

    try {
        const response = await axios.get("http://localhost:8001/foodding/member/nicknameCheck",{
            params: { nickname: form.nickname }
        });
        if (response.data === "available") {
            setNickMsg("사용 가능한 닉네임입니다.");
            setIsNickValid(true);
        } else {
            setNickMsg("이미 사용 중인 닉네임입니다.");
            setIsNickValid(false);
        }
    } catch (error) {
        console.error("닉네임 중복 확인 실패:", error);
    }
};

    return(
        <div className="app">
            <Header />
            <AuthLayout title="회원가입">
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    
                    {/* 1. 아이디 (USER_ID) */}
                    <div>
                        <InputField
                            label="아이디"
                            name="userId"
                            value={form.userId}
                            onChange={handleChange}
                            onBlur={handleIdBlur} // 💡 포커스가 나갈 때 실행
                            placeholder="4~15자 사이로 입력하세요"
                            required
                        />
                        {idMsg && (
                            <p style={{ 
                                fontSize: '12px', 
                                marginTop: '4px', 
                                color: isIdValid ? '#2ecc71' : '#ff4757',
                                fontWeight: '500'
                            }}>
                                {idMsg}
                            </p>
                        )}
                    </div>
                    
                    {/* 2. 비밀번호 (USER_PWD) */}
                    <div>
                        <InputField
                            label="비밀번호"
                            type="password"
                            name="userPwd"
                            value={form.userPwd}
                            onChange={handleChange}
                            placeholder="비밀번호 (8~16자 영문, 숫자, 특수문자 포함)"
                            required
                        />
                        {pwdMsg && (
                            <p style={{ 
                                fontSize: '12px', 
                                marginTop: '4px', 
                                color: isPwdValid ? '#2ecc71' : '#ff4757',
                                fontWeight: '500'
                            }}>
                                {pwdMsg}
                            </p>
                        )}
                    </div>
                    
                    {/* 3. 비밀번호 확인 (confirmPassword) */}
                    <InputField
                        label="비밀번호 확인"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        error={form.userPwd && form.confirmPassword && form.userPwd !== form.confirmPassword ? "비밀번호가 일치하지 않습니다." : null}
                        placeholder="비밀번호를 다시 입력하세요"
                        required
                    />
                    
                    {/* 4. 회원 이름 (USER_NAME) */}
                    <InputField
                        label="이름"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        placeholder="이름을 입력하세요"
                        required
                    />
                    
                    {/* 5. 닉네임 (NICKNAME) 💡 추가된 부분 */}
                    <div>
                        <InputField
                            label="닉네임"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            onBlur={handleNickBlur} // 💡 포커스가 나갈 때 실행
                            placeholder="2자 이상 입력하세요"
                            required
                        />
                        {nickMsg && (
                            <p style={{ 
                                fontSize: '12px', 
                                marginTop: '4px', 
                                color: isNickValid ? '#2ecc71' : '#ff4757',
                                fontWeight: '500'
                            }}>
                                {nickMsg}
                            </p>
                        )}
                    </div>

                    {/* 6. 생년월일 (BIRTH_DATE) */}
                    <InputField
                        label="생년월일"
                        type="date" 
                        name="birthDate"
                        value={form.birthDate}
                        onChange={handleChange}
                        required
                    />
                    
                    {/* 7. 성별 (GENDER) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontWeight: '600', color: 'var(--text)', fontSize: '14px' }}>성별</label>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={form.gender === 'M'}
                                    onChange={handleChange}
                                    required
                                /> 남성
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={form.gender === 'F'}
                                    onChange={handleChange}
                                    required
                                /> 여성
                            </label>
                        </div>
                    </div>
                    
                    {/* 8. 이메일 (EMAIL) */}
                    <EmailVerificationForm
                        email={form.email}
                        onChange={handleChange}
                        onVerified={(val) => setEmailVerified(val)}
                    />
                    
                    {/* 9. 전화번호 (PHONE) */}
                    <InputField
                        label="전화번호"
                        type="tel" 
                        name="phone"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="010-1234-5678"
                        required
                    />

                    {/* 10-1. 우편번호 및 주소 검색 버튼 */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <InputField
                            label="주소" 
                            name="postcode"
                            value={form.postcode}
                            onChange={handleChange}
                            placeholder="우편번호"
                            readOnly 
                            style={{ flexGrow: 1 }}
                            required
                        />
                        <PostCode onComplete={handleAddressSelect}/>
                    </div>
                    
                    {/* 10-2. 도로명 주소 (MAIN_ADDRESS) */}
                    <InputField
                        label=""
                        name="mainAddress"
                        value={form.mainAddress}
                        onChange={handleChange}
                        placeholder="기본 주소 (자동 입력)"
                        readOnly 
                        required
                    />
                    
                    {/* 10-3. 상세 주소 (DETAIL_ADDRESS) */}
                    <InputField
                        label=""
                        name="detailAddress"
                        value={form.detailAddress}
                        onChange={handleChange}
                        placeholder="상세 주소를 입력하세요"
                        required
                    />

                    {/* 11. 프로필 사진 섹션 */}
                    <div className="input-group">
                    <label style={{ fontWeight: '600', color: 'var(--text)', fontSize: '14px' }}>프로필 사진 (선택)</label>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* 가짜 입력창: 선택된 파일명을 보여주는 용도 */}
                        <input 
                            readOnly 
                            placeholder="선택된 파일 없음"
                            value={profileFile ? profileFile.name : ""}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                fontSize: '14px'
                            }}
                        />
                        
                        {/* 실제 클릭되는 그라데이션 버튼 */}
                        <label 
                            htmlFor="file-upload" 
                            style={{
                                padding: '12px 0px',
                                background: 'linear-gradient(to right, var(--accent, #f97316), var(--accent-strong, #ef4444))',
                                color: '#fff',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap', // 버튼 글자 줄바꿈 방지
                                minWidth: '100px',
                                textAlign: 'center'
                            }}
                        >
                            파일 선택
                        </label>
                        </div>
                        
                        <input 
                            id="file-upload" 
                            type="file" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                        />
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <SubmitButton isLoading={isLoading}>가입하기</SubmitButton>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '10px'}}>
                        <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '14px' }}>
                            이미 계정이 있으신가요? 로그인
                        </Link>
                    </div>

                </form>
            </AuthLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}

export default CreateMember;