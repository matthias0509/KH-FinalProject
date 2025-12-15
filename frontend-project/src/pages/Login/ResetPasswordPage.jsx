import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import '../../pages/Login/Login.css';
import EmailVerificationForm from '../../components/Login/EmailVerificationForm';
import InputField from '../../components/Login/InputField';
import AuthLayout from '../../components/Login/AuthLayout';
import SubmitButton from '../../components/Login/SubmitButton';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import NewPasswordForm from '../../components/Login/NewPasswordForm';

export default function ResetPasswordPage() {
    // 0: 아이디/이메일 입력, 1: 인증 코드 확인, 2: 새 비밀번호 설정
    const [step, setStep] = useState(0); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Step 0: 아이디와 이메일 확인 요청
    const handleInitialSubmit = async (e) => {
        e.preventDefault();
        console.log('계정 확인 요청:', { username, email });
        // TODO: 서버에서 아이디/이메일 일치 확인 및 인증 코드 발송 요청
        
        // 성공 가정:
        setStep(1); 
    };

    // Step 1: 인증 코드 확인 성공
    const handleVerificationSuccess = (verifiedEmail) => {
        console.log('인증 성공:', verifiedEmail);
        setStep(2);
    };

    // Step 2: 새 비밀번호 설정 성공
    const handlePasswordChangeSuccess = () => {
        alert('비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
    };
    
    return (
        <div className="app">
            <Header />
                <AuthLayout title="비밀번호 변경">
                    {step === 0 && (
                        <form onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <InputField label="아이디" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="아이디를 입력하세요" />
                            <InputField label="이메일" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="가입 시 등록한 이메일" />
                            <SubmitButton>인증 코드 받기</SubmitButton>
                        </form>
                    )}
                    {step === 1 && (
                        <EmailVerificationForm 
                            email={email}
                            onSuccess={handleVerificationSuccess}
                        />
                    )}
                    {step === 2 && (
                        <NewPasswordForm 
                            username={username}
                            onSuccess={handlePasswordChangeSuccess}
                        />
                    )}
                </AuthLayout>
        <AppFooter />
    </div>
    );
}