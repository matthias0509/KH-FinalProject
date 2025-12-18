import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * @param {string} email - 부모로부터 전달받은 이메일
 * @param {function} onVerified - 인증 성공 시 실행될 콜백 함수
 */
const EVerifyForm = forwardRef(({ email, onVerified }, ref) => {
    const [authCode, setAuthCode] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [timer, setTimer] = useState(180);
    const [isVerified, setIsVerified] = useState(false);
    const timerRef = useRef(null);

    // 💡 부모 컴포넌트에서 제어할 수 있도록 함수 노출
    useImperativeHandle(ref, () => ({
    sendCode: async () => {
        // 💡 발송 API를 쏘기 전, 즉시 UI를 활성화합니다.
        setIsSent(true); 
        
        try {
            // 실제 발송 통신 (이 시간이 흐르는 동안 부모는 로딩 중)
            await axios.post("http://localhost:8001/foodding/email/send", { email });
            setTimer(180);
            setIsVerified(false);
            return true;
        } catch (error) {
            console.error("발송 실패:", error);
            setIsSent(false); // 실패하면 다시 숨김
            return false;
        }
    }
}));

    // 타이머 로직
    useEffect(() => {
        if (isSent && timer > 0 && !isVerified) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isSent, timer, isVerified]);

    const handleVerifyCode = async () => {
        if (authCode.length < 6) {
            toast.warning("인증번호 6자리를 입력해주세요.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8001/foodding/email/verify", { 
                email, 
                code: authCode 
            });
            if (response.data === true || response.data === "success") {
                setIsVerified(true);
                onVerified(true);
                toast.success("이메일 인증에 성공했습니다.");
            } else {
                toast.error("인증번호가 일치하지 않습니다.");
            }
        } catch (error) {
            toast.error("인증 확인 중 오류가 발생했습니다.");
        }
    };

    const formatTime = () => {
        const mm = Math.floor(timer / 60);
        const ss = (timer % 60).toString().padStart(2, "0");
        return `${mm}:${ss}`;
    };

    if (!isSent) return null;

    return (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input
                        type="text"
                        placeholder="인증번호 6자리"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        maxLength={6}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '14px'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: timer < 60 ? 'red' : '#888',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        {formatTime()}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isVerified}
                    style={{
                        padding: '0 20px',
                        background: isVerified ? '#ccc' : 'linear-gradient(to right, #f97316, #ef4444)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isVerified ? 'default' : 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        minWidth: '100px'
                    }}
                >
                    {isVerified ? "인증완료" : "인증확인"}
                </button>
            </div>
            {isVerified && (
                <p style={{ color: '#2ecc71', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>
                    ✓ 이메일 인증이 완료되었습니다.
                </p>
            )}
        </div>
    );
});

export default EVerifyForm;