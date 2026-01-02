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
        
        Map<String, Object> response = new HashMap<>();
        try {
            int result = chatService.sendMessage(buyerNo, sellerNo, senderNo, msgContent);
            response.put("success", result > 0);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException | IllegalArgumentException ex) {
            response.put("success", false);
            response.put("message", ex.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // 메시지 조회
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages(
            @RequestParam Long buyerNo,
            @RequestParam Long sellerNo) {
        System.out.println("=== 메시지 조회 요청 ===");
        System.out.println("buyerNo: " + buyerNo);
        System.out.println("sellerNo: " + sellerNo);
        
        List<Message> messages = chatService.getMessageList(buyerNo, sellerNo);
        
        if (messages != null && !messages.isEmpty()) {
            System.out.println("조회된 메시지 수: " + messages.size());
            for (Message msg : messages) {
                System.out.println("메시지 " + msg.getMsgNo() + ": readYn=" + msg.getReadYn() + ", isRead=" + msg.getIsRead());
            }
        } else {
            System.out.println("메시지가 없습니다.");
        }
        
        return ResponseEntity.ok(messages);
    }
    
    // 채팅방 목록 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<Map<String, Object>>> getChatroomList(@RequestParam Long userNo) {
        System.out.println("=== 채팅방 목록 조회 요청 ===");
        System.out.println("userNo: " + userNo);
        
        List<Map<String, Object>> chatrooms = chatService.getChatroomList(userNo);
        
        System.out.println("조회된 채팅방 수: " + (chatrooms != null ? chatrooms.size() : 0));
        
        if (chatrooms != null && !chatrooms.isEmpty()) {
            for (Map<String, Object> room : chatrooms) {
                System.out.println("채팅방 " + room.get("CHATROOM_NO") + ":");
                System.out.println("  - BUYER: " + room.get("BUYER"));
                System.out.println("  - SELLER: " + room.get("SELLER"));
                System.out.println("  - OTHER_USER_NO: " + room.get("OTHER_USER_NO"));
                System.out.println("  - LAST_MESSAGE: " + room.get("LAST_MESSAGE"));
                System.out.println("  - UNREAD_COUNT: " + room.get("UNREAD_COUNT"));
            }
        }
        
        return ResponseEntity.ok(chatrooms);
    }
    
    // 채팅방 번호 조회
    @GetMapping("/chatroom-no")
    public ResponseEntity<Map<String, Object>> getChatroomNo(
            @RequestParam Long buyerNo,
            @RequestParam Long sellerNo) {
        
        Long chatroomNo = chatService.getChatroomNo(buyerNo, sellerNo);
        
        Map<String, Object> response = new HashMap<>();
        response.put("chatroomNo", chatroomNo);
        
        return ResponseEntity.ok(response);
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