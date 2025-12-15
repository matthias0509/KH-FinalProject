import { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

export default function NewPasswordForm({ username, onSuccess }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            setIsLoading(false);
            return;
        }

        // TODO: 서버에 username과 새 비밀번호를 전송하여 업데이트 요청
        console.log(`사용자 ${username}의 비밀번호 변경 요청`);

        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // 업데이트 성공 가정:
        onSuccess();
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: 'var(--muted, #6b7280)' }}>
                새로운 비밀번호를 입력해주세요. (사용자: {username})
            </p>
            <InputField
                label="새 비밀번호"
                type="password"
                id="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="새 비밀번호"
            />
            <InputField
                label="비밀번호 확인"
                type="password"
                id="confirmNewPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호 확인"
                error={password !== confirmPassword && confirmPassword ? "비밀번호가 일치하지 않습니다." : null}
            />
            <SubmitButton isLoading={isLoading}>비밀번호 변경</SubmitButton>
        </form>
    );
}