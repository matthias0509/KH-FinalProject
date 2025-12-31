package com.kh.foodding.interaction.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.interaction.model.service.InteractionService;

@RestController
@RequestMapping("/api/interaction")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class InteractionController {

    @Autowired
    private InteractionService interactionService;

    // 1. 팔로우 버튼 클릭 시
    @PostMapping("/follow/{sellerNo}")
    public ResponseEntity<?> toggleFollow(@PathVariable int sellerNo, Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        
        return ResponseEntity.ok(interactionService.toggleFollow(principal.getName(), sellerNo));
    }

    // 2. 좋아요 버튼 클릭 시
    @PostMapping("/like/{productNo}")
    public ResponseEntity<?> toggleLike(@PathVariable int productNo, Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        
        return ResponseEntity.ok(interactionService.toggleLike(principal.getName(), productNo));
    }
}