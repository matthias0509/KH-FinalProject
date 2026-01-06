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
// 프로젝트 좋아요/팔로우 상태를 관리하는 REST 컨트롤러
public class ProjectInteractionController {

    @Autowired
    private ProjectInteractionService interactionService;

    @Autowired
    private JWTUtil jwtUtil;

    // 특정 프로젝트의 좋아요 상태 및 총 수를 조회 (비로그인 허용)
    @GetMapping("/{productNo}/likes")
    public ResponseEntity<LikeStatusResponse> getLikeStatus(
            @PathVariable long productNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        Integer userNo = resolveUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.getLikeStatus(productNo, userNo));
    }
    
    // 로그인 사용자가 좋아요를 누르면 즉시 반영
    @PostMapping("/{productNo}/likes")
    public ResponseEntity<LikeStatusResponse> like(
            @PathVariable long productNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        int userNo = requireUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.like(productNo, userNo));
    }

    // 로그인 사용자가 좋아요를 취소
    @DeleteMapping("/{productNo}/likes")
    public ResponseEntity<LikeStatusResponse> unlike(
            @PathVariable long productNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        int userNo = requireUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.unlike(productNo, userNo));
    }

    // 특정 판매자의 팔로잉 여부 및 팔로워 수 조회 (비로그인 허용)
    @GetMapping("/seller/{sellerNo}/followers")
    public ResponseEntity<FollowStatusResponse> getFollowStatus(
            @PathVariable long sellerNo,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        Integer userNo = resolveUserNo(authorizationHeader);
        return ResponseEntity.ok(interactionService.getFollowStatus(sellerNo, userNo));
    }

    // 로그인 사용자가 판매자를 팔로우
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

    // 로그인 사용자가 판매자 팔로우를 취소
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

    // Authorization 헤더가 있으면 JWT에서 userNo 추출 (없으면 null)
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

    // 필수 인증 구간: 토큰이 없거나 파싱 실패 시 401을 던짐
    private int requireUserNo(String authorizationHeader) {
        Integer userNo = resolveUserNo(authorizationHeader);
        if (userNo == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return userNo;
    }
}
