import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../../pages/Login/Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import SubmitButton from '../../components/Login/SubmitButton';
import EVerifyForm from '../../components/Login/EVerifyForm';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function FindIdPage() {
    const [step, setStep] = useState(0); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [foundId, setFoundId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const verifyRef = useRef();

    // 💡 정보 확인 + 메일 발송 통합 핸들러
    const handleFindIdProcess = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        
        if (!name || !email) {
            setErrorMsg("이름과 이메일을 입력해주세요.");
            return;
        }

        setIsLoading(true); // "처리 중" 시작

        try {
            // 1. 이름/이메일 일치 확인
            const response = await axios.post("http://localhost:8001/foodding/member/emailCheck", { 
                userName: name, 
                email: email 
            });

            if (response.data === "MATCH") {
                // 💡 핵심: Step을 먼저 바꿉니다. (화면에는 아직 로딩창이 떠 있음)
                setStep(1);

                // 💡 리액트가 렌더링을 완료할 때까지 기다린 후 발송 시작
                // 발송이 끝날 때까지(await) 로딩창을 끄지 않습니다.
                await new Promise((resolve) => {
                    const checkRef = setInterval(async () => {
                        if (verifyRef.current) {
                            clearInterval(checkRef);
                            const result = await verifyRef.current.sendCode();
                            resolve(result);
                        }
                    }, 50); // ref가 잡힐 때까지 0.05초마다 체크
                });
                toast.info("인증번호가 이메일로 발송되었습니다.");

            } else {
                setErrorMsg("입력하신 정보와 일치하는 회원이 없습니다.");
            }
        } catch (error) {
            toast.error("통신 오류가 발생했습니다.");
        } finally {
            // 💡 모든 발송 과정이 끝난 후 (sendCode의 await가 풀린 후) 로딩 해제
            setIsLoading(false); 
        }
    };

    const handleVerificationSuccess = async () => {
        try {
            const response = await axios.get("http://localhost:8001/foodding/member/findId", {
                params: { email: email }
            });
            setFoundId(response.data);
            setStep(2);
        } catch (error) {
            toast.error("아이디 정보를 불러오지 못했습니다.");
        }
    };

    return (
        <div className="app">
            <Header />
            <AuthLayout title="아이디 찾기">
                {step === 0 && (
                    <form onSubmit={handleFindIdProcess} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <InputField label="이름" value={name} onChange={(e) => setName(e.target.value)} placeholder="가입 시 등록한 이름" />
                        <InputField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="가입 시 등록한 이메일" />
                        {errorMsg && <p style={{ color: '#ff4757', fontSize: '12px', marginTop: '-8px' }}>{errorMsg}</p>}
                        <SubmitButton isLoading={isLoading}>인증번호 받기</SubmitButton>
                    </form>
                )}

                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <InputField label="이름" value={name} readOnly />
                        <InputField label="이메일" value={email} readOnly />
                        <EVerifyForm ref={verifyRef} email={email} onVerified={handleVerificationSuccess} />
                    </div>
                )}

                {step === 2 && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p style={{ fontSize: '18px', marginBottom: '10px' }}>찾으시는 아이디는</p>
                        <h3 style={{ color: '#f97316', fontSize: '24px', fontWeight: 'bold' }}>{foundId}</h3>
                        <p style={{ fontSize: '18px', marginTop: '10px' }}>입니다.</p>
                        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <Link to="/login" className="submit-button" style={{ textDecoration: 'none', padding: '12px 20px' }}>로그인하기</Link>
                        </div>
                    </div>
                )}
            </AuthLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}