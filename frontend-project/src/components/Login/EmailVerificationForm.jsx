import React, { useState, useEffect, useRef, use } from "react";
import axios from "axios";
import InputField from "./InputField";
import { toast } from "react-toastify";

/**
 * @param {string} email - 부모(CreateMember)로부터 전달받은 이메일 값
 * @param {function} onVerified - 인증 성공 시 부모에게 성공 여부(true)를 전달하는 함수
 */
function EmailVerificationForm({ email, onChange ,onVerified }) {
    const [authCode, setAuthCode] = useState("");      // 사용자가 입력한 인증번호
    const [isSent, setIsSent] = useState(false);        // 인증번호 발송 여부
    const [timer, setTimer] = useState(180);            // 3분 타이머
    const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
    const timerRef = useRef(null);

    // 타이머 동작 로직
    useEffect(() => {
        if (isSent && timer > 0 && !isVerified) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 || isVerified) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isSent, timer, isVerified]);

    // 1. 인증번호 발송 (Spring Boot 컨트롤러로 요청)
    const handleSendCode = async () => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.warning("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        try {
            // 💡 백엔드 URL: /foodding/email/send (사용자님의 설정에 맞게 수정)
            await axios.post("http://localhost:8001/foodding/email/send", { email });
            setIsSent(true);
            setTimer(180); // 발송 시마다 3분 초기화
            setIsVerified(false);
            toast.success("인증번호가 발송되었습니다. 3분 이내에 입력해주세요.");
        } catch (error) {
            console.error("발송 실패:", error);
            toast.error("인증번호 발송에 실패했습니다. 이메일 주소를 다시 확인해주세요.");
        }
    };

    // 2. 인증번호 확인 (Spring Boot 컨트롤러로 검증 요청)
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

            // 백엔드에서 true 또는 "success"를 반환한다고 가정
            if (response.data === true || response.data === "success") {
                setIsVerified(true);
                onVerified(true); // 💡 부모(CreateMember)의 상태를 true로 변경
                toast.success("이메일 인증에 성공했습니다.");
            } else {
                toast.error("인증번호가 일치하지 않거나 만료되었습니다.");
            }
        } catch (error) {
            toast.error("인증 확인 중 오류가 발생했습니다.");
        }
    };

    // 0:00 형식으로 시간 표시
    const formatTime = () => {
        const mm = Math.floor(timer / 60);
        const ss = (timer % 60).toString().padStart(2, "0");
        return `${mm}:${ss}`;
    };

    return (
        <div style={{ marginBottom: '16px' }}>
            {/* 이메일 주소 표시 및 발송 버튼 */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                    <InputField
                        label="이메일"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        readOnly={isVerified} // 인증 완료 시 수정 불가
                        placeholder="example@email.com"
                    />
                </div>
                {!isVerified && (
                    <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={isVerified}
                        style={{
                            padding: '12px 16px',
                            height: '48px',
                            backgroundImage: 'linear-gradient(to right, var(--accent, #f97316), var(--accent-strong, #ef4444))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: isVerified ? 'default' : 'pointer',
                            fontWeight: '600',
                            fontSize: '16px'
                        }}
                    >
                        {isSent ? "재발송" : "인증번호 받기"}
                    </button>
                )}
            </div>

            {/* 인증번호 입력 필드 (발송된 후에만 등장) */}
            {isSent && !isVerified && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
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
                        style={{
                            padding: '0 20px',
                            background: 'linear-gradient(to right, var(--accent, #f97316), var(--accent-strong, #ef4444))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '16px'
                        }}
                    >
                        인증확인
                    </button>
                </div>
            )}

            {isVerified && (
                <p style={{ color: '#2ecc71', fontSize: '12px', marginTop: '8px', fontWeight: '600' }}>
                    ✓ 이메일 인증이 완료되었습니다.
                </p>
            )}
        </div>
    );
}

export default EmailVerificationForm;