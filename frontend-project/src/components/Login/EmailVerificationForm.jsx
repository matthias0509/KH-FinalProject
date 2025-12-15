import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

export default function EmailVerificationForm({ email, onSuccess }) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // TODO: 서버에 인증 코드 (code)와 이메일 (email)을 전송하여 확인 요청
        console.log('인증 코드 확인:', { email, code });

        await new Promise(resolve => setTimeout(resolve, 1000)); 

        if (code === '123456') { // 성공 가정
            onSuccess(email);
        } else {
            setError('인증 코드가 일치하지 않거나 만료되었습니다.');
        }
        
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: 'var(--muted, #6b7280)' }}>
                {email}로 발송된 인증 코드를 입력해주세요.
            </p>
            <InputField
                label="인증 코드"
                id="verificationCode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6자리 인증 코드를 입력하세요"
                error={error}
            />
            {/* 인증 코드가 만료되었을 경우 재전송 버튼 등을 추가할 수 있습니다. */}
            <SubmitButton isLoading={isLoading}>인증 확인</SubmitButton>
        </form>
    );
}