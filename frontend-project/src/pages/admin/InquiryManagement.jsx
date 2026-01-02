import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../CustomerService/InquiryAdmin.css'; 

export default function InquiryManagement() {
    const [inquiries, setInquiries] = useState([]);
    const [selectedIq, setSelectedIq] = useState(null);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOnlyPending, setShowOnlyPending] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const token = sessionStorage.getItem("loginUser");

    useEffect(() => {
        fetchInquiries();
    }, []);

    // 💡 모달이 열릴 때 배경 스크롤 방지
    useEffect(() => {
        if (selectedIq) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedIq]);

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

    const filteredInquiries = showOnlyPending 
        ? inquiries.filter(iq => !iq.answerContent) 
        : inquiries;

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
                <button 
                    className={`filter-btn ${showOnlyPending ? 'active' : ''}`}
                    onClick={() => { setShowOnlyPending(!showOnlyPending); setCurrentPage(1); }}
                >
                    {showOnlyPending ? "전체 보기" : "미답변만 보기"}
                </button>
            </div>

            <div className="inquiry-admin-full-layout">
                <table className="inquiry-table">
                    <thead>
                        <tr>
                            <th style={{ width: '60px' }}>번호</th>
                            <th style={{ width: '120px' }}>작성자</th>
                            <th>문의 제목</th>
                            <th style={{ width: '100px' }}>상태</th>
                            <th style={{ width: '150px' }}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(iq => (
                            <tr key={iq.qnaNo} onClick={() => handleSelect(iq)} className="admin-row-hover">
                                <td className="text-center">{iq.qnaNo}</td>
                                <td className="text-center">{iq.userName}</td> {/* 💡 이름 필드 */}
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

            {/* 💡 답변 모달창 구현 */}
            {selectedIq && (
                <div className="inquiry-modal-overlay" onClick={() => setSelectedIq(null)}>
                    <div className="inquiry-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>문의 상세 및 답변 등록</h3>
                            <button className="close-x" onClick={() => setSelectedIq(null)}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="qna-info-grid">
                                <div><strong>작성자:</strong> {selectedIq.userName}</div>
                                <div><strong>작성일:</strong> {selectedIq.qnaDate}</div>
                                <div className="full-width"><strong>제목:</strong> {selectedIq.qnaTitle}</div>
                            </div>
                            
                            <div className="qna-section">
                                <label>문의 내용</label>
                                <div className="qna-box-content">{selectedIq.qnaContent}</div>
                            </div>

                            <div className="qna-section">
                                <label>관리자 답변</label>
                                <textarea 
                                    className="answer-textarea-modal" 
                                    value={answer} 
                                    onChange={(e) => setAnswer(e.target.value)} 
                                    placeholder="답변 내용을 입력해 주세요."
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-save-modal" onClick={handleSubmit}>
                                {selectedIq.answerContent ? "답변 수정" : "답변 등록"}
                            </button>
                            <button className="btn-cancel-modal" onClick={() => setSelectedIq(null)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}