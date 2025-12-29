import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';

import '../../styles/MyPageLayout.css';
import '../../styles/QnA.css';

const QnAPage = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]); // 전체 데이터
    const [filteredList, setFilteredList] = useState([]); // 화면에 보일 데이터
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('전체'); // 필터 상태
    const [openId, setOpenId] = useState(null); // 토글 상태

    // 임시 사용자 정보 (Sidebar용)
    const userInfo = {
        name: '푸딩러버',
        profileImg: '🍮',
        role: 'supporter'
    };

    // 1. DB 데이터 불러오기
    const fetchInquiries = async () => {
        const token = sessionStorage.getItem("loginUser");
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
            setFilteredList(response.data); // 초기값은 전체 리스트
        } catch (error) {
            console.error("문의 내역 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    // 2. 탭 필터링 로직
    useEffect(() => {
        if (activeTab === '전체') {
            setFilteredList(inquiries);
        } else if (activeTab === '답변대기') {
            setFilteredList(inquiries.filter(item => !item.answerContent));
        } else if (activeTab === '답변완료') {
            setFilteredList(inquiries.filter(item => item.answerContent));
        }
        setOpenId(null); // 탭 변경 시 열려있던 상세창 닫기
    }, [activeTab, inquiries]);

    // 상세 토글 함수
    const toggleDetail = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                <Sidebar userInfo={userInfo} />

                <main className="main-content">
                    <h2 className="page-title">나의 문의(Q&A)</h2>

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
                        ) : filteredList.length > 0 ? (
                            filteredList.map((item) => (
                                <React.Fragment key={item.qnaNo}>
                                    {/* 문의 아이템 상단 */}
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

                                    {/* 토글되는 상세 내용 영역 */}
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
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>{activeTab} 내역이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <AppFooter />
        </div>
    );
};

export default QnAPage;