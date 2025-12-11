import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Paperclip, Smile } from 'lucide-react';
import './ChatComponent.css';

const ChatComponent = () => {
  // creator 상태 추가
  const [creator, setCreator] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'creator',
      text: '안녕하세요! 프로젝트에 관심 가져주셔서 감사합니다. 무엇이든 물어보세요 😊',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const messagesEndRef = useRef(null);

  // 부모 창으로부터 creator 데이터 받기
  useEffect(() => {
    const handleMessage = (event) => {
      // 보안: 같은 origin에서 온 메시지만 처리
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'CREATOR_DATA') {
        setCreator(event.data.creator);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // 부모 창에 준비됐다고 알림
    if (window.opener) {
      window.opener.postMessage({ type: 'CHAT_READY' }, window.location.origin);
    }
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // 시뮬레이션: 2초 후 자동 응답
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          sender: 'creator',
          text: '메시지 감사합니다! 곧 답변드리겠습니다.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    return `${ampm} ${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    window.close();
  };

  // creator 데이터 로딩 중
  if (!creator) {
    return (
      <div className="chat-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <div style={{ fontSize: '14px' }}>로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      {/* 나머지 코드는 동일... */}
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