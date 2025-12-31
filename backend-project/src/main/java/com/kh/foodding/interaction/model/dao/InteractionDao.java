package com.kh.foodding.interaction.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InteractionDao {
    
    // 팔로우
    int checkFollowStatus(@Param("userNo") int userNo, @Param("sellerNo") int sellerNo);
    int insertFollow(@Param("userNo") int userNo, @Param("sellerNo") int sellerNo);
    int deleteFollow(@Param("userNo") int userNo, @Param("sellerNo") int sellerNo);
    int getFollowerCount(int sellerNo);

    // 좋아요
    int checkLikeStatus(@Param("userNo") int userNo, @Param("productNo") int productNo);
    int insertLike(@Param("userNo") int userNo, @Param("productNo") int productNo);
    int deleteLike(@Param("userNo") int userNo, @Param("productNo") int productNo);
    int getLikeCount(int productNo);
}