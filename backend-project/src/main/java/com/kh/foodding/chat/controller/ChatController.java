package com.kh.foodding.chat.controller;

import com.kh.foodding.chat.model.service.ChatService;
import com.kh.foodding.chat.model.vo.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
// @CrossOrigin 어노테이션 제거!
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    // 메시지 전송
    @PostMapping("/messages")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody Map<String, Object> params) {
        Long buyerNo = Long.valueOf(params.get("buyerNo").toString());
        Long sellerNo = Long.valueOf(params.get("sellerNo").toString());
        Long senderNo = Long.valueOf(params.get("senderNo").toString());
        String msgContent = params.get("msgContent").toString();
        
        int result = chatService.sendMessage(buyerNo, sellerNo, senderNo, msgContent);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", result > 0);
        
        return ResponseEntity.ok(response);
    }
    
    // 메시지 조회
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages(
            @RequestParam Long buyerNo,
            @RequestParam Long sellerNo) {
        List<Message> messages = chatService.getMessageList(buyerNo, sellerNo);
        return ResponseEntity.ok(messages);
    }
    
    // 채팅방 목록 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<Map<String, Object>>> getChatroomList(@RequestParam Long userNo) {
        System.out.println("채팅방 목록 요청 - userNo: " + userNo); // 로그 추가
        List<Map<String, Object>> chatrooms = chatService.getChatroomList(userNo);
        System.out.println("조회된 채팅방 수: " + (chatrooms != null ? chatrooms.size() : 0)); // 로그 추가
        return ResponseEntity.ok(chatrooms);
    }
    
    // 메시지 읽음 처리
    @PostMapping("/messages/read")
    public ResponseEntity<Map<String, Object>> markMessagesAsRead(
            @RequestParam Long chatroomNo,
            @RequestParam Long userNo) {
        
        System.out.println("메시지 읽음 처리 - chatroomNo: " + chatroomNo + ", userNo: " + userNo);
        
        int result = chatService.markMessagesAsRead(chatroomNo, userNo);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", result > 0);
        response.put("updatedCount", result);
        
        return ResponseEntity.ok(response);
    }
}