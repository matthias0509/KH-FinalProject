package com.kh.foodding.review.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.review.dto.ReviewCreateRequest;
import com.kh.foodding.review.model.service.ReviewService;
import com.kh.foodding.review.model.vo.Review;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productNo}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable long productNo) {
        List<Review> reviews = reviewService.getReviewsByProduct(productNo);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/order/{orderNo}")
    public ResponseEntity<?> getReviewByOrder(@PathVariable String orderNo, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }

        Review review = reviewService.getReviewForOrder(principal.getName(), orderNo);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(review);
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewCreateRequest request, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "로그인이 필요합니다."));
        }

        try {
            Review review = reviewService.createReview(principal.getName(), request);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of("message", "후기 작성 중 오류가 발생했습니다."));
        }
    }
}
