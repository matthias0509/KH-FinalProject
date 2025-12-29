package com.kh.foodding.seller.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.project.model.vo.SellerProfile;

@Repository
public class SellerProfileDao {

    public Long selectSellerNoByUser(SqlSessionTemplate sqlSession, Long userNo) {
        if (userNo == null) {
            return null;
        }
        return sqlSession.selectOne("sellerMapper.selectSellerNoByUser", userNo);
    }

    public Long insertSellerProfile(SqlSessionTemplate sqlSession, Long userNo, String introduction) {
        if (userNo == null) {
            return null;
        }
        Map<String, Object> params = new HashMap<>();
        params.put("userNo", userNo);
        params.put("introduction", introduction);
        sqlSession.insert("sellerMapper.insertSellerProfile", params);
        Object sellerNo = params.get("sellerNo");
        return sellerNo instanceof Number ? ((Number) sellerNo).longValue() : null;
    }

    public SellerProfile selectSellerProfile(SqlSessionTemplate sqlSession, Long sellerNo) {
        if (sellerNo == null) {
            return null;
        }
        return sqlSession.selectOne("sellerMapper.selectSellerProfile", sellerNo);
    }
}
