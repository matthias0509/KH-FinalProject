import {useState} from "react";
import CSLayout from '../../components/CustomerService/CSLayout';
import '../../pages/CustomerService/CSStyle.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import { useNavigate } from "react-router-dom";
import InquiryTypeSelect from "../../components/CustomerService/InquiryTypeSelect";
import InputField from "../../components/Login/InputField";
import SubmitButton from "../../components/Login/SubmitButton";

export default function InquiryPage() {
    const [form, setForm] = useState({
        inquiryType: '',
        title: '',
        content: '',
        contactEmail: '', // 답변 받을 이메일
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.inquiryType) {
            alert("문의 유형을 선택해 주세요.");
            return;
        }

        setIsLoading(true);
        console.log('1:1 문의 제출 데이터:', form);

        // TODO: 여기에 Spring Boot 백엔드 API 호출 로직 구현
        // fetch('/api/inquiry', { method: 'POST', body: JSON.stringify(form) });

        // API 통신 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        setIsLoading(false);
        
        // 성공 후 처리
        alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        navigate('/cs/faq'); // FAQ 페이지로 이동하거나, 문의 확인 페이지로 이동
    };

    return (
        <div className="app">
            <Header />
                <CSLayout title="1:1 문의하기">
                    <p style={{ marginBottom: '25px', color: '#666', textAlign: 'center' }}>
                        궁금한 점을 자세히 남겨주시면, 담당자가 확인 후 답변드리겠습니다.
                    </p>

                    <form onSubmit={handleSubmit} className="inquiry-form">
                        
                        {/* 1. 문의 유형 선택 (새 컴포넌트) */}
                        <InquiryTypeSelect 
                            value={form.inquiryType} 
                            onChange={handleChange} 
                        />

                        {/* 2. 제목 입력 */}
                        <InputField
                            label="제목"
                            id="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="문의 제목을 입력하세요"
                            required
                        />
                        
                        {/* 3. 내용 입력 (Textarea 스타일 적용) */}
                        <div className="input-field-group">
                            <label htmlFor="content" className="textarea-label">내용</label>
                            <textarea
                                id="content"
                                className="textarea-input"
                                value={form.content}
                                onChange={handleChange}
                                rows="10"
                                placeholder="문의 내용을 자세히 작성해 주세요."
                                required
                            />
                        </div>

                        {/* 4. 회신 이메일 (선택 사항) */}
                        <InputField
                            label="회신 이메일 주소 (선택)"
                            type="email"
                            id="contactEmail"
                            value={form.contactEmail}
                            onChange={handleChange}
                            placeholder="답변 받을 이메일 주소"
                        />

                        {/* 5. 제출 버튼 (주황색 스타일 활용) */}
                        <div style={{ marginTop: '30px' }}>
                            <SubmitButton isLoading={isLoading}>문의 접수하기</SubmitButton>
                        </div>
                    </form>
                </CSLayout>
            <AppFooter />
        </div>
    );
}