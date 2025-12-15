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
import PostCode from "../../components/Login/PostCode";

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
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        zonecode: '',
        address: '',
        detailAddress: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChage = (e) => {
        setForm({...form, [e.target.id]: e.target.value });
    };

    const handleAddressSelect = (data) => {
        setForm(prevForm => ({ // 💡 prevForm을 인수로 받아 사용하면 안전합니다.
            ...prevForm, // 1. 이전 상태를 모두 복사하여 유지합니다.
            // 2. 주소 관련 필드만 새로운 값으로 덮어씁니다.
            zonecode: data.zonecode,
            address: data.address,
            detailAddress: '' // 새 주소 찾았으므로 상세 주소 초기화
        }))
    }

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
                <label style={{ fontWeight: '600', color: 'var(--text)', fontSize: '14px', marginBottom: '0', display: 'block' }}>주소</label>
                        
                        {/* 1. 우편번호 및 주소 검색 버튼 */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <InputField
                                label="" // 레이블은 위에 통합했으므로 빈 문자열
                                id="zonecode"
                                value={form.zonecode}
                                onChange={handleChage}
                                placeholder="우편번호"
                                readOnly // 사용자가 직접 입력하지 못하게 막음
                                style={{ flexGrow: 1 }}
                            />
                            <PostCode onComplete={handleAddressSelect}/>
                        </div>
                        
                        {/* 2. 도로명 주소 (자동 입력) */}
                        <InputField
                            label=""
                            id="address"
                            value={form.address}
                            onChange={handleChage}
                            placeholder="도로명 주소 (자동 입력)"
                            readOnly // 사용자가 직접 입력하지 못하게 막음
                        />
                        
                        {/* 3. 상세 주소 (사용자 직접 입력) */}
                        <InputField
                            label=""
                            id="detailAddress"
                            value={form.detailAddress}
                            onChange={handleChage}
                            placeholder="상세 주소를 입력하세요"
                        />

                        <SubmitButton>가입하기</SubmitButton>
                    </form>
                </AuthLayout>
            <AppFooter />
        </div>
    )

}

export default CreateMember;