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

    // 💡 핵심 수정: 로그인 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            // AuthService.login 호출
            const response = await AuthService.login(user.userId, user.userPwd); 
            
            // 🚨 [수정 1] response가 null인지 먼저 확인 (로그인 실패 시 null이 올 수 있음)
            if (!response) {
                setMessage("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.");
                toast.error("로그인 실패");
                setIsLoading(false); // 로딩 끄기
                return; // 함수 종료
            }

            // 1. 응답값 확인
            // response가 객체({token:..., user:...})일 수도 있고, 그냥 토큰 문자열일 수도 있음
            // 안전하게 처리하기 위해 ?. 옵셔널 체이닝 사용
            const token = response.token || (typeof response === 'string' ? response : null);
            const userData = response.user; 

            if (token) {
                // 2. 토큰 저장
                localStorage.setItem("token", token);

                // 3. 사용자 정보 저장
                if (userData) {
                    localStorage.setItem("user", JSON.stringify(userData));
                }

                toast.info("로그인에 성공했습니다!");
                setCurrentUser(token);

                // 4. 페이지 새로고침
                window.location.href = "/"; 
                
            } else {
                // response는 왔지만 토큰이 없는 이상한 경우
                setMessage("로그인 응답에 토큰이 없습니다.");
            }
            
        } catch (error) {
            const errorMsg = error.response?.data || "서버와 통신 중 오류가 발생했습니다.";
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