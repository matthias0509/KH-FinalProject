import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import '../../pages/Login/Login.css';
import EmailVerificationForm from '../../components/Login/EmailVerificationForm';
import InputField from '../../components/Login/InputField';
import AuthLayout from '../../components/Login/AuthLayout';
import SubmitButton from '../../components/Login/SubmitButton';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

export default function FindIdPage() {
    const [step, setStep] = useState(0); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [foundId, setFoundId] = useState('');

    // 이름과 이메일 확인 요청
    const handleInitialSubmit = async (e) => {
        e.preventDefault();
        console.log('이름/이메일 확인 요청:', { name, email });
        // TODO: 서버에서 이름/이메일 일치 확인 및 인증 코드 발송 요청
        
        // 성공 가정:
        setStep(1); 
    };

    // Step 1: 인증 코드 확인 성공
    const handleVerificationSuccess = (verifiedEmail) => {
        console.log('인증 성공:', verifiedEmail);
        
        // TODO: 서버에서 이메일을 통해 아이디 조회 요청
        
        // 아이디 조회 성공 가정:
        setFoundId('user***id'); // 실제 조회된 아이디
        setStep(2);
    };

    // Step 2: 결과 표시
    const FindIdResult = () => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>찾으시는 아이디는:</p>
            <h3 style={{ color: 'var(--accent, #f97316)', fontSize: '24px', fontWeight: 'bold' }}>{foundId}</h3>
            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Link to="/login" className="submit-button" style={{ textDecoration: 'none', width: 'auto' }}>로그인하기</Link>
                <Link to="/signup" className="submit-button" style={{ textDecoration: 'none', width: 'auto', opacity: 0.8 }}>회원가입</Link>
            </div>
        </div>
    );
    
    return (
        <div className="app">
            <Header />
                <AuthLayout title="아이디 찾기">
                    {step === 0 && (
                        <form onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <InputField label="이름" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="가입 시 등록한 이름" />
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
                    {step === 2 && <FindIdResult />}
                </AuthLayout>
            <AppFooter />
        </div>
    );
}