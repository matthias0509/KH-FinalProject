import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AppFooter from '../../components/AppFooter';
import '../../styles/ChatListPage.css';

const API_BASE_URL = 'http://localhost:8001/foodding';

const ChatListPage = () => {
  const navigate = useNavigate();
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserNo, setCurrentUserNo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  // 사용자 정보 가져오기
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
        const response = await axios.get(`${API_BASE_URL}/api/mypage/info`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('👤 사용자 정보:', response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('❌ 사용자 정보 로딩 실패:', error);
        
        // 401 에러(인증 실패) 시 처리
        if (error.response && error.response.status === 401) {
          alert('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setUserInfoLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    console.log('🔵 ChatListPage 마운트');
    
    const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  console.log('🔑 토큰:', token ? '있음' : '없음');
  
  if (!token) {
    console.log('❌ 토큰 없음');
    setError('로그인이 필요합니다');
    setLoading(false);
    return null;
  }
  
  try {
    // JWT 파싱 시도 (안전하게)
    let userNo = null;
    
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        // 표준 JWT 형식인 경우에만 파싱 시도
        const payload = JSON.parse(atob(parts[1]));
          console.log('📦 JWT Payload:', payload);
          userNo = payload.userNo || payload.sub || payload.id || payload.user_no || payload.USER_NO;
          console.log('👤 추출된 userNo:', userNo);
        }
      } catch (jwtError) {
        console.warn('⚠️ JWT 파싱 실패, API로 사용자 정보 조회:', jwtError.message);
      }
      
      // JWT에서 못 찾았거나 파싱 실패 시 API 호출
      if (!userNo) {
        console.log('📡 API로 사용자 정보 가져오기 시도');
        const response = await axios.get(`${API_BASE_URL}/api/mypage/info`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('✅ API 응답:', response.data);
        userNo = response.data.userNo || response.data.USER_NO;
      }
      
      return userNo;
    } catch (e) {
      console.error('❌ 사용자 정보 가져오기 실패:', e);
      
      // 401 에러면 로그인 페이지로
      if (e.response && e.response.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('인증 정보가 올바르지 않습니다');
      }
      
      setLoading(false);
      return null;
    }
  };

    const loadChatrooms = async (userNo) => {
      console.log('📡 채팅방 목록 API 호출:', { userNo });
      
      try {
        const response = await axios.get(`${API_BASE_URL}/chat/rooms`, {
          params: { userNo }
        });
        
        console.log('✅ 채팅방 목록 응답:', response.data);
        
        if (Array.isArray(response.data)) {
          setChatrooms(response.data);
          console.log(`📋 채팅방 ${response.data.length}개 로드 완료`);
        } else {
          console.warn('⚠️ 응답이 배열이 아님:', response.data);
          setChatrooms([]);
        }
      } catch (error) {
        console.error('❌ 채팅방 목록 로딩 실패:', error);
        
        if (error.response) {
          console.error('에러 상태:', error.response.status);
          console.error('에러 데이터:', error.response.data);
          
          if (error.response.status === 401) {
            setError('로그인이 만료되었습니다');
          } else {
            setError(`서버 오류 (${error.response.status})`);
          }
        } else if (error.request) {
          setError('서버에 연결할 수 없습니다');
        } else {
          setError('요청 중 오류가 발생했습니다');
        }
        
        setChatrooms([]);
      } finally {
        setLoading(false);
        console.log('🏁 로딩 완료');
      }
    };

    const initialize = async () => {
      const userNo = await getUserInfo();
      if (userNo) {
        setCurrentUserNo(userNo);
        await loadChatrooms(userNo);
      } else {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const handleChatroomClick = async (chatroom) => {
    if (!currentUserNo) {
        alert('사용자 정보를 불러오지 못했습니다');
        return;
    }

    const buyerNo = chatroom.BUYER;
    const sellerNo = chatroom.SELLER;
    
    console.log('💬 채팅방 열기:', {
        chatroomNo: chatroom.CHATROOM_NO,
        currentUserNo,
        buyerNo,
        sellerNo,
        otherUserNo: chatroom.OTHER_USER_NO
    });
    
    try {
        await axios.post(`${API_BASE_URL}/chat/messages/read`, null, {
            params: {
                chatroomNo: chatroom.CHATROOM_NO,
                userNo: currentUserNo
            }
        });
        console.log('✅ 읽음 처리 완료');
        
        // 🔥 읽음 처리 후 채팅방 목록 새로고침
        const response = await axios.get(`${API_BASE_URL}/chat/rooms`, {
            params: { userNo: currentUserNo }
        });
        if (Array.isArray(response.data)) {
            setChatrooms(response.data);
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

  const filteredChatrooms = chatrooms.filter(chatroom =>
    chatroom.OTHER_USER_NAME?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  메시지
                </h1>
                <div className="chat-list-page__search">
                  <Search size={18} className="chat-list-page__search-icon" />
                  <input
                    type="text"
                    placeholder="검색"
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
                    <p className="chat-list-page__empty-text">아직 대화가 없습니다</p>
                    <p className="chat-list-page__empty-subtext">프로젝트에서 판매자와 대화를 시작해보세요</p>
                  </div>
                ) : (
                  filteredChatrooms.map((chatroom) => (
                    <div
                      key={chatroom.CHATROOM_NO}
                      className="chat-list-item"
                      onClick={() => handleChatroomClick(chatroom)}
                    >
                      <img
                        src={chatroom.OTHER_USER_AVATAR || 'https://placehold.co/80x80?text=User'}
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