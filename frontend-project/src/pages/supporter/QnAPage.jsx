import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';


import '../../styles/MyPageLayout.css';
import '../../styles/QnA.css'; 

const QnAPage = () => {
    const navigate = useNavigate();

    const userInfo = {
        name: '푸딩러버',
        profileImg: '🍮',
        role: 'supporter'
    };

    const qnaList = [
        {
            id: 1,
            type: '배송',
            title: '배송지 변경 가능한가요? 이사 예정이라서요.',
            date: '2025.10.26',
            status: '답변대기',
            makerName: '푸딩공작소'
        },
        // ... (나머지 데이터 생략)
        { id: 2, type: '리워드', title: '옵션 변경 원해요.', date: '2025.10.20', status: '답변완료', makerName: '제주티룸' },
        { id: 3, type: '환불', title: '환불 절차 문의', date: '2025.10.15', status: '답변완료', makerName: '캠핑마스터' }
    ];

    return (
        <div className="page-wrapper">
            <Header />
            <div className="mypage-container">
                <Sidebar userInfo={userInfo} />

                <main className="main-content">
                    {/* 1. 페이지 제목만 남김 */}
                    <h2 className="page-title">나의 문의(Q&A)</h2>

                    {/* 2. [수정됨] 탭과 버튼을 한 줄에 배치하는 컨테이너 */}
                    <div className="filter-container">
                        {/* 왼쪽: 필터 탭 */}
                        <div className="filter-tabs">
                            <button className="filter-btn active">전체</button>
                            <button className="filter-btn">답변대기</button>
                            <button className="filter-btn">답변완료</button>
                        </div>

                        {/* 오른쪽: 문의하기 버튼 (여기로 이동) */}
                        <button className="write-btn">문의하기</button>
                    </div>

                    <div className="qna-list-container">
                        {qnaList.length > 0 ? (
                            qnaList.map((item) => (
                                <div key={item.id} className="qna-item">
                                    <div className="qna-header">
                                        <div className="qna-meta">
                                            <span className="qna-type">[{item.type}]</span>
                                            <span className="qna-maker">To. {item.makerName}</span>
                                        </div>
                                        <span className="qna-date">{item.date}</span>
                                    </div>
                                    <div className="qna-body">
                                        <h3 className="qna-title">
                                            <span className="lock-icon">🔒</span> {item.title}
                                        </h3>
                                        <span className={`qna-status ${item.status === '답변완료' ? 'done' : 'wait'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>등록된 문의가 없습니다.</p>
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