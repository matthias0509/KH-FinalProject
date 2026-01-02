package com.kh.foodding.seller.model.service;

import java.util.List;
import com.kh.foodding.seller.model.vo.SellerApplication;

public interface SellerApplicationService {

    // 판매자 전환 신청
    SellerApplication apply(SellerApplication application);

    // 내 최신 신청 내역 조회
    SellerApplication getMyLatestApplication(long userNo);

    // 관리자용 신청 목록 조회
    List<SellerApplication> getApplications(String status);

    // 심사 (승인/반려)
    SellerApplication reviewApplication(long applicationNo, String status, String adminMemo);
}