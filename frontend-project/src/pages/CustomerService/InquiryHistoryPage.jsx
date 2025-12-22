import React, { useState, useEffect } from 'react';
import CSLayout from '../../components/CustomerService/CSLayout';
import './CSStyle.css'; 
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import axios from 'axios';

const STATUS_CLASS_MAP = {
    "접수 완료": "status-pending",
    "답변 완료": "status-complete",
};

export default function InquiryHistoryPage() {
    const [inquiries, setInquiries] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        const token = sessionStorage.getItem("loginUser");
        if (!token) return;

        try {
            const response = await axios({
                url: 'http://localhost:8001/foodding/inquiry/list',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // DB 컬럼명에 맞춰 데이터 매핑 (qnaTitle -> title 등)
            setInquiries(response.data);
        } catch (error) {
            console.error("문의 내역 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const toggleDetail = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="app">
            <Header />
            <CSLayout title="1:1 문의 내역">
                <div className="notice-list-container">
                    <table className="notice-table inquiry-table"> 
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>번호</th>
                                <th style={{ width: '60%' }}>제목</th>
                                <th style={{ width: '15%' }}>접수일</th>
                                <th style={{ width: '15%' }}>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4">로딩 중...</td></tr>
                            ) : inquiries.length > 0 ? (
                                inquiries.map((item) => (
                                    <React.Fragment key={item.qnaNo}>
                                        <tr className="inquiry-row" onClick={() => toggleDetail(item.qnaNo)}>
                                            <td>{item.qnaNo}</td>
                                            <td className="inquiry-title-cell">
                                                <div>
                                                    <span>{item.qnaTitle}</span>
                                                    {/* 필요한 경우 여기에 [비밀글] 아이콘 등 추가 가능 */}
                                                </div>
                                            </td>
                                            <td>{item.qnaDate}</td>
                                            <td className={item.answerContent ? "status-complete" : "status-pending"}>
                                                {item.answerContent ? "답변 완료" : "접수 완료"}
                                            </td>
                                        </tr>
                                        {openId === item.qnaNo && (
                                            <tr className="inquiry-detail-row">
                                                <td colSpan="4">
                                                    <InquiryDetail item={item} />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr><td colSpan="4" style={{ textAlign: 'center' }}>문의 내역이 없습니다.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CSLayout>
            <AppFooter />
        </div>
    );
}

const InquiryDetail = ({ item }) => (
    <div className="inquiry-detail-content" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <div className="user-question" style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#333' }}>📝 문의 내용</h3>
            <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{item.qnaContent}</p>
        </div>
        <div className="reply-answer" style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
            <h3 style={{ color: '#f97316' }}>💬 답변</h3>
            {item.answerContent ? (
                <>
                    <p className="detail-meta-date" style={{ fontSize: '12px', color: '#888' }}>답변일: {item.answerDate}</p>
                    <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{item.answerContent}</p>
                </>
            ) : (
                <p style={{ color: '#999', marginTop: '10px' }}>담당자가 확인 중입니다. 잠시만 기다려 주세요.</p>
            )}
        </div>
    </div>
);