package com.kh.foodding.admin.model.vo;

import java.util.List;
import lombok.Data;

@Data
public class AdminProject {
    private int productNo;          // 프로젝트 번호
    private String category;        // 카테고리
    private String productTitle;    // 제목
    private int sellerNo;           // 판매자 번호
    private String sellerName;      // 판매자 이름 (메이커명)
    private String sellerPhone;     // 판매자 연락처
    
    // ✅ [추가] 판매자 아이디 (관리자 화면 표시용)
    private String sellerId;        

    private int targetAmount;       // 목표 금액
    
    // ✅ [추가] 현재 달성 금액 & 달성률
    private int currentAmount;      // 현재 모금액
    private int achieveRate;        // 달성률 (%)

    private String createDate;      // 신청일
    private String fundStartDate;   // 펀딩 시작일
    private String fundEndDate;     // 펀딩 종료일
    private String productStatus;   // 상태 (WAITING, OPEN, REJECT, STOP, BAN ...)
    private String approvalStatus;  // 심사 상태 (프론트 호환용)
    private String shipStartDate;   // 배송 시작일
    private String storyHtml;       // 상세 스토리 (HTML)
    private String rejectReason;    // 반려 사유
    private String thumbnailUrl;    // 썸네일 이미지

    // ✅ [추가] 관리자 메모 (정지 사유 등)
    private String adminMemo;       

    // 리워드 목록 (상세 모달용)
    private List<AdminReward> rewards;
}