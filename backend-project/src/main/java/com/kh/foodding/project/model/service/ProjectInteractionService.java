package com.kh.foodding.project.model.service;

import com.kh.foodding.project.dto.FollowStatusResponse;
import com.kh.foodding.project.dto.LikeStatusResponse;

// 좋아요/팔로우에 대한 비즈니스 규칙을 정의한 인터페이스
public interface ProjectInteractionService {

    LikeStatusResponse getLikeStatus(long productNo, Integer userNo);

    LikeStatusResponse like(long productNo, int userNo);

    LikeStatusResponse unlike(long productNo, int userNo);

    FollowStatusResponse getFollowStatus(long sellerNo, Integer userNo);

    FollowStatusResponse follow(long sellerNo, int userNo);

    FollowStatusResponse unfollow(long sellerNo, int userNo);
}
