import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AppFooter from '../../components/AppFooter';
import '../../styles/ChatListPage.css';

const API_BASE_URL = 'http://localhost:8001/foodding';
const SERVER_URL = "http://localhost:8001/foodding";
const UPLOAD_PATH = "/uploads/";

// 🔥 프로필 이미지 URL 처리 함수 추가
const getFullImageUrl = (filename) => {
  if (!filename || filename === "null") return "https://placehold.co/80x80?text=User";
  if (filename.startsWith("http")) return filename;
  return `${SERVER_URL}${UPLOAD_PATH}${filename}`;
};

const ChatListPage = ({ isMaker }) => {
  const navigate = useNavigate();
  const [chatRooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserNo, setCurrentUserNo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  useEffect(() => {
    console.log(`현재 모드: ${isMaker ? '메이커(판매자)' : '서포터(구매자)'}`);
  }, [isMaker]);

  // 사용자 정보 로드
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('❌ 토큰 없음 - 로그인 페이지로 이동');
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        setUserInfoLoading(false);
        return;
      }

      try {
        console.log('📡 [ChatListPage] 사용자 정보 API 호출 시작...');
        const response = await axios.get(`${API_BASE_URL}/api/mypage/info`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ [ChatListPage] 사용자 정보 로드 성공:', response.data);
        setUserInfo(response.data);
        setUserInfoLoading(false);
      } catch (error) {
        console.error('❌ 사용자 정보 로딩 실패:', error);
        
        if (error.response && error.response.status === 401) {
          alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('사용자 정보를 불러올 수 없습니다.');
        }
        setUserInfoLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // 채팅방 목록 로드
  useEffect(() => {
    if (userInfoLoading || !userInfo) {
      console.log('⏳ userInfo 로딩 대기 중...');
      return;
    }

    console.log('🔵 채팅방 목록 로드 시작');
    
    const loadChatrooms = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('로그인이 필요합니다');
        setLoading(false);
        return;
      }
      
      try {
        let userNo = userInfo.userNo || userInfo.USER_NO;
        
        if (!userNo) {
          try {
            const parts = token.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              userNo = payload.userNo || payload.sub || payload.id || payload.user_no || payload.USER_NO;
            }
          } catch (jwtError) {
            console.warn('⚠️ JWT 파싱 실패:', jwtError.message);
          }
        }
        
        if (!userNo) {
          setError('사용자 정보를 확인할 수 없습니다');
          setLoading(false);
          return;
        }
        
        console.log('👤 현재 사용자 번호:', userNo);
        setCurrentUserNo(userNo);
        
        const response = await axios.get(`${API_BASE_URL}/chat/rooms`, {
          params: { userNo }
        });
        
        if (Array.isArray(response.data)) {
          // 🔥 프로필 이미지 URL 처리
          const roomsWithFixedAvatars = response.data.map(room => ({
            ...room,
            OTHER_USER_AVATAR: getFullImageUrl(room.OTHER_USER_AVATAR)
          }));
          
          setChatrooms(roomsWithFixedAvatars);
          console.log(`📋 전체 채팅방 ${roomsWithFixedAvatars.length}개 로드 완료`);
          
          // 디버깅: 프로필 이미지 URL 확인
          console.log('🖼️ 프로필 이미지 URL 확인:');
          roomsWithFixedAvatars.forEach(room => {
            console.log(`- ${room.OTHER_USER_NAME}: ${room.OTHER_USER_AVATAR}`);
          });
        } else {
          setChatrooms([]);
        }
      } catch (error) {
        console.error('❌ 채팅방 목록 로딩 실패:', error);
        
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('채팅 목록을 불러오지 못했습니다');
          setChatrooms([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadChatrooms();
  }, [userInfo, userInfoLoading, navigate]);

  const handleChatroomClick = async (chatroom) => {
    if (!currentUserNo) {
        alert('사용자 정보를 불러오지 못했습니다');
        return;
    }

    const buyerNo = chatroom.BUYER;
    const sellerNo = chatroom.SELLER;
    
    try {
        await axios.post(`${API_BASE_URL}/chat/messages/read`, null, {
            params: {
                chatroomNo: chatroom.CHATROOM_NO,
                userNo: currentUserNo
            }
        });
        
        const response = await axios.get(`${API_BASE_URL}/chat/rooms`, {
            params: { userNo: currentUserNo }
        });
        if (Array.isArray(response.data)) {
            // 🔥 새로고침 시에도 URL 처리
            const roomsWithFixedAvatars = response.data.map(room => ({
              ...room,
              OTHER_USER_AVATAR: getFullImageUrl(room.OTHER_USER_AVATAR)
            }));
            setChatrooms(roomsWithFixedAvatars);
        }
    } catch (error) {
        console.error('❌ 읽음 처리 실패:', error);
    }
    
    const width = 400;
    const height = 650;
    const left = window.screen.width - width - 100;
    const top = (window.screen.height - height) / 2;

    const chatWindow = window.open(
        `/chat`,
        'ChatWindow',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
    );

    if (chatWindow) {
        setTimeout(() => {
            chatWindow.postMessage(
                {
                    type: 'CREATOR_DATA',
                    creator: {
                        name: chatroom.OTHER_USER_NAME || '사용자',
                        avatar: chatroom.OTHER_USER_AVATAR || 'https://placehold.co/80x80?text=User'
                    },
                    buyerNo: buyerNo,
                    sellerNo: sellerNo,
                    currentUserNo: currentUserNo
                },
                window.location.origin
            );
        }, 500);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return '방금 전';
      if (diffMins < 60) return `${diffMins}분 전`;
      if (diffHours < 24) return `${diffHours}시간 전`;
      if (diffDays < 7) return `${diffDays}일 전`;
      return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  const filteredChatrooms = chatRooms.filter(chatroom => {
    const matchesSearch = chatroom.OTHER_USER_NAME?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!currentUserNo) return matchesSearch;

    let matchesMode = true;
    if (isMaker) {
        matchesMode = (chatroom.SELLER == currentUserNo);
    } else {
        matchesMode = (chatroom.BUYER == currentUserNo);
    }

    return matchesSearch && matchesMode;
  });

  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-container">
        <Sidebar userInfo={userInfo} loading={userInfoLoading} />
        <main className="page-content">
          {loading ? (
            <div className="chat-list-page__loading">
              <div className="chat-list-page__spinner"></div>
              <p>채팅 목록을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="chat-list-page__error">
              <AlertCircle size={48} className="chat-list-page__error-icon" />
              <p className="chat-list-page__error-text">{error}</p>
              <button 
                className="chat-list-page__retry-button"
                onClick={() => window.location.reload()}
              >
                다시 시도
              </button>
            </div>
          ) : (
            <div className="chat-list-page">
              <div className="chat-list-page__header">
                <h1 className="chat-list-page__title">
                  <MessageCircle size={28} />
                  {isMaker ? '서포터 문의 관리' : '나의 메시지'}
                </h1>
                <div className="chat-list-page__search">
                  <Search size={18} className="chat-list-page__search-icon" />
                  <input
                    type="text"
                    placeholder={isMaker ? "서포터 이름 검색" : "메이커 이름 검색"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="chat-list-page__search-input"
                  />
                </div>
              </div>

              <div className="chat-list-page__list">
                {filteredChatrooms.length === 0 ? (
                  <div className="chat-list-page__empty">
                    <MessageCircle size={48} className="chat-list-page__empty-icon" />
                    <p className="chat-list-page__empty-text">
                        {isMaker ? '접수된 문의가 없습니다' : '아직 대화가 없습니다'}
                    </p>
                    <p className="chat-list-page__empty-subtext">
                        {isMaker ? '새로운 문의가 오면 여기에 표시됩니다' : '프로젝트에서 판매자와 대화를 시작해보세요'}
                    </p>
                  </div>
                ) : (
                  filteredChatrooms.map((chatroom) => (
                    <div
                      key={chatroom.CHATROOM_NO}
                      className="chat-list-item"
                      onClick={() => handleChatroomClick(chatroom)}
                    >
                      <img
                        src={chatroom.OTHER_USER_AVATAR}
                        alt={chatroom.OTHER_USER_NAME}
                        className="chat-list-item__avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/80x80?text=User';
                        }}
                      />
                      <div className="chat-list-item__content">
                        <div className="chat-list-item__header">
                          <span className="chat-list-item__name">{chatroom.OTHER_USER_NAME || '사용자'}</span>
                          <span className="chat-list-item__time">
                            <Clock size={12} />
                            {formatTime(chatroom.LAST_MESSAGE_DATE)}
                          </span>
                        </div>
                        <div className="chat-list-item__footer">
                          <p className="chat-list-item__message">
                            {chatroom.LAST_MESSAGE || '메시지를 시작해보세요'}
                          </p>
                          {chatroom.UNREAD_COUNT > 0 && (
                            <span className="chat-list-item__badge">{chatroom.UNREAD_COUNT}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={20} className="chat-list-item__chevron" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default ChatListPage;