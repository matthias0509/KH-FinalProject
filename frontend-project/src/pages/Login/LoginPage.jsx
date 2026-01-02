import {useState, useEffect} from 'react';
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
    
    // 로그인 상태는 컴포넌트 내부에서 State로 관리 (sessionStorage의 JWT 상태)
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser()); 
    
    const [user, setUser] = useState({ userId: "", userPwd: "" }); // 사용자 입력 State
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        // 전달받은 state에 메시지가 있다면 토스트를 띄웁니다.
        if (location.state?.message) {
            toast.success(location.state.message);
            // 💡 중요: 페이지 새로고침 시 토스트가 또 뜨지 않게 state를 비워주는 것이 좋습니다.
            window.history.replaceState({}, document.title);
        }
    }, [location]);
    // 💡 1. 컴포넌트가 마운트되거나 상태가 변경될 때 로그인 상태 확인
    useEffect(() => {
        if (currentUser) {
            // 로그인 상태라면 메인 화면으로 이동
            navigate('/', { replace: true }); 
        }
    }, [currentUser, navigate]);

    // 💡 2. 입력 핸들러 (Index.jsx의 handleChange와 동일)
    const handleChange = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    // 💡 3. 로그인 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            const jwtToken = await AuthService.login(user.userId, user.userPwd);
            
            if (jwtToken) {
                toast.info("로그인에 성공했습니다!");
                
                // ❌ 이 줄을 제거하세요!
                // localStorage.setItem("token", jwtToken);
                
                // ✅ LoginService에서 이미 sessionStorage에 저장하므로 중복 저장 불필요
                setCurrentUser(jwtToken);
            } else {
                setMessage("아이디 또는 비밀번호를 확인해주세요.");
            }
            
        } catch (error) {
            setMessage("서버와 통신 중 오류가 발생했습니다.");
            console.error("로그인 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 💡 4. 로그아웃 기능 (다른 컴포넌트에서 AuthService.logout()을 직접 호출하도록 분리)
    // 이 페이지는 로그인 폼만 보여주므로, 로그아웃 버튼은 제거합니다.
    
    // 💡 5. 렌더링 분기 (이미 로그인된 경우, useEffect에서 리디렉션하므로 폼만 렌더링)
    
    // currentUser가 null이 아니면 useEffect에서 이미 '/'로 리디렉션하므로,
    // 이 컴포넌트가 렌더링되는 것은 '로그인 전' 상태일 때 뿐입니다.
    
    return (
        <div className='app'>
            <Header />
            <AuthLayout title="로그인">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    
                    <InputField
                        label="아이디"
                        id="userId"
                        name="userId" // name 속성 추가 (handleChange를 위해 필요)
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
                        name="userPwd" // name 속성 추가 (handleChange를 위해 필요)
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
                {/* 💡 AuthLinkGroup을 유지할지 여부는 프로젝트 구조에 따라 결정 */}
                <AuthLinkGroup /> 
            </AuthLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}