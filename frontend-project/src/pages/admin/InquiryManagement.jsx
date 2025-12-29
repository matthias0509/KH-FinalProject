import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../CustomerService/InquiryAdmin.css'; 

export default function InquiryManagement() {
    const [inquiries, setInquiries] = useState([]);
    const [selectedIq, setSelectedIq] = useState(null);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    // 💡 필터 및 페이지네이션 상태
    const [showOnlyPending, setShowOnlyPending] = useState(false); // 미답변 필터
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 8개

    const token = sessionStorage.getItem("loginUser");

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8001/foodding/inquiry/list/admin', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInquiries(response.data);
        } catch (error) {
            toast.error("목록 로드 실패");
        } finally {
            setLoading(false);
        }
    };

    // 💡 필터링 로직
    const filteredInquiries = showOnlyPending 
        ? inquiries.filter(iq => !iq.answerContent) 
        : inquiries;

    // 💡 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

    const handleSelect = (iq) => {
        setSelectedIq(iq);
        setAnswer(iq.answerContent || '');
    };

    const handleSubmit = async () => {
        if (!answer.trim()) return toast.warn("답변 내용을 입력하세요.");
        try {
            const response = await axios.post('http://localhost:8001/foodding/inquiry/answer', 
                { qnaNo: selectedIq.qnaNo, answerContent: answer },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data === "success") {
                toast.success("답변 저장 완료");
                setSelectedIq(null);
                fetchInquiries();
            }
        } catch (error) {
            toast.error("저장 실패");
        }
    };

    return (
        <div className="inquiry-admin-container">
            <div className="inquiry-admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2>💬 1:1 문의 답변 관리</h2>
                    <p>사용자 문의를 확인하고 답변을 등록하세요.</p>
                </div>
                {/* 💡 미답변 필터 버튼 */}
                <button 
                    className={`filter-btn ${showOnlyPending ? 'active' : ''}`}
                    onClick={() => { setShowOnlyPending(!showOnlyPending); setCurrentPage(1); }}
                >
                    {showOnlyPending ? "전체 보기" : "미답변만 보기"}
                </button>
            </div>

            <div className="inquiry-admin-layout">
                <div className="inquiry-list-wrapper">
                    <table className="inquiry-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}>번호</th>
                                <th>문의 제목</th>
                                <th style={{ width: '100px' }}>상태</th>
                                <th style={{ width: '120px' }}>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(iq => (
                                <tr key={iq.qnaNo} onClick={() => handleSelect(iq)} className={selectedIq?.qnaNo === iq.qnaNo ? 'selected-row' : ''}>
                                    <td className="text-center">{iq.qnaNo}</td>
                                    <td className="text-left title-text">{iq.qnaTitle}</td>
                                    <td className="text-center">
                                        <span className={`status-badge ${iq.answerContent ? 'done' : 'pending'}`}>
                                            {iq.answerContent ? '완료' : '미답변'}
                                        </span>
                                    </td>
                                    <td className="text-center">{iq.qnaDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* 💡 페이지네이션 UI */}
                    <div className="admin-pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>이전</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>다음</button>
                    </div>
                </div>

                <div className="inquiry-detail-wrapper">
                    {selectedIq ? (
                        <div className="detail-panel">
                            {/* 상세 패널 헤더 */}
                            <div className="detail-panel-header">
                                <h3>문의 상세 정보</h3>
                            </div>

                            <div className="qna-section">
                                <div className="meta-info">
                                    <span><strong>번호:</strong> {selectedIq.qnaNo}</span>
                                    <span><strong>작성일:</strong> {selectedIq.qnaDate}</span>
                                </div>
                                <div className="qna-box">{selectedIq.qnaContent}</div>
                            </div>

                            <div className="qna-section">
                                <h4>답변 작성/수정</h4>
                                <textarea 
                                    className="answer-textarea" 
                                    value={answer} 
                                    onChange={(e) => setAnswer(e.target.value)} 
                                    placeholder="친절한 답변을 입력해 주세요."
                                />
                                <div className="qna-buttons">
                                    {/* 💡 답변 내용(answerContent)이 있으면 '수정하기', 없으면 '저장하기' */}
                                    <button className="btn-save" onClick={handleSubmit}>
                                        {selectedIq.answerContent ? "수정하기" : "저장하기"}
                                    </button>
                                    <button className="btn-close-new" onClick={() => setSelectedIq(null)}>
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-panel">
                            <p>목록에서 문의를 선택하면 상세 내용이 표시됩니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}