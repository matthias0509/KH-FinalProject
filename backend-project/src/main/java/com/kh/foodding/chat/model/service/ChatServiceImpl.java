package com.kh.foodding.chat.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.chat.model.vo.Chatroom;
import com.kh.foodding.chat.model.vo.Message;
import com.kh.foodding.chat.model.dao.ChatDao;

@Service
public class ChatServiceImpl implements ChatService {
    
    @Autowired
    private ChatDao chatDao;
    
    @Autowired
    private SqlSessionTemplate sqlSession;
    
    @Override
    public int sendMessage(Long buyerNo, Long sellerNo, Long senderNo, String msgContent) {
        ensureDifferentParticipants(buyerNo, sellerNo);
        // 1. 채팅방 조회 또는 생성
        Map<String, Object> params = new HashMap<>();
        params.put("buyer", buyerNo);
        params.put("seller", sellerNo);
        
        Chatroom chatroom = chatDao.selectChatroom(sqlSession, params);
        
        if (chatroom == null) {
            // 채팅방이 없으면 생성
            chatroom = new Chatroom();
            chatroom.setBuyer(buyerNo);
            chatroom.setSeller(sellerNo);
            chatDao.insertChatroom(sqlSession, chatroom);
            
            // 생성된 채팅방 다시 조회 (PK 가져오기)
            chatroom = chatDao.selectChatroom(sqlSession, params);
        }
        
        // 2. 메시지 저장
        Message message = new Message();
        message.setChatroomNo(chatroom.getChatroomNo());
        message.setSender(senderNo);
        message.setReceiver(senderNo.equals(buyerNo) ? sellerNo : buyerNo);
        message.setMsgContent(msgContent);
        message.setReadYn("N");
        
        return chatDao.insertMessage(sqlSession, message);
    }

    private void ensureDifferentParticipants(Long buyerNo, Long sellerNo) {
        if (buyerNo == null || sellerNo == null) {
            throw new IllegalArgumentException("참여자 정보가 올바르지 않습니다.");
        }
        if (buyerNo.longValue() == sellerNo.longValue()) {
            throw new IllegalStateException("본인에게는 1:1 문의를 보낼 수 없습니다.");
        }
    }
    
    @Override
    public List<Message> getMessageList(Long buyerNo, Long sellerNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("buyer", buyerNo);
        params.put("seller", sellerNo);
        
        Chatroom chatroom = chatDao.selectChatroom(sqlSession, params);
        
        if (chatroom == null) {
            return null;
        }
        
        return chatDao.selectMessageList(sqlSession, chatroom.getChatroomNo());
    }
    
    @Override
    public List<Map<String, Object>> getChatroomList(Long userNo) {
        return chatDao.selectChatroomListByUser(sqlSession, userNo);
    }
    
    @Override
    public int markMessagesAsRead(Long chatroomNo, Long receiverNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("chatroomNo", chatroomNo);
        params.put("receiverNo", receiverNo);
        
        return chatDao.updateMessagesToRead(sqlSession, params);
    }
}
