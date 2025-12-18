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
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function FindIdPage() {
    const [step, setStep] = useState(0); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [foundId, setFoundId] = useState('');

    // 이름과 이메일 확인 요청
    const handleInitialSubmit = async (e) => {
        e.preventDefault();
        try {
            // 백엔드에 회원 확인 요청
            const response = await axios.post("http://localhost:8001/foodding/member/emailCheck", { 
                userName: name, 
                email: email 
            });

            if (response.data === "MATCH") {
                // 회원이 존재하면 Step 1(인증번호 입력)로 이동
                setStep(1);
                toast.success("인증번호가 발송되었습니다.");
            } else {
                toast.error("일치하는 회원 정보가 없습니다.");
            }
        } catch (error) {
            toast.error("서버 통신 중 오류가 발생했습니다.");
        }
    };

    // Step 1: 인증 성공 시 아이디 조회
    const handleVerificationSuccess = async () => {
    try {
        // 인증 성공 후 서버에 아이디 조회를 최종 요청
        const response = await axios.get("http://localhost:8001/foodding/member/findId", {
            params: { email: email }
        });
        
        setFoundId(response.data); // 서버에서 받아온 실제 아이디
        setStep(2);
    } catch (error) {
        toast.error("아이디를 불러오는 데 실패했습니다.");
    }
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