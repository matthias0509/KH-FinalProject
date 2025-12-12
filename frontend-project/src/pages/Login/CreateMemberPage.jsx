import { useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import './Login.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import AuthLayout from '../../components/Login/AuthLayout';
import InputField from '../../components/Login/InputField';
import SubmitButton from '../../components/Login/SubmitButton';

// 해야하는 페이지 : 로그인, 회원가입, 아이디/비번찾기, 공지사항, 공지사항 세부조회, (문의사항, FAQ) 하셔야합니다....  
// + 공지사항 글 작성 페이지, 문의사항 글 작성 페이지 (질문) + 답변.
// 기능으로 회원가입, 로그인 (JWT), 아이디 비번찾기, 회원탈퇴, 비밀번호 변경 등등,,,,,

/* 
    받아야 할 정보 :

    아이디 - 중복검사
    생년월일
    성별
    이메일 (인증방식) - 인증버튼
    핸드폰번호
    프로필
    우편번호 기본 - 상세 ---> 다음 도로명 주소 api 쓰세요
    닉네임
*/

// 공지사항 밑에 페이징 처리 페이지당 8개. 8개 넘기면 페이징 처리 1 2 3 4..... 이전 다음 버튼

//* 혹시 과제 진행하면서 어려운 부분이 있으면 혼자 부담하지 말고 말씀해 주세요. 

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