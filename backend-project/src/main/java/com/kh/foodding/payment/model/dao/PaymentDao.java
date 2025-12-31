package com.kh.foodding.payment.model.dao;

import com.kh.foodding.payment.model.vo.Orders;
import com.kh.foodding.payment.model.vo.OrderDetail;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PaymentDao {
    
    // 주문 정보 저장
    public int insertOrder(SqlSessionTemplate sqlSession, Orders order) {
        return sqlSession.insert("paymentMapper.insertOrder", order);
    }
    
    // 상세 주문 정보 저장
    public int insertOrderDetail(SqlSessionTemplate sqlSession, OrderDetail orderDetail) {
        return sqlSession.insert("paymentMapper.insertOrderDetail", orderDetail);
    }
    
    // ★ 추가: optionNo로 productNo 조회
    public Integer getProductNoByOptionNo(SqlSessionTemplate sqlSession, Integer optionNo) {
        return sqlSession.selectOne("paymentMapper.getProductNoByOptionNo", optionNo);
    }
    
    // ★ 추가: 프로젝트 현재 금액 업데이트
    public int updateProjectCurrentAmount(SqlSessionTemplate sqlSession, Integer productNo, Integer amount) {
        java.util.Map<String, Object> params = new java.util.HashMap<>();
        params.put("productNo", productNo);
        params.put("amount", amount);
        return sqlSession.update("paymentMapper.updateProjectCurrentAmount", params);
    }
}