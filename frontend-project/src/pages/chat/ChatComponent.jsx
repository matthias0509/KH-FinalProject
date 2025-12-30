import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Paperclip, Smile, Loader } from 'lucide-react';
import './ChatComponent.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/foodding';

const ChatComponent = () => {
  const [creator, setCreator] = useState(null);
  const [buyerNo, setBuyerNo] = useState(null);
  const [sellerNo, setSellerNo] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [hasLoadedMessages, setHasLoadedMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  // 부모 창으로부터 creator와 buyerNo 데이터 받기
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'CREATOR_DATA') {
        console.log('Received CREATOR_DATA:', event.data);
        setCreator(event.data.creator);
        setBuyerNo(event.data.buyerNo);
        setSellerNo(event.data.sellerNo); // 수정: sellerNo를 직접 받음
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // 부모 창에 준비 완료 알림
    if (window.opener) {
      window.opener.postMessage({ type: 'CHAT_READY' }, window.location.origin);
    }
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // creator와 buyerNo가 설정되면 메시지 불러오기 및 폴링 시작
  useEffect(() => {
    if (creator && buyerNo && sellerNo && !hasLoadedMessages) {
      console.log('Loading messages with:', { buyerNo, sellerNo });
      loadMessages();
      setHasLoadedMessages(true);
    }
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [creator, buyerNo, sellerNo, hasLoadedMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 폴링으로 새 메시지 확인 (5초마다)
  const startPolling = () => {
    // 기존 폴링이 있다면 제거
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    pollingIntervalRef.current = setInterval(() => {
      loadMessages(true);
    }, 5000);
  };

  // 메시지 불러오기
  const loadMessages = async (silent = false) => {
    if (!silent) setIsLoading(true);
    
    try {
      if (!buyerNo || !sellerNo) {
        console.log('buyerNo or sellerNo is missing');
        return;
      }

      console.log('Fetching messages:', { buyerNo, sellerNo });
      const response = await axios.get(`${API_BASE_URL}/chat/messages`, {
        params: {
          buyerNo: buyerNo,
          sellerNo: sellerNo
        }
      });
      
      console.log('Messages response:', response.data);
      
      if (response.data && response.data.length > 0) {
        const formattedMessages = response.data.map(msg => ({
          id: msg.msgNo,
          sender: msg.sender === buyerNo ? 'user' : 'creator',
          text: msg.msgContent,
          timestamp: msg.sendDate
        }));
        setMessages(formattedMessages);
        
        // 메시지가 있으면 폴링 시작
        if (!silent && !pollingIntervalRef.current) {
          startPolling();
        }
      } else if (!silent) {
        // 첫 방문시 환영 메시지 전송 (한 번만)
        console.log('No messages found, sending welcome message');
        const welcomeText = `안녕하세요! ${creator.name}입니다. 프로젝트에 관심 가져주셔서 감사합니다. 무엇이든 물어보세요 😊`;
        await sendMessageToServer(sellerNo, welcomeText);
        await loadMessages(true);
        startPolling();
      }
    } catch (error) {
      console.error('메시지 로딩 실패:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // 메시지 서버로 전송
  const sendMessageToServer = async (senderNo, msgContent) => {
    try {
      console.log('Sending message:', { buyerNo, sellerNo, senderNo, msgContent });
      const response = await axios.post(`${API_BASE_URL}/chat/messages`, {
        buyerNo: buyerNo,
        sellerNo: sellerNo,
        senderNo: senderNo,
        msgContent: msgContent
      });
      console.log('Send message response:', response.data);
      return response.data;
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() && !isSending) {
      setIsSending(true);
      const messageText = message;
      setMessage('');
      
      try {
        // 사용자 메시지 전송
        await sendMessageToServer(buyerNo, messageText);
        
        // 메시지 목록 새로고침
        await loadMessages(true);
        
        // 시뮬레이션: 2초 후 자동 응답 (개발/테스트용)
        setTimeout(async () => {
          try {
            await sendMessageToServer(sellerNo, '메시지 감사합니다! 곧 답변드리겠습니다.');
            await loadMessages(true);
          } catch (error) {
            console.error('자동 응답 실패:', error);
          }
        }, 2000);
      } catch (error) {
        console.error('메시지 전송 중 오류:', error);
        setMessage(messageText); // 실패시 메시지 복원
        alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    return `${ampm} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    // 폴링 정리
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    window.close();
  };

  if (!creator || !buyerNo || !sellerNo) {
    return (
      <div className="chat-page chat-page--loading">
        <div className="chat-page__loading-content">
          <Loader size={32} className="chat-page__loading-spinner" />
          <div className="chat-page__loading-text">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-page__header">
        <div className="chat-page__creator">
          <img src={creator.avatar} alt={creator.name} className="chat-page__avatar" />
          <div className="chat-page__creator-info">
            <h4 className="chat-page__creator-name">{creator.name}</h4>
            <span className="chat-page__status">온라인</span>
          </div>
        </div>
        <button 
          className="chat-page__close-button"
          onClick={handleClose}
          title="닫기"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-page__messages">
        {isLoading ? (
          <div className="chat-page__messages-loading">
            <Loader size={24} className="chat-page__loading-spinner" />
            <div className="chat-page__messages-loading-text">대화 내역을 불러오는 중...</div>
          </div>
        ) : (
          <>
            <div className="chat-page__date">오늘</div>
            {messages.length === 0 ? (
              <div className="chat-page__empty-message">
                <p>대화를 시작해보세요!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`chat-message ${msg.sender === 'user' ? 'chat-message--user' : 'chat-message--creator'}`}
                >
                  {msg.sender === 'creator' && (
                    <img src={creator.avatar} alt={creator.name} className="chat-message__avatar" />
                  )}
                  <div className="chat-message__content">
                    <div className="chat-message__bubble">
                      {msg.text}
                    </div>
                    <span className="chat-message__time">{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-page__input-container">
        <button type="button" className="chat-page__input-action">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          className="chat-page__input"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending}
        />
        <button type="button" className="chat-page__input-action">
          <Smile size={20} />
        </button>
        <button 
          type="button"
          className="chat-page__send-button"
          disabled={!message.trim() || isSending}
          onClick={handleSendMessage}
        >
          {isSending ? <Loader size={18} className="chat-page__loading-spinner" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;