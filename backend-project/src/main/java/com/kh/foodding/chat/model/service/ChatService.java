package com.kh.foodding.chat.model.service;

import java.util.List;
import java.util.Map;

import com.kh.foodding.chat.model.vo.Message;

public interface ChatService {
    // 메시지 전송
    int sendMessage(Long buyerNo, Long sellerNo, Long senderNo, String msgContent);
    
    // 메시지 조회
    List<Message> getMessageList(Long buyerNo, Long sellerNo);
    
    // 채팅방 목록 조회
    List<Map<String, Object>> getChatroomList(Long userNo);
    
    // 메시지 읽음 처리
    int markMessagesAsRead(Long chatroomNo, Long receiverNo);
    
    // 채팅방 번호 조회 (buyerNo, sellerNo로)
    Long getChatroomNo(Long buyerNo, Long sellerNo);
}