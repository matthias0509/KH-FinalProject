import { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewPasswordForm({ userId, onSuccess }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true); // 로딩 시작

        try {
            const response = await axios.post('http://localhost:8001/foodding/member/updatePassword', {
                userId: userId,
                userPwd: password
            });
            //console.log("비밀번호 변경 응답:", response.data);
            if (response.data === "success") {
                toast.success("비밀번호가 성공적으로 변경되었습니다.");
                onSuccess(); // 성공 콜백 실행
            }
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        } finally {
            // 💡 성공하든 실패하든 여기서 로딩을 끕니다. (중복 방지)
            setIsLoading(false); 
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: 'var(--muted, #6b7280)' }}>
                새로운 비밀번호를 입력해주세요.
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
        <ToastContainer />
        </div>
    );
}