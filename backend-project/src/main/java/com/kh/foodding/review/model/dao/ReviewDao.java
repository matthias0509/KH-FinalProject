package com.kh.foodding.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.foodding.review.model.vo.Review;

@Mapper
public interface ReviewDao {

    List<Review> selectReviewsByProduct(@Param("productNo") long productNo);

    Review selectReviewByOrder(@Param("orderNo") String orderNo, @Param("userNo") int userNo);

    Integer countReviewByOrder(@Param("orderNo") String orderNo, @Param("userNo") int userNo);

    Long findProductNoByOrder(@Param("orderNo") String orderNo, @Param("userNo") int userNo);

    int insertReview(Review review);
}
