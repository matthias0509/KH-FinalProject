import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import CSLayout from '../../components/CustomerService/CSLayout';

export default function NoticeDetailPage() {
    const { noticeNo } = useParams(); 
    const [notice, setNotice] = useState(null);
    const navigate = useNavigate();

    // 💡 1. 관리자 권한 확인
    const token = sessionStorage.getItem("loginUser");
    let isAdmin = false;
    if (token) {
        try {
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            isAdmin = payload.role === 'ADMIN';
        } catch (e) { console.error(e); }
    }

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/foodding/notice/detail/${noticeNo}`);
                setNotice(response.data);
            } catch (error) {
                console.error("상세보기 로딩 실패:", error);
                alert("존재하지 않는 게시글입니다.");
                navigate('/notice');
            }
        };
        fetchDetail();
    }, [noticeNo, navigate]);

    // 💡 2. 삭제 함수 추가
    const handleDelete = async () => {
        if (!window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) return;

        try {
            const response = await axios({
                url: 'http://localhost:8001/foodding/notice/delete',
                method: 'POST',
                data: { noticeNo: noticeNo }, // 💡 객체 형태로 전달
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data === "success") {
                alert("공지사항이 삭제되었습니다.");
                navigate('/notice');
            } else {
                alert("삭제 실패");
            }
        } catch (error) {
            console.error("삭제 에러:", error);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    if (!notice) return null;

    return (
        <div className="app">
            <Header />
            <CSLayout title="공지사항">
                <div className="notice-detail-container" style={{ padding: '20px' }}>
                    <div className="detail-header" style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px' }}>{notice.noticeTitle}</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '14px' }}>
                            <span>작성일: {notice.noticeCreateDate}</span>
                            <span>조회수: {notice.noticeView}</span>
                        </div>
                    </div>
                    
                    <div className="detail-content" style={{ minHeight: '300px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                        {notice.noticeContent}
                    </div>

                    <div style={{ marginTop: '50px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button onClick={() => navigate('/notice')} className="list-button">목록으로</button>
                        
                        {/* 💡 3. 관리자 전용 버튼 그룹 */}
                        {isAdmin && (
                            <>
                                <button 
                                    onClick={() => navigate(`/notice/edit/${noticeNo}`)} 
                                    className="list-button" 
                                    style={{ backgroundColor: '#4b5563' }}
                                >
                                    수정하기
                                </button>
                                <button 
                                    onClick={handleDelete} 
                                    className="list-button" 
                                    style={{ backgroundColor: '#ef4444' }}
                                >
                                    삭제하기
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </CSLayout>
            <AppFooter />
        </div>
    );
}