package com.kh.foodding.chat.model.service;

import java.util.List;

import com.kh.foodding.chat.model.vo.Message;

public interface ChatService {
    // 메시지 전송
    int sendMessage(Long buyerNo, Long sellerNo, Long senderNo, String msgContent);
    
    // 메시지 조회
    List<Message> getMessageList(Long buyerNo, Long sellerNo);
}