import { useState } from 'react';
import CSLayout from '../../components/CustomerService/CSLayout';
import InputField from '../../components/Login/InputField'; // 기존 InputField 재활용
import SubmitButton from '../../components/Login/SubmitButton'; // 기존 SubmitButton 재활용
import { useNavigate } from 'react-router-dom';
import './CSStyle.css'; // 공통 스타일 사용
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

export default function NoticeWritePage() {
    const [form, setForm] = useState({
        title: '',
        content: '',
        // 'author'는 백엔드에서 인증된 사용자 정보(관리자)를 통해 자동 처리되거나,
        // 필요하다면 여기에 추가할 수 있습니다.
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.content) {
            alert("제목과 내용을 모두 입력해 주세요.");
            return;
        }

        setIsLoading(true);
        console.log('--- 공지사항 작성 요청 데이터 ---');
        console.log(form);
        
        // TODO: 여기에 Spring Boot 백엔드 API 호출 로직 구현 (POST 요청)
        // 예: fetch('/api/admin/notices', { method: 'POST', body: JSON.stringify(form) });
        
        // API 통신 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        setIsLoading(false);
        
        // 성공 후 처리
        alert('공지사항이 성공적으로 등록되었습니다.');
        
        // 등록 후 공지사항 목록 페이지로 이동
        navigate('/cs/notice'); 
    };

    return (
        <div className="app">
            <Header />
                <CSLayout title="공지사항 작성">
                    <p style={{ marginBottom: '25px', color: '#666', textAlign: 'center' }}>
                        새로운 공지사항을 작성하여 사용자들에게 알립니다.
                    </p>

                    <form onSubmit={handleSubmit} className="notice-write-form">
                        
                        {/* 1. 제목 입력 */}
                        <InputField
                            label="제목"
                            id="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="공지사항 제목을 입력하세요"
                            required
                        />
                        
                        {/* 2. 내용 입력 (Textarea 스타일 적용) */}
                        <div className="input-field-group">
                            <label htmlFor="content" className="textarea-label">내용</label>
                            <textarea
                                id="content"
                                className="textarea-input" // InquiryPage에서 사용한 스타일 재활용
                                value={form.content}
                                onChange={handleChange}
                                rows="15" // 공지사항은 내용이 길 수 있어 행 수 증가
                                placeholder="공지사항 내용을 자세히 작성해 주세요."
                                required
                            />
                        </div>

                        {/* 3. 제출 버튼 (주황색 스타일) */}
                        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                            <SubmitButton isLoading={isLoading} style={{ flex: 1 }}>
                                등록하기
                            </SubmitButton>
                            <button 
                                type="button" 
                                className="cancel-button" // 회색 버튼 스타일 재활용
                                onClick={() => navigate('/notice')}
                                style={{ flex: 1 }}
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </CSLayout>
            <AppFooter />
        </div>
    );
}