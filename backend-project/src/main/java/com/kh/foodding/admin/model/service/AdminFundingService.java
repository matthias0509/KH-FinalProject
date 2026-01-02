package com.kh.foodding.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.admin.model.dao.AdminFundingDao;
import com.kh.foodding.admin.model.vo.AdminFunding;

@Service
public class AdminFundingService {

    @Autowired
    private AdminFundingDao adminFundingDao;

    // 🚨 이 메서드가 없어서 에러가 발생한 것입니다.
    public List<AdminFunding> getAdminFundingList(String status, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        params.put("keyword", keyword);
        
        // DAO의 메서드 호출
        return adminFundingDao.selectAdminFundingList(params);
    }
}