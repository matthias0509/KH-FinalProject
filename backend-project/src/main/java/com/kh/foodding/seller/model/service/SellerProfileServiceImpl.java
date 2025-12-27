package com.kh.foodding.seller.model.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.seller.model.dao.SellerProfileDao;

@Service
public class SellerProfileServiceImpl implements SellerProfileService {

    @Autowired
    private SellerProfileDao sellerProfileDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public boolean hasProfile(long userNo) {
        return sellerProfileDao.selectSellerNoByUser(sqlSession, userNo) != null;
    }
}
