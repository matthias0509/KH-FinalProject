import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import AppFooter from "../../components/AppFooter";
import InputField from "../../components/Login/InputField";
import SubmitButton from "../../components/Login/SubmitButton";
import CSLayout from "../../components/CustomerService/CSLayout";
import { toast, ToastContainer } from "react-toastify";

export default function NoticeEditPage() {
    const { noticeNo } = useParams(); // URL에서 수정할 공지 번호 가져오기
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        noticeNo: noticeNo,
        noticeTitle: '',
        noticeContent: '',
    });

    // 💡 1. 기존 데이터 불러오기
    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/foodding/notice/detail/${noticeNo}`);
                const { noticeTitle, noticeContent } = response.data;
                setForm(prev => ({ ...prev, noticeTitle, noticeContent }));
            } catch (error) {
                console.error("데이터 로딩 실패", error);
                alert("정보를 불러올 수 없습니다.");
                navigate("/notice");
            }
        };
        fetchNotice();
    }, [noticeNo, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    // 💡 2. 수정 요청 보내기
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios({
                url: 'http://localhost:8001/foodding/notice/update',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
                },
                data: form
            });

            if (response.data === "success") {
                navigate(`/notice/${noticeNo}`, {state: {message: '수정 완료'}}); // 수정 후 상세페이지로 이동
            } else {
                toast.error('수정에 실패했습니다. 다시 시도해주세요.'); 
            }
        } catch (error) {
            console.error('수정 에러:', error);
            alert('통신 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <Header />
            <CSLayout title="공지사항 수정">
                <form onSubmit={handleSubmit} className="inquiry-form">
                    <InputField
                        label="공지 제목"
                        id="noticeTitle"
                        value={form.noticeTitle}
                        onChange={handleChange}
                        required
                    />
                    <div className="input-field-group">
                        <label className="textarea-label">공지 내용</label>
                        <textarea
                            id="noticeContent"
                            className="textarea-input"
                            value={form.noticeContent}
                            onChange={handleChange}
                            rows="15"
                            required
                        />
                    </div>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                        <SubmitButton isLoading={isLoading}>수정완료</SubmitButton>
                        <button type="button" className="cancel-button" onClick={() => navigate(-1)} style={{ flex: 1 }}>
                            취소
                        </button>
                    </div>
                </form>
            </CSLayout>
            <AppFooter />
            <ToastContainer />
        </div>
    );
}