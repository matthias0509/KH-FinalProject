package com.kh.foodding.seller.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.seller.model.vo.SellerApplication;

@Repository
public class SellerApplicationDao {

    public int insertApplication(SqlSessionTemplate sqlSession, SellerApplication application) {
        return sqlSession.insert("sellerApplicationMapper.insertApplication", application);
    }

    public SellerApplication selectLatestByUser(SqlSessionTemplate sqlSession, long userNo) {
        return sqlSession.selectOne("sellerApplicationMapper.selectLatestByUser", userNo);
    }

    public List<SellerApplication> selectActivePendingByUser(SqlSessionTemplate sqlSession, long userNo) {
        return sqlSession.selectList("sellerApplicationMapper.selectActivePendingByUser", userNo);
    }

    public List<SellerApplication> selectByStatus(SqlSessionTemplate sqlSession, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        return sqlSession.selectList("sellerApplicationMapper.selectByStatus", params);
    }

    public int updateStatus(SqlSessionTemplate sqlSession, long applicationNo, String status, String adminMemo) {
        Map<String, Object> params = new HashMap<>();
        params.put("applicationNo", applicationNo);
        params.put("status", status);
        params.put("adminMemo", adminMemo);
        return sqlSession.update("sellerApplicationMapper.updateStatus", params);
    }

    public SellerApplication selectById(SqlSessionTemplate sqlSession, long applicationNo) {
        return sqlSession.selectOne("sellerApplicationMapper.selectById", applicationNo);
    }
}
