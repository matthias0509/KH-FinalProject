package com.kh.foodding.project.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.project.dao.ProjectInteractionDao;
import com.kh.foodding.project.dto.FollowStatusResponse;
import com.kh.foodding.project.dto.LikeStatusResponse;

@Service
public class ProjectInteractionServiceImpl implements ProjectInteractionService {

    @Autowired
    private ProjectInteractionDao interactionDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public LikeStatusResponse getLikeStatus(long productNo, Integer userNo) {
        long likeCount = interactionDao.countLikes(sqlSession, productNo);
        boolean liked = userNo != null && interactionDao.hasLiked(sqlSession, productNo, userNo);
        return new LikeStatusResponse(productNo, likeCount, liked);
    }

    @Override
    public LikeStatusResponse like(long productNo, int userNo) {
        interactionDao.insertLike(sqlSession, productNo, userNo);
        return getLikeStatus(productNo, userNo);
    }

    @Override
    public LikeStatusResponse unlike(long productNo, int userNo) {
        interactionDao.deleteLike(sqlSession, productNo, userNo);
        return getLikeStatus(productNo, userNo);
    }

    @Override
    public FollowStatusResponse getFollowStatus(long sellerNo, Integer userNo) {
        long followerCount = interactionDao.countFollowers(sqlSession, sellerNo);
        boolean following = userNo != null && interactionDao.isFollowing(sqlSession, sellerNo, userNo);
        return new FollowStatusResponse(sellerNo, followerCount, following);
    }

    @Override
    public FollowStatusResponse follow(long sellerNo, int userNo) {
        interactionDao.insertFollow(sqlSession, sellerNo, userNo);
        return getFollowStatus(sellerNo, userNo);
    }

    @Override
    public FollowStatusResponse unfollow(long sellerNo, int userNo) {
        interactionDao.deleteFollow(sqlSession, sellerNo, userNo);
        return getFollowStatus(sellerNo, userNo);
    }
}
