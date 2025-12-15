import React, { useState, useEffect } from 'react';
import CSLayout from '../../components/CustomerService/CSLayout';
import './CSStyle.css'; 
import { dummyInquiries, INQUIRY_TYPE_MAP } from './InquiryData'; // 더미 데이터 import
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

// 상태별 클래스 매핑
const STATUS_CLASS_MAP = {
    "접수 완료": "status-pending",
    "답변 완료": "status-complete",
};

export default function InquiryHistoryPage() {
    const [inquiries, setInquiries] = useState([]);
    const [openId, setOpenId] = useState(null); // 펼쳐진 상세 내역 ID

    useEffect(() => {
        // 💡 실제 환경에서는 로그인된 사용자의 문의 내역을 API로 불러와야 합니다.
        // 예: fetch('/api/user/inquiries', { headers: { 'Authorization': `Bearer ${token}` } });
        
        // 더미 데이터 로드
        setInquiries(dummyInquiries);
    }, []);

    const toggleDetail = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="app">
            <Header />
                <CSLayout title="1:1 문의 내역">
                    <div className="notice-list-container"> {/* notice-list-container 스타일 재활용 */}
                        <table className="notice-table inquiry-table"> 
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>번호</th>
                                    <th style={{ width: '15%' }}>유형</th>
                                    <th style={{ width: '45%' }}>제목</th>
                                    <th style={{ width: '15%' }}>접수일</th>
                                    <th style={{ width: '15%' }}>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.length > 0 ? (
                                    inquiries.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr 
                                                className="inquiry-row" 
                                                onClick={() => toggleDetail(item.id)}
                                            >
                                                <td>{item.id}</td>
                                                <td>{INQUIRY_TYPE_MAP[item.type] || item.type}</td>
                                                <td className="inquiry-title-cell">
                                                    {item.title}
                                                </td>
                                                <td>{item.date}</td>
                                                <td className={STATUS_CLASS_MAP[item.status]}>
                                                    {item.status}
                                                </td>
                                            </tr>
                                            
                                            {/* 상세 내역 (답변 포함) */}
                                            {openId === item.id && (
                                                <tr className="inquiry-detail-row">
                                                    <td colSpan="5">
                                                        <InquiryDetail item={item} />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>문의 내역이 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CSLayout>
            <AppFooter />
        </div>
    );
}

// 상세 내용을 보여주는 서브 컴포넌트
const InquiryDetail = ({ item }) => (
    <div className="inquiry-detail-content">
        <div className="user-question">
            <h3>📝 문의 내용</h3>
            <p className="detail-meta-date">접수일: {item.date}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}>{item.content}</p>
        </div>

        <div className="reply-answer">
            <h3>💬 답변</h3>
            {item.replyContent ? (
                <>
                    <p className="detail-meta-date">답변일: {item.replyDate}</p>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{item.replyContent}</p>
                </>
            ) : (
                <p style={{ color: '#f97316', fontWeight: 'bold' }}>
                    접수되었습니다. 담당자가 확인 후 빠른 시일 내에 답변드릴 예정입니다.
                </p>
            )}
        </div>
    </div>
);