import { useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import SubmitButton from '../../components/Login/SubmitButton';


/* 
    받아야 할 정보 :

    생년월일
    성별
    이메일 (인증방식)
    핸드폰번호
    프로필
    우편번호 기본 상세
    닉네임
*/
function CreateMember() {

    return(
        <div className="app">
            <Header />
                <AuthLayout title="회원가입">
                    <form style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                        <InputField
                    label="아이디"
                    placeholder="아이디를 입력하세요"
                />
                <InputField
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호 (8자 이상)"
                />
                <InputField
                    label="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                />
                 <InputField
                    label="이름"
                    placeholder="이름을 입력하세요"
                />
                <InputField
                    label="이메일"
                    type="email"
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