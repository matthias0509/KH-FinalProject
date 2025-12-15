import { useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import SubmitButton from '../../components/Login/SubmitButton';
import { useNavigate } from "react-router-dom";

function CreateMember() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChage = (e) => {
        setForm({...form, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: 회원가입 로직 구현

        if (form.password !== form.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            setIsLoading(false);
            return;
        }
        console.log('회원가입 시도:', form);

        setIsLoading(false);
        navigate('/login');
    };

    return(
        <div className="app">
            <Header />
                <AuthLayout title="회원가입">
                    <form style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                        <InputField
                    label="아이디"
                    id="username"
                    value={form.username}
                    onChange={handleChage}
                    placeholder="아이디를 입력하세요"
                />
                <InputField
                    label="비밀번호"
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={handleChage}
                    placeholder="비밀번호 (8자 이상)"
                />
                <InputField
                    label="비밀번호 확인"
                    type="password"
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChage}
                    error={form.password !== form.confirmPassword && form.confirmPassord ? "비밀번호가 일치하지 않습니다." : null}
                    placeholder="비밀번호를 다시 입력하세요"
                />
                 <InputField
                    label="이름"
                    id="name"
                    value={form.name}
                    onChange={handleChage}
                    placeholder="이름을 입력하세요"
                />
                <InputField
                    label="이메일"
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChage}
                    placeholder="이메일 주소"
                />

                <SubmitButton>가입하기</SubmitButton>
                    </form>
                </AuthLayout>
            <AppFooter />
        </div>
    )

}

export default CreateMember;