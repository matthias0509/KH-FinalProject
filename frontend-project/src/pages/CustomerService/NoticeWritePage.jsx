import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import CSLayout from '../../components/CustomerService/CSLayout';
import InputField from '../../components/Login/InputField';
import SubmitButton from '../../components/Login/SubmitButton';

export default function NoticeWritePage() {
    const [form, setForm] = useState({ noticeTitle: '', noticeContent: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios({
                url: 'http://localhost:8001/foodding/notice/write',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
                },
                data: form
            });
        
        if (response.data === "success") {
            alert('공지사항이 등록되었습니다.');
            navigate('/notice');
        } else if (response.data === "no_auth") {
            alert('권한이 없습니다. 관리자만 등록 가능합니다.');
        } else {
            alert('등록에 실패했습니다.');
        }
    } catch (error) {
        console.error('에러 발생:', error);
        alert('서버와 통신 중 오류가 발생했습니다.');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="app">
            <Header />
            <CSLayout title="공지사항 작성">
                <form onSubmit={handleSubmit} className="notice-write-form">
                    <InputField
                        label="제목"
                        id="noticeTitle"
                        value={form.noticeTitle}
                        onChange={handleChange}
                        placeholder="공지사항 제목을 입력하세요"
                    />
                    <div className="input-field-group" style={{ marginTop: '16px' }}>
                        <label htmlFor="content" className="textarea-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>내용</label>
                        <textarea
                            id="noticeContent"
                            className="textarea-input"
                            value={form.noticeContent}
                            onChange={handleChange}
                            rows="15"
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                            placeholder="공지사항 내용을 작성해 주세요."
                        />
                    </div>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                        <SubmitButton isLoading={isLoading} style={{ flex: 1 }}>등록하기</SubmitButton>
                        <button type="button" onClick={() => navigate('/cs/notice')} style={{ flex: 1, backgroundColor: '#ccc', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>취소</button>
                    </div>
                </form>
            </CSLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}