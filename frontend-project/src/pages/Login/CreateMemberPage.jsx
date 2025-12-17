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

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // 파일 선택시 실행될 핸들러
    const handleFileChange = (e) => {
        setProfileFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
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
        setIsLoading(true);

        if (form.userPwd !== form.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            setIsLoading(false);
            return;
        }
        
        // 💡 서버로 전송할 최종 회원가입 데이터
        const formData = new FormData();
        
        // 텍스트 데이터 추가
        formData.append('userId', form.userId);
        formData.append('userPwd', form.userPwd);
        formData.append('userName', form.userName);
        formData.append('nickname', form.nickname);
        formData.append('birthDate', form.birthDate);
        formData.append('gender', form.gender);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('postcode', form.postcode);
        formData.append('mainAddress', form.mainAddress);
        formData.append('detailAddress', form.detailAddress);

        try {
            const API_URL = "http://localhost:8001/foodding"; // 💡 백엔드 URL
            
            // 💡 이 부분이 API 요청을 수행하는 코드입니다.
            await axios.post(`${API_URL}/member/insert`, formData); 
            
            alert('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.');
            navigate('/login');
            
        } catch (error) {
            // 💡 서버 응답 에러 처리 구체화
            console.error('회원가입 실패 상세 정보:', error); 
            
            let errorMessage = '회원가입 처리 중 알 수 없는 오류가 발생했습니다.';
            
            // 400 Bad Request (잘못된 데이터 형식, 예: 중복된 아이디)
            if (error.response && error.response.status === 400) {
                // 서버에서 보낸 구체적인 에러 메시지가 있다면 사용
                errorMessage = error.response.data.message || '입력된 데이터에 문제가 있습니다. (아이디 중복 등)';
            } 
            // 500 Internal Server Error (서버 로직, DB 오류 등)
            else if (error.response && error.response.status === 500) {
                 errorMessage = '서버 내부에서 처리 오류가 발생했습니다. (관리자에게 문의)';
            } 
            // 네트워크 오류 (서버 연결 불가, CORS 등)
            else if (error.code === 'ERR_NETWORK') {
                errorMessage = '서버 연결에 실패했습니다. (서버 상태 확인 필요)';
            }
            
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="app">
            <Header />
            <AuthLayout title="회원가입">
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    
                    {/* 1. 아이디 (USER_ID) */}
                    <InputField
                        label="아이디"
                        name="userId" 
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="아이디를 입력하세요 (중복검사 필요)"
                        required
                    />
                    
                    {/* 2. 비밀번호 (USER_PWD) */}
                    <InputField
                        label="비밀번호"
                        type="password"
                        name="userPwd"
                        value={form.userPwd}
                        onChange={handleChange}
                        placeholder="비밀번호 (8자 이상)"
                        required
                    />
                    
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
                    <InputField
                        label="닉네임"
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        placeholder="닉네임을 입력하세요 (중복검사 필요)"
                        required
                    />

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
                    <InputField
                        label="이메일"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="이메일 주소 (인증 필요)"
                        required
                    />
                    
                    {/* 9. 전화번호 (PHONE) */}
                    <InputField
                        label="전화번호"
                        type="tel" 
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="010-XXXX-XXXX 형식"
                        required
                    />

                    {/* 10. 주소 섹션 (POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS) */}
                    <label style={{ fontWeight: '600', color: 'var(--text)', fontSize: '14px', marginBottom: '0', display: 'block' }}>주소</label>
                    
                    {/* 10-1. 우편번호 및 주소 검색 버튼 */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <InputField
                            label="" 
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

                    {/* 11. 프로필 사진 (ORIGIN_PROFILE, MODIFY_PROFILE) 💡 추가된 부분 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontWeight: '600', color: 'var(--text)', fontSize: '14px' }}>프로필 사진 (선택)</label>
                        <input
                            type="file"
                            name="upfile" // 서버에서 파일을 받는 이름
                            accept="image/*" // 이미지 파일만 선택 가능하도록 제한
                            onChange={handleFileChange}
                        />
                        {profileFile && (
                            <p style={{ fontSize: '12px', color: 'gray' }}>선택된 파일: {profileFile.name}</p>
                        )}
                    </div>

                    <SubmitButton isLoading={isLoading}>가입하기</SubmitButton>
                    
                    <div style={{textAlign: 'center', marginTop: '10px'}}>
                        <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '14px' }}>
                            이미 계정이 있으신가요? 로그인
                        </Link>
                    </div>

                </form>
            </AuthLayout>
            <AppFooter />
        </div>
    );
}

export default CreateMember;