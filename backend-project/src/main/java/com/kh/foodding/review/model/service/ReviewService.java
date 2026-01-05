package com.kh.foodding.review.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.mypage.model.dao.MyPageDao;
import com.kh.foodding.mypage.model.vo.MyPage;
import com.kh.foodding.review.dto.ReviewCreateRequest;
import com.kh.foodding.review.model.dao.ReviewDao;
import com.kh.foodding.review.model.vo.Review;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewDao reviewDao;
    private final MyPageDao myPageDao;

    public List<Review> getReviewsByProduct(long productNo) {
        return reviewDao.selectReviewsByProduct(productNo);
    }

    public Review getReviewForOrder(String userId, String orderNo) {
        MyPage member = myPageDao.selectMemberById(userId);
        if (member == null) {
            return null;
        }
        return reviewDao.selectReviewByOrder(orderNo, member.getUserNo());
    }

    @Transactional
    public Review createReview(String userId, ReviewCreateRequest request) {
        validateRequest(request);

        MyPage member = myPageDao.selectMemberById(userId);
        if (member == null) {
            throw new IllegalStateException("회원 정보를 찾을 수 없습니다.");
        }

        int userNo = member.getUserNo();
        String orderNo = request.getOrderNo();
        Long productNo = reviewDao.findProductNoByOrder(orderNo, userNo);
        if (productNo == null) {
            throw new IllegalArgumentException("해당 주문을 찾을 수 없거나 작성 권한이 없습니다.");
        }

        Integer reviewCount = reviewDao.countReviewByOrder(orderNo, userNo);
        if (reviewCount != null && reviewCount > 0) {
            throw new IllegalStateException("이미 후기를 작성하셨습니다.");
        }

        Review review = new Review();
        review.setReviewTitle(request.getTitle().trim());
        review.setReviewContent(request.getContent().trim());
        review.setRating(request.getRating());
        review.setOrderNo(orderNo);
        review.setUserNo(userNo);

        int inserted = reviewDao.insertReview(review);
        if (inserted != 1) {
            throw new IllegalStateException("후기 저장에 실패했습니다.");
        }

        return reviewDao.selectReviewByOrder(orderNo, userNo);
    }

    private void validateRequest(ReviewCreateRequest request) {
        if (request == null || request.getOrderNo() == null || request.getOrderNo().trim().isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 주문 번호입니다.");
        }
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("후기 제목을 입력해주세요.");
        }
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("후기 내용을 입력해주세요.");
        }
        if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
            throw new IllegalArgumentException("별점은 1~5 사이로 입력해주세요.");
        }
    }
}
