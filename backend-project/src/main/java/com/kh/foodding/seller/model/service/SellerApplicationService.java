package com.kh.foodding.seller.model.service;

import java.util.List;

import com.kh.foodding.seller.model.vo.SellerApplication;

public interface SellerApplicationService {

    SellerApplication apply(SellerApplication application);

    SellerApplication getMyLatestApplication(long userNo);

    List<SellerApplication> getApplications(String status);

    SellerApplication reviewApplication(long applicationNo, String status, String adminMemo);
}
