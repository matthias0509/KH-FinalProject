import CustomerServiceLayout from "../../components/CustomerService/CSLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dummyNotices } from "./NoticeData";
import "../../pages/CustomerService/CSStyle.css";
import Header from "../../components/Header";
import AppFooter from "../../components/AppFooter";

export default function NoticeDetailPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        //fetch(`http://localhost:8080/api/notices/${id}`)

        const foundNotice = dummyNotices.find(n => n.id === parseInt(id));

        if(foundNotice) {
            setNotice(foundNotice);
            setIsLoading(false);
        }else{
            setError(true);
            setIsLoading(false);
        }
    }, [id]);

    if (isLoading) {
        return <CustomerServiceLayout title="공지사항 상세">
            <p>공지사항을 불러오는 중...</p>
        </CustomerServiceLayout>;
    }
    
    if(error || !notice) {
        return <CustomerServiceLayout title="공지사항 상세">
            <p style={{textAlign: 'center', color: 'red'}}>요청하신 공지사항을 찾을 수 없습니다.</p>
        </CustomerServiceLayout>;
    }

    return (
        <div className="app">
            <Header />
                <CustomerServiceLayout title="공지사항 상세">
                    <div className="notice-detail-container">
                        {/* 제목 영역 */}
                        <h2 className="detail-title">{notice.title}</h2>
                        <div className="detail-meta">
                            <span className="detail-date">작성일: {notice.date}</span>
                            <span className="detail-views">조회수: {notice.views}</span>
                        </div>
                        
                        {/* 내용 영역 */}
                        <div className="detail-content">
                            {/* 내용에 줄바꿈이 있는 경우를 대비해 <pre>나 스타일을 사용합니다. */}
                            <p style={{ whiteSpace: 'pre-wrap' }}>{notice.content}</p>
                        </div>

                        {/* 목록으로 돌아가기 버튼 */}
                        <div className="detail-footer">
                            <button 
                                className="list-button"
                                onClick={() => navigate('/notice')} // 공지사항 목록 페이지 경로
                            >
                                목록으로
                            </button>
                        </div>
                    </div>
                </CustomerServiceLayout>
            <AppFooter />
        </div>
    );
}