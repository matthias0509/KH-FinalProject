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

export default function LoginPage() {

    return (
        <div className='app'>
            <Header />
                <AuthLayout title="로그인">
                    <form>
                        <InputField
                            label="아이디"
                            id="username"
                            placeholder="아이디"
                        />
                        <InputField
                            label="비밀번호"
                            type='password'
                            id="password"
                            placeholder="비밀번호"
                        />
                        <SubmitButton>로그인</SubmitButton>
                    </form>
                    <AuthLinkGroup />
                </AuthLayout>
            <AppFooter />
        </div>
    );

}