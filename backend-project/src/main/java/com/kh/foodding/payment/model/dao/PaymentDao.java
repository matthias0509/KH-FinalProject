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
}