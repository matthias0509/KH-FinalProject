import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Paperclip, Smile, Loader } from 'lucide-react';
import './ChatComponent.css';

const ChatComponent = () => {
  const [creator, setCreator] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // 부모 창으로부터 creator와 userId 데이터 받기
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'CREATOR_DATA') {
        setCreator(event.data.creator);
        setUserId(event.data.userId || 'user_' + Date.now());
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    if (window.opener) {
      window.opener.postMessage({ type: 'CHAT_READY' }, window.location.origin);
    }
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // creator와 userId가 설정되면 메시지 불러오기
  useEffect(() => {
    if (creator && userId) {
      loadMessages();
    }
  }, [creator, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 저장 키 생성
  const getChatKey = () => {
    if (!creator || !userId) return null;
    return `chat:${creator.sellerNo}:${userId}`;
  };

  // 메시지 불러오기
  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const chatKey = getChatKey();
      if (!chatKey) return;

      const result = await window.storage.get(chatKey, true); // shared: true로 변경
      
      if (result && result.value) {
        const savedMessages = JSON.parse(result.value);
        setMessages(savedMessages);
      } else {
        // 첫 방문시 환영 메시지
        const welcomeMessage = {
          id: 1,
          sender: 'creator',
          text: `안녕하세요! ${creator.name}입니다. 프로젝트에 관심 가져주셔서 감사합니다. 무엇이든 물어보세요 😊`,
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
        await saveMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('메시지 로딩 실패:', error);
      // 에러 발생시 기본 환영 메시지
      const welcomeMessage = {
        id: 1,
        sender: 'creator',
        text: `안녕하세요! ${creator.name}입니다. 프로젝트에 관심 가져주셔서 감사합니다. 무엇이든 물어보세요 😊`,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 메시지 저장하기
  const saveMessages = async (newMessages) => {
    try {
      const chatKey = getChatKey();
      if (!chatKey) return;

      await window.storage.set(chatKey, JSON.stringify(newMessages), true); // shared: true로 변경
    } catch (error) {
      console.error('메시지 저장 실패:', error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: message,
        timestamp: new Date().toISOString()
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setMessage('');
      
      // 메시지 저장
      await saveMessages(updatedMessages);

      // 시뮬레이션: 2초 후 자동 응답
      setTimeout(async () => {
        const autoReply = {
          id: Date.now() + 1,
          sender: 'creator',
          text: '메시지 감사합니다! 곧 답변드리겠습니다.',
          timestamp: new Date().toISOString()
        };
        const messagesWithReply = [...updatedMessages, autoReply];
        setMessages(messagesWithReply);
        await saveMessages(messagesWithReply);
      }, 2000);
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
    window.close();
  };

  if (!creator || !userId) {
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
            {messages.map((msg) => (
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
            ))}
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
        />
        <button type="button" className="chat-page__input-action">
          <Smile size={20} />
        </button>
        <button 
          type="button"
          className="chat-page__send-button"
          disabled={!message.trim()}
          onClick={handleSendMessage}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;