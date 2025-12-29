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
@CrossOrigin(origins = "*")
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
}
