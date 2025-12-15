import {useState} from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import AuthLinkGroup from '../../components/Login/AuthLinkGroup';
import SubmitButton from '../../components/Login/SubmitButton';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log('로그인 시도:', { username, password });

        setIsLoading(false);
        navigate('/');
    }

    return (
        <div className='app'>
            <Header />
                <AuthLayout title="로그인">
                    <form>
                        <InputField
                            label="아이디"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력하세요"
                        />
                        <InputField
                            label="비밀번호"
                            type='password'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                        />
                        <SubmitButton isLoading={isLoading}>로그인</SubmitButton>
                    </form>
                    <AuthLinkGroup />
                </AuthLayout>
            <AppFooter />
        </div>
    );

}