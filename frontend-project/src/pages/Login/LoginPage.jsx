import { useState, useEffect } from 'react';
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import AuthLinkGroup from '../../components/Login/AuthLinkGroup';
import SubmitButton from '../../components/Login/SubmitButton';
import { useNavigate, useLocation } from 'react-router-dom';
import * as AuthService from './LoginService';
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
    
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser()); 
    const [user, setUser] = useState({ userId: "", userPwd: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        if (currentUser) {
            navigate('/', { replace: true }); 
        }
    }, [currentUser, navigate]);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    // 💡 핵심 수정: 로그인 처리 함수 정리
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            // AuthService.login 호출
            const response = await AuthService.login(user.userId, user.userPwd);
            
            // 1. 응답이 아예 없는 경우 방어
            if (!response) {
                throw new Error("서버로부터 응답이 없습니다.");
            }

            const token = response.token || (typeof response === 'string' ? response : null);
            const userData = response.user; // 사용자 정보가 같이 오는 경우

            // 3. 토큰 존재 여부에 따른 처리
            if (token) {
                sessionStorage.setItem('loginUser', token);
                localStorage.setItem("token", token);

                // (2) 사용자 정보가 있다면 저장 (선택사항)
                if (userData) {
                    localStorage.setItem("user", JSON.stringify(userData));
                }

                toast.info("로그인에 성공했습니다!");
                
                // (3) 상태 업데이트 및 페이지 이동
                setCurrentUser(token);
                window.location.href = "/"; 
                
            } else {
                setMessage("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.");
                toast.info("로그인에 실패했습니다.");
            }
            
        } catch (error) {
            const errorMsg = error.response?.data || "서버와 통신 중 오류가 발생했습니다.";
            // 에러 메시지가 객체일 수도 있으므로 문자열 처리
            setMessage(typeof errorMsg === 'string' ? errorMsg : "로그인 중 오류 발생");
            console.error("로그인 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className='app'>
            <Header />
            <AuthLayout title="로그인">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    
                    <InputField
                        label="아이디"
                        id="userId"
                        name="userId"
                        value={user.userId}
                        onChange={handleChange}
                        placeholder="아이디를 입력하세요"
                        required
                    />
                    <br />
                    <InputField
                        label="비밀번호"
                        type='password'
                        id="userPwd"
                        name="userPwd"
                        value={user.userPwd}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        required
                    />
                    
                    {message && (
                        <div className="alert-error" style={{ color: 'red', textAlign: 'center' }}>
                            {message}
                        </div>
                    )}
                    <br />
                    <SubmitButton isLoading={isLoading}>로그인</SubmitButton>
                </form>
                <AuthLinkGroup /> 
            </AuthLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}
