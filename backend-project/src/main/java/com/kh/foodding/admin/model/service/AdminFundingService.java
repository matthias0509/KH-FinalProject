package com.kh.foodding.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.admin.model.dao.AdminFundingDao;
import com.kh.foodding.admin.model.vo.AdminFunding;
import com.kh.foodding.mypage.model.dao.MyPageDao;

@Service
public class AdminFundingService {

    @Autowired
    private AdminFundingDao adminFundingDao;

    @Autowired
    private MyPageDao myPageDao;

    // 🚨 이 메서드가 없어서 에러가 발생한 것입니다.
    public List<AdminFunding> getAdminFundingList(String status, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        params.put("keyword", keyword);
        
        // DAO의 메서드 호출
        return adminFundingDao.selectAdminFundingList(params);
    }

    /**
     * ✅ 관리자가 강제로 주문 상태를 취소로 변경
     */
    @Transactional
    public boolean forceCancelFunding(String orderNo) {
        int updated = adminFundingDao.updateOrderStatusToCancelByAdmin(orderNo);
        if (updated > 0) {
            myPageDao.updateProductAmountDecrease(orderNo);
            return true;
        }
        return false;
    }
}
