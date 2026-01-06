import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import '../../pages/Login/Login.css';
import EVerifyForm from '../../components/Login/EVerifyForm';
import InputField from '../../components/Login/InputField';
import AuthLayout from '../../components/Login/AuthLayout';
import SubmitButton from '../../components/Login/SubmitButton';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import NewPasswordForm from '../../components/Login/NewPasswordForm';
import axios from 'axios';
import { resolveApiUrl } from '../../utils/apiConfig';
import { toast, ToastContainer } from 'react-toastify';

export default function ResetPasswordPage() {
    // 0: 아이디/이메일 입력, 1: 인증 코드 확인, 2: 새 비밀번호 설정
    const [step, setStep] = useState(0); 
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const verifyRef = useRef();
    const navigate = useNavigate();


    // Step 0: 아이디와 이메일 확인 요청
    const handleCheckAndSend = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!userId || !email) {
            setErrorMsg("아이디와 이메일을 모두 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            // 아이디와 이메일 일치 확인 API 호출
            const response = await axios.post(resolveApiUrl('/member/idEmailCheck'), { 
                userId: userId, 
                email: email 
            });
            if (response.data === "MATCH") {
                setStep(1); // 인증 코드 입력 단계로 이동

                await new Promise((resolve) => {
                    setTimeout(async () => {
                        if (verifyRef.current) {
                            const result = await verifyRef.current.sendCode();
                            resolve(result);
                        }
                    }, 100); // ref가 잡힐 때까지 잠시 대기
                    toast.info("인증번호가 이메일로 발송되었습니다.");
                });
            } else {
                setErrorMsg("입력하신 아이디와 이메일이 일치하지 않습니다.");
            }
        } catch (error) {
            setErrorMsg("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificationSuccess = () => {
        setStep(2);
    };

    const handleResetSuccess = () => {
        navigate('/login', { state: { message: "비밀번호가 성공적으로 변경되었습니다." } });
    };
    
    return (
        <div className="app">
            <Header />
            <AuthLayout title="비밀번호 변경">
                {/* Step 0: 아이디/이메일 입력 */}
                {step === 0 && (
                    <form onSubmit={handleCheckAndSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ fontSize: '14px', color: '#666' }}>계정 보호를 위해 본인 인증을 진행해 주세요.</p>
                        <InputField label="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디를 입력하세요" />
                        <InputField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="가입 시 등록한 이메일" />
                        {errorMsg && <p style={{ color: '#ff4757', fontSize: '12px', marginTop: '-8px' }}>{errorMsg}</p>}
                        <SubmitButton isLoading={isLoading}>인증번호 받기</SubmitButton>
                    </form>
                )}

                {/* Step 1: 이메일 인증 진행 */}
                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <InputField label="아이디" value={userId} readOnly />
                        <InputField label="이메일" value={email} readOnly />
                        <EVerifyForm ref={verifyRef} email={email} onVerified={handleVerificationSuccess} />
                    </div>
                )}

                {/* Step 2: 새 비밀번호 설정 */}
                {step === 2 && (
                    <NewPasswordForm userId={userId} onSuccess={handleResetSuccess} />
                )}
            </AuthLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}
