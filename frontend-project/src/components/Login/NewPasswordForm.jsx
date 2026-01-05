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
    const [errorMsg, setErrorMsg] = useState('');
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    const handleInputFocus = () => {
        if (errorMsg) {
            setErrorMsg('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!pwdRegex.test(password)) {
            setErrorMsg("비밀번호는 영문자, 숫자, 특수문자를 포함한 8~16자여야 합니다.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true); // 1. 로딩 시작

        try {
            const response = await axios.post("http://localhost:8001/foodding/member/updatePassword", {
                userId: userId,
                userPwd: password 
            });

            if (response.data === "success") {
                toast.success("비밀번호가 성공적으로 변경되었습니다.");
                // 성공 시에는 onSuccess에서 페이지를 이동시키므로 
                // 여기서 로딩을 꺼주지 않아도 무방하지만 꺼주는 것이 안전합니다.
                setIsLoading(false); 
                onSuccess();
            } else if (response.data === "same") {
                // 💡 2. 동일 비밀번호 알림 후 로딩 해제
                setErrorMsg("이전과 동일한 비밀번호는 사용할 수 없습니다.");
                setIsLoading(false); 
            } else {
                toast.error("비밀번호 변경에 실패했습니다.");
                setIsLoading(false); 
            }
        } catch (error) {
            // 💡 3. 서버 에러 발생 시 로딩 해제
            toast.error("서버와 통신 중 오류가 발생했습니다.");
            setIsLoading(false); 
            console.error(error);
        }
        // tip: 각 조건문에서 setIsLoading(false)를 적기 번거롭다면 
        // try-catch 문 뒤에 .finally(() => setIsLoading(false))를 붙여도 됩니다.
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
                onFocus={handleInputFocus}
                placeholder="새 비밀번호"
                required
            />
            <InputField
                label="비밀번호 확인"
                type="password"
                id="confirmNewPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={handleInputFocus}
                placeholder="새 비밀번호 확인"
                error={password !== confirmPassword && confirmPassword ? "비밀번호가 일치하지 않습니다." : null}
                required
            />
            {errorMsg && (
                    <p style={{ 
                        color: '#ff4757', 
                        fontSize: '13px', 
                        marginTop: '-8px',
                        textAlign: 'left',
                        fontWeight: '500'
                    }}>
                        {errorMsg}
                    </p>
                )}
            <SubmitButton isLoading={isLoading}>비밀번호 변경</SubmitButton>
        </form>
        <ToastContainer />
        </div>
    );
}