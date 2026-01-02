package com.kh.foodding.interaction.model.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.interaction.model.dao.InteractionDao;
import com.kh.foodding.mypage.model.dao.MyPageDao; // 회원번호 조회용
import com.kh.foodding.mypage.model.vo.MyPage;

@Service
public class InteractionService {

    @Autowired
    private InteractionDao interactionDao;
    
    @Autowired
    private MyPageDao myPageDao; 

    // ✅ 팔로우 토글 (없으면 추가, 있으면 삭제)
    @Transactional
    public Map<String, Object> toggleFollow(String userId, int sellerNo) {
        // 1. 내 번호 알아내기
        MyPage member = myPageDao.selectMemberById(userId);
        int userNo = member.getUserNo();

        // 2. 이미 팔로우 했는지 확인
        int count = interactionDao.checkFollowStatus(userNo, sellerNo);
        boolean isFollowing;

        if (count > 0) {
            interactionDao.deleteFollow(userNo, sellerNo); // 취소
            isFollowing = false;
        } else {
            interactionDao.insertFollow(userNo, sellerNo); // 추가
            isFollowing = true;
        }

        // 3. 최신 팔로워 수 반환
        int followerCount = interactionDao.getFollowerCount(sellerNo);
        return Map.of("following", isFollowing, "followerCount", followerCount);
    }

    // ✅ 좋아요 토글
    @Transactional
    public Map<String, Object> toggleLike(String userId, int productNo) {
        MyPage member = myPageDao.selectMemberById(userId);
        int userNo = member.getUserNo();

        int count = interactionDao.checkLikeStatus(userNo, productNo);
        boolean isLiked;

        if (count > 0) {
            interactionDao.deleteLike(userNo, productNo);
            isLiked = false;
        } else {
            interactionDao.insertLike(userNo, productNo);
            isLiked = true;
        }

        int likeCount = interactionDao.getLikeCount(productNo);
        return Map.of("liked", isLiked, "likeCount", likeCount);
    }
}