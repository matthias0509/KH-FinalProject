import {useState} from "react";
import CSLayout from '../../components/CustomerService/CSLayout';
import '../../pages/CustomerService/CSStyle.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import { useNavigate } from "react-router-dom";
import InquiryTypeSelect from "../../components/CustomerService/InquiryTypeSelect";
import InputField from "../../components/Login/InputField";
import SubmitButton from "../../components/Login/SubmitButton";
import axios from "axios";

export default function InquiryPage() {
    const [form, setForm] = useState({
        qnaTitle: '',    // 💡 VO 필드명과 일치시킴
        qnaContent: '',  // 💡 VO 필드명과 일치시킴
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        // id를 qnaTitle, qnaContent로 설정해야 함
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = sessionStorage.getItem("loginUser") || localStorage.getItem("token");
        if (!token) {
            alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
            navigate('/login');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios({
                url: 'http://localhost:8001/foodding/inquiry/insert',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}` // 💡 전달받은 인증 방식 적용
                },
                data: form
            });

            if (response.data === "success") {
                alert('문의가 성공적으로 접수되었습니다.');
                navigate(-1);
            } else {
                alert('접수 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('문의 접수 에러:', error);
            alert('인증이 만료되었거나 서버 통신 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <Header />
            <CSLayout title="1:1 문의하기">
                <form onSubmit={handleSubmit} className="inquiry-form">
                    {/* InquiryTypeSelect는 기존대로 사용 */}
                    
                    <InputField
                        label="제목"
                        id="qnaTitle" // 💡 VO 필드명과 일치
                        value={form.qnaTitle}
                        onChange={handleChange}
                        placeholder="문의 제목을 입력하세요"
                        required
                    />
                    
                    <div className="input-field-group">
                        <label htmlFor="qnaContent" className="textarea-label">내용</label>
                        <textarea
                            id="qnaContent" // 💡 VO 필드명과 일치
                            className="textarea-input"
                            value={form.qnaContent}
                            onChange={handleChange}
                            rows="10"
                            placeholder="문의 내용을 자세히 작성해 주세요."
                            required
                        />
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <SubmitButton isLoading={isLoading}>문의 접수하기</SubmitButton>
                    </div>
                </form>
            </CSLayout>
            <AppFooter />
        </div>
    );
}