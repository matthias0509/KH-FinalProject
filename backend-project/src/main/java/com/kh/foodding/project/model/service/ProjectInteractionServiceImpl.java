package com.kh.foodding.project.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.project.dao.ProjectInteractionDao;
import com.kh.foodding.project.dto.FollowStatusResponse;
import com.kh.foodding.project.dto.LikeStatusResponse;
import com.kh.foodding.project.model.vo.SellerProfile;
import com.kh.foodding.seller.model.dao.SellerProfileDao;

@Service
// 좋아요/팔로우 비즈니스 로직 구현체
public class ProjectInteractionServiceImpl implements ProjectInteractionService {

    @Autowired
    private ProjectInteractionDao interactionDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Autowired
    private SellerProfileDao sellerProfileDao;

    @Override
    // 현재 좋아요 수와 로그인 사용자의 상태를 함께 반환
    public LikeStatusResponse getLikeStatus(long productNo, Integer userNo) {
        long likeCount = interactionDao.countLikes(sqlSession, productNo);
        boolean liked = userNo != null && interactionDao.hasLiked(sqlSession, productNo, userNo);
        return new LikeStatusResponse(productNo, likeCount, liked);
    }

    @Override
    // 좋아요 추가 후 최신 상태 반환
    public LikeStatusResponse like(long productNo, int userNo) {
        interactionDao.insertLike(sqlSession, productNo, userNo);
        return getLikeStatus(productNo, userNo);
    }

    @Override
    // 좋아요 제거 후 최신 상태 반환
    public LikeStatusResponse unlike(long productNo, int userNo) {
        interactionDao.deleteLike(sqlSession, productNo, userNo);
        return getLikeStatus(productNo, userNo);
    }

    @Override
    // 팔로워 수와 로그인 사용자의 팔로우 여부를 함께 반환
    public FollowStatusResponse getFollowStatus(long sellerNo, Integer userNo) {
        long followerCount = interactionDao.countFollowers(sqlSession, sellerNo);
        boolean following = userNo != null && interactionDao.isFollowing(sqlSession, sellerNo, userNo);
        return new FollowStatusResponse(sellerNo, followerCount, following);
    }

    @Override
    // 팔로우 추가 (본인 팔로우 방지) 후 최신 상태 반환
    public FollowStatusResponse follow(long sellerNo, int userNo) {
        ensureNotSelfFollow(sellerNo, userNo);
        interactionDao.insertFollow(sqlSession, sellerNo, userNo);
        return getFollowStatus(sellerNo, userNo);
    }

    @Override
    // 팔로우 취소 후 최신 상태 반환
    public FollowStatusResponse unfollow(long sellerNo, int userNo) {
        interactionDao.deleteFollow(sqlSession, sellerNo, userNo);
        return getFollowStatus(sellerNo, userNo);
    }

    // 판매자의 USER_NO와 로그인 사용자가 같은지 검사하여 자기팔로우를 차단
    private void ensureNotSelfFollow(long sellerNo, int userNo) {
        SellerProfile target = sellerProfileDao.selectSellerProfile(sqlSession, sellerNo);
        if (target == null) {
            throw new IllegalArgumentException("판매자 정보를 찾을 수 없습니다.");
        }

        Long sellerUserNo = target.getUserNo();
        if (sellerUserNo != null && sellerUserNo.longValue() == userNo) {
            throw new IllegalStateException("본인은 팔로우할 수 없습니다.");
        }
    }
}
