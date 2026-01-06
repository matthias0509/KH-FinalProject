package com.kh.foodding.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.kh.foodding.config.JWTUtil;
import com.kh.foodding.project.dto.FollowStatusResponse;
import com.kh.foodding.project.dto.LikeStatusResponse;
import com.kh.foodding.project.model.service.ProjectInteractionService;

@RestController
@RequestMapping("/project")
public class ProjectInteractionController {

    @Autowired
    private ProjectInteractionService interactionService;

    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("/{productNo}/likes")
    public ResponseEntity<LikeStatusResponse> getLikeStatus(
            @PathVariable long productNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        Integer userNo = resolveUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.getLikeStatus(productNo, userNo));
    }

    @PostMapping("/{productNo}/likes")
    public ResponseEntity<LikeStatusResponse> like(
            @PathVariable long productNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        int userNo = requireUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.like(productNo, userNo));
    }

    @DeleteMapping("/{productNo}/likes")
    public ResponseEntity<LikeStatusResponse> unlike(
            @PathVariable long productNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        int userNo = requireUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.unlike(productNo, userNo));
    }

    @GetMapping("/seller/{sellerNo}/followers")
    public ResponseEntity<FollowStatusResponse> getFollowStatus(
            @PathVariable long sellerNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        Integer userNo = resolveUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.getFollowStatus(sellerNo, userNo));
    }

    @PostMapping("/seller/{sellerNo}/followers")
    public ResponseEntity<FollowStatusResponse> follow(
            @PathVariable long sellerNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        int userNo = requireUserNo(authorizationHeader);
        try {
            return ResponseEntity.ok(interactionService.follow(sellerNo, userNo));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/seller/{sellerNo}/followers")
    public ResponseEntity<FollowStatusResponse> unfollow(
            @PathVariable long sellerNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        int userNo = requireUserNo(authorizationHeader);
        try {
            return ResponseEntity.ok(interactionService.unfollow(sellerNo, userNo));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    private Integer resolveUserNo(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authorizationHeader.substring(7);
        try {
            return jwtUtil.extractUserNo(token);
        } catch (Exception e) {
            return null;
        }
    }

    private int requireUserNo(String authorizationHeader) {
        Integer userNo = resolveUserNo(authorizationHeader);
        if (userNo == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return userNo;
    }
}
