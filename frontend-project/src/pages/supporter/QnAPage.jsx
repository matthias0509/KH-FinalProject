import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageLayout from '../../components/MyPageLayout'; // 🚨 Header, Sidebar 대신 이거 하나만 import!

import '../../styles/MyPageLayout.css';
import '../../styles/QnA.css';

const QnAPage = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]); 
    const [filteredList, setFilteredList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('전체'); 
    const [openId, setOpenId] = useState(null); 

    // 페이지네이션 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; 

    // ❌ 가짜 userInfo 삭제 (Layout이 처리함)

    const fetchInquiries = async () => {
        const token = localStorage.getItem('token'); // sessionStorage -> localStorage로 통일 권장
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios({
                url: 'http://localhost:8001/foodding/inquiry/list',
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            });
            setInquiries(response.data);
            setFilteredList(response.data);
        } catch (error) {
            console.error("문의 내역 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    useEffect(() => {
        let list = [];
        if (activeTab === '전체') {
            list = inquiries;
        } else if (activeTab === '답변대기') {
            list = inquiries.filter(item => !item.answerContent);
        } else if (activeTab === '답변완료') {
            list = inquiries.filter(item => item.answerContent);
        }
        setFilteredList(list);
        setCurrentPage(1); 
        setOpenId(null); 
    }, [activeTab, inquiries]);

    // 페이지네이션 계산 로직
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    const toggleDetail = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        // ✅ Layout으로 감싸기
        <MyPageLayout>
            <h2 className="page-title">나의 문의(Q&A)</h2>
            <br />

            <div className="filter-container">
                <div className="filter-tabs">
                    {['전체', '답변대기', '답변완료'].map((tab) => (
                        <button 
                            key={tab}
                            className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button className="write-btn" onClick={() => navigate('/inquiry')}>
                    문의하기
                </button>
            </div>

            <div className="qna-list-container">
                {loading ? (
                    <div className="empty-state"><p>로딩 중...</p></div>
                ) : currentItems.length > 0 ? (
                    <>
                        {currentItems.map((item) => (
                            <React.Fragment key={item.qnaNo}>
                                <div 
                                    className={`qna-item ${openId === item.qnaNo ? 'open' : ''}`} 
                                    onClick={() => toggleDetail(item.qnaNo)}
                                >
                                    <div className="qna-header">
                                        <div className="qna-meta">
                                            <span className="qna-type">[1:1 문의]</span>
                                        </div>
                                        <span className="qna-date">작성일: {item.qnaDate}</span>
                                    </div>
                                    <div className="qna-body">
                                        <h3 className="qna-title">
                                            <span className="lock-icon">🔒</span> {item.qnaTitle}
                                        </h3>
                                        <span className={`qna-status ${item.answerContent ? 'done' : 'wait'}`}>
                                            {item.answerContent ? "답변완료" : "답변대기"}
                                        </span>
                                    </div>
                                </div>

                                {openId === item.qnaNo && (
                                    <div className="qna-detail-expanded">
                                        <div className="user-question">
                                            <div className="qna-icon">Q</div>
                                            <div className="content-text">{item.qnaContent}</div>
                                        </div>
                                        <div className="admin-answer">
                                            <div className="qna-icon">A</div>
                                            <div className="content-text">
                                                {item.answerContent ? (
                                                    <>
                                                        <div className="answer-date">답변일: {item.answerDate}</div>
                                                        <div className="answer-body">{item.answerContent}</div>
                                                    </>
                                                ) : (
                                                    <p className="wait-msg">담당자가 확인 중입니다. 잠시만 기다려 주세요.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}

                        {/* 페이지네이션 UI */}
                        <div className="qna-pagination">
                            <button 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                &lt;
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i + 1}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button 
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                &gt;
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="empty-state">
                        <p>{activeTab} 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </MyPageLayout>
    );
};

export default QnAPage;