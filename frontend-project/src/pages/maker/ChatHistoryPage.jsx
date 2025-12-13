    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import Header from '../../components/Header';
    import AppFooter from '../../components/AppFooter';
    import Sidebar from '../../components/Sidebar'; // 공통 사이드바

    // 스타일 불러오기
    import '../../styles/MyPageLayout.css';
    import '../../styles/ChatHistory.css'; // ★ 새로 만들 스타일 파일

    const ChatHistoryPage = ({ userInfo }) => {
        const navigate = useNavigate();

        


        // 가상 데이터: 채팅방 목록
        const chatRooms = [
            {
                id: 1,
                makerName: '푸딩공작소',
                makerImg: 'https://via.placeholder.com/60',
                lastMessage: '안녕하세요! 문의주신 배송지 변경 처리되었습니다. 감사합니다.',
                date: '2025.10.25',
                unreadCount: 2, // 안 읽은 메시지 수
            },
            {
                id: 2,
                makerName: '제주티룸',
                makerImg: 'https://via.placeholder.com/60',
                lastMessage: '네, 리워드 옵션 변경 가능합니다. 상세 페이지를 확인해주세요.',
                date: '2025.10.20',
                unreadCount: 0,
            },
            {
                id: 3,
                makerName: '캠핑마스터',
                makerImg: 'https://via.placeholder.com/60',
                lastMessage: '죄송합니다. 해당 상품은 품절되어 재입고 일정이 미정입니다.',
                date: '2025.10.15',
                unreadCount: 0,
            }
        ];

        return (
            <div className="page-wrapper">
                <Header />
                <div className="mypage-container">
                    {/* 공통 사이드바 */}
                    <Sidebar userInfo={userInfo} />

                    {/* 메인 콘텐츠 */}
                    <main className="main-content">
                        <h2 className="page-title">1:1 채팅 내역 💬</h2>

                        <div className="chat-list-container">
                            {chatRooms.length > 0 ? (
                                chatRooms.map((chat) => (
                                    // 클릭 시 해당 채팅방 상세 페이지로 이동 (예: /chats/1)
                                    <div key={chat.id} className="chat-item" onClick={() => alert(`${chat.makerName}님과의 채팅방으로 이동합니다.`)}>
                                        <div className="chat-avatar-wrapper">
                                            <img src={chat.makerImg} alt={chat.makerName} className="chat-avatar" />
                                        </div>
                                        
                                        <div className="chat-content">
                                            <div className="chat-header">
                                                <span className="maker-name">{chat.makerName}</span>
                                                <span className="chat-date">{chat.date}</span>
                                            </div>
                                            <p className="last-message">{chat.lastMessage}</p>
                                        </div>

                                        {/* 안 읽은 메시지가 있으면 뱃지 표시 */}
                                        {chat.unreadCount > 0 && (
                                            <div className="unread-badge">{chat.unreadCount}</div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p>진행 중인 대화가 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
                <AppFooter />
            </div>
        );
    };

    export default ChatHistoryPage;