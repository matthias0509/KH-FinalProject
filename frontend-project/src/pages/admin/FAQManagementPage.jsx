import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/PuddingManagement.css'; // 관리자 공통 스타일 사용

// ===================================================
// FAQ 등록/수정 모달
// ===================================================
const FaqModal = ({ faq, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        faqNo: faq ? faq.faqNo : null,
        question: faq ? faq.question : '',
        answer: faq ? faq.answer : ''
    });

    const isEditMode = !!faq; // faq가 있으면 수정 모드

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!formData.question.trim() || !formData.answer.trim()) {
            alert("질문과 답변을 모두 입력해주세요.");
            return;
        }

        try {
            if (isEditMode) {
                // 수정
                await axios.put('http://localhost:8001/foodding/api/admin/faq/update', formData);
                alert("FAQ가 수정되었습니다.");
            } else {
                // 등록
                await axios.post('http://localhost:8001/foodding/api/admin/faq/add', formData);
                alert("FAQ가 등록되었습니다.");
            }
            onRefresh();
            onClose();
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{isEditMode ? 'FAQ 수정' : '새 FAQ 등록'}</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <label>질문 (Question)</label>
                    <input 
                        type="text" 
                        name="question" 
                        value={formData.question} 
                        onChange={handleChange} 
                        className="input-field" 
                        placeholder="자주 묻는 질문을 입력하세요"
                    />

                    <label style={{marginTop: '15px'}}>답변 (Answer)</label>
                    <textarea 
                        name="answer" 
                        value={formData.answer} 
                        onChange={handleChange} 
                        className="input-field area-field" 
                        style={{height: '150px'}}
                        placeholder="답변 내용을 입력하세요"
                    />
                </div>
                <div className="modal-footer-actions">
                    <button className="btn-save" onClick={handleSave}>
                        {isEditMode ? '수정 완료' : '등록 하기'}
                    </button>
                    <button className="btn-close-footer" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

// ===================================================
// FAQ 관리 메인 페이지
// ===================================================
const FAQManagementPage = () => {
    const [faqList, setFaqList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null); // 수정할 FAQ 객체

    // 목록 불러오기
    const fetchFaqs = async () => {
        try {
            const response = await axios.get('http://localhost:8001/foodding/api/admin/faq/list');
            setFaqList(response.data);
        } catch (error) {
            console.error("FAQ 로딩 실패:", error);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    // 등록 버튼 클릭
    const handleCreate = () => {
        setSelectedFaq(null);
        setIsModalOpen(true);
    };

    // 수정 버튼 클릭
    const handleEdit = (faq) => {
        setSelectedFaq(faq);
        setIsModalOpen(true);
    };

    // 삭제 버튼 클릭
    const handleDelete = async (faqNo) => {
        if (!window.confirm("정말 이 FAQ를 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:8001/foodding/api/admin/faq/delete/${faqNo}`);
            alert("삭제되었습니다.");
            fetchFaqs();
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="pudding-management-page">
            <div className="header-flex">
                <h2 className="page-title">❓ FAQ 관리</h2>
                <button className="btn-save" onClick={handleCreate} style={{width: 'auto', padding: '10px 20px'}}>
                    + FAQ 등록
                </button>
            </div>

            <div className="list-wrapper admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th width="8%">No</th>
                            <th width="40%">질문</th>
                            <th width="40%">답변 (요약)</th>
                            <th width="12%">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqList.length > 0 ? (
                            faqList.map((faq, index) => (
                                <tr key={faq.faqNo}>
                                    <td>{faqList.length - index}</td> {/* 역순 번호 표시 */}
                                    <td className="text-left" style={{fontWeight: 'bold'}}>{faq.question}</td>
                                    <td className="text-left">
                                        {faq.answer.length > 50 ? faq.answer.substring(0, 50) + '...' : faq.answer}
                                    </td>
                                    <td>
                                        <div style={{display:'flex', gap:'5px', justifyContent:'center'}}>
                                            <button className="btn-detail-small" onClick={() => handleEdit(faq)}>
                                                수정
                                            </button>
                                            <button 
                                                className="btn-detail-small" 
                                                style={{backgroundColor: '#ffebee', color: '#c62828'}}
                                                onClick={() => handleDelete(faq.faqNo)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="no-data">등록된 FAQ가 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 등록/수정 모달 */}
            {isModalOpen && (
                <FaqModal 
                    faq={selectedFaq} 
                    onClose={() => setIsModalOpen(false)} 
                    onRefresh={fetchFaqs} 
                />
            )}
        </div>
    );
};

export default FAQManagementPage;