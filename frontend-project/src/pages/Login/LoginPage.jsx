import {useState} from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import AuthLinkGroup from '../../components/Login/AuthLinkGroup';
import SubmitButton from '../../components/Login/SubmitButton';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', { // 💡 백엔드 API 주소
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // DTO와 일치하는 데이터 전송
            });

            // 응답을 JSON 형식으로 변환
            const data = await response.json(); 

            if (response.ok && data.success) {
                // 🚀 로그인 성공 처리 
                alert(`로그인 성공! 환영합니다, ${data.name}님.`);
                // 토큰 저장 (Local Storage 등)
                localStorage.setItem('authToken', data.token); 
                // 메인 페이지로 이동
                navigate('/main'); 
            } else {
                // 🚨 로그인 실패 처리
                alert(`로그인 실패: ${data.message}`);
            }

        } catch (error) {
            alert('서버와 통신하는 중 오류가 발생했습니다.');
            console.error('Login Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='app'>
            <Header />
                <AuthLayout title="로그인">
                    <form>
                        <InputField
                            label="아이디"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력하세요"
                        />
                        <InputField
                            label="비밀번호"
                            type='password'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                        />
                        <SubmitButton isLoading={isLoading}>로그인</SubmitButton>
                    </form>
                    <AuthLinkGroup />
                </AuthLayout>
            <AppFooter />
        </div>
    );

}