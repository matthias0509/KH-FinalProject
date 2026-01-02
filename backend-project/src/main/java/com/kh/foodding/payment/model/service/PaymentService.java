package com.kh.foodding.payment.model.service;

import com.kh.foodding.payment.model.dao.PaymentDao;
import com.kh.foodding.payment.model.dto.PaymentConfirmRequest;
import com.kh.foodding.payment.model.dto.PaymentConfirmResponse;
import com.kh.foodding.payment.model.vo.Orders;
import com.kh.foodding.payment.model.vo.OrderDetail;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    
    @Value("${toss.payment.secret-key}")
    private String secretKey;
    
    private final PaymentDao paymentDao;
    private final SqlSessionTemplate sqlSession;
    
    @Autowired
    public PaymentService(PaymentDao paymentDao, SqlSessionTemplate sqlSession) {
        this.paymentDao = paymentDao;
        this.sqlSession = sqlSession;
    }
    
    /**
     * 결제 승인 및 DB 저장 처리
     */
    @Transactional
    public PaymentConfirmResponse processPayment(PaymentConfirmRequest request) {
        
        System.out.println("=== 결제 처리 시작 ===");
        System.out.println("Request: " + request);
        
        // 1. 토스페이먼츠 API 호출
        Map<String, Object> tossResponse = callTossPaymentApi(request);
        
        // 2. DB에 주문 정보 저장
        saveOrderToDatabase(request);
        
        // 3. 프로젝트 현재 금액 업데이트
        updateProjectCurrentAmount(request);
        
        System.out.println("=== 결제 처리 완료 ===");
        
        // 4. 응답 생성
        return new PaymentConfirmResponse(true, "결제 승인 완료", tossResponse);
    }
    
    /**
     * 토스페이먼츠 API 호출
     */
    private Map<String, Object> callTossPaymentApi(PaymentConfirmRequest request) {
        try {
            String url = "https://api.tosspayments.com/v1/payments/confirm";
            
            String auth = secretKey + ":";
            String encodedAuth = Base64.getEncoder()
                    .encodeToString(auth.getBytes(StandardCharsets.UTF_8));
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Basic " + encodedAuth);
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            Map<String, Object> body = new HashMap<>();
            body.put("paymentKey", request.getPaymentKey());
            body.put("orderId", request.getOrderId());
            body.put("amount", request.getAmount());
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.exchange(
                    url, 
                    HttpMethod.POST, 
                    entity, 
                    Map.class
            );
            
            System.out.println("토스페이먼츠 응답: " + response.getBody());
            return response.getBody();
            
        } catch (Exception e) {
            System.err.println("토스 API 호출 실패: " + e.getMessage());
            throw new RuntimeException("토스페이먼츠 결제 승인 실패", e);
        }
    }
    
    /**
     * 주문 정보 DB 저장
     */
    private void saveOrderToDatabase(PaymentConfirmRequest request) {
        try {
            // ★ 배송비 제외한 상품 금액만 사용
            Integer orderAmount = request.getProductAmount() != null 
                ? request.getProductAmount() 
                : request.getAmount() - 3000;  // productAmount가 없으면 총액에서 배송비 제거
            
            // Orders 객체 생성
            Orders order = new Orders();
            order.setOrderNo(request.getOrderId());
            order.setOrderAmount(orderAmount);  // ★ 상품 금액만 저장
            order.setOrderStatus("PAY");
            order.setDeliveryStatus("READY");
            order.setPostcode(request.getPostcode() != null ? request.getPostcode() : "00000");
            order.setAddress(request.getAddress() != null ? request.getAddress() : "주소 미입력");
            order.setUserNo(request.getUserNo() != null ? request.getUserNo() : 1);
            
            // OrderDetail 객체 생성
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setQuantity(request.getQuantity() != null ? request.getQuantity() : 1);
            orderDetail.setOrderNo(request.getOrderId());
            orderDetail.setOptionNo(request.getOptionNo() != null ? request.getOptionNo() : 1);
            
            System.out.println("DB 저장 - Orders: " + order);
            System.out.println("DB 저장 - OrderDetail: " + orderDetail);
            
            // DAO 호출
            int orderResult = paymentDao.insertOrder(sqlSession, order);
            int detailResult = paymentDao.insertOrderDetail(sqlSession, orderDetail);
            
            if (orderResult == 0 || detailResult == 0) {
                throw new RuntimeException("주문 정보 DB 저장 실패");
            }
            
            System.out.println("DB 저장 완료");
            
        } catch (Exception e) {
            System.err.println("DB 저장 실패: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("주문 정보 저장 실패", e);
        }
    }
    
    /**
     * 프로젝트 현재 후원 금액 업데이트
     */
    private void updateProjectCurrentAmount(PaymentConfirmRequest request) {
        try {
            // Option 테이블에서 productNo 조회 필요
            Integer productNo = paymentDao.getProductNoByOptionNo(sqlSession, request.getOptionNo());
            
            if (productNo == null) {
                System.err.println("상품 번호를 찾을 수 없습니다. optionNo: " + request.getOptionNo());
                return;
            }
            
            // ★ 배송비 제외한 상품 금액만 사용
            Integer productAmount = request.getProductAmount() != null 
                ? request.getProductAmount() 
                : request.getAmount() - 3000;
            
            // 결제 금액만큼 현재 금액 증가
            int updateResult = paymentDao.updateProjectCurrentAmount(sqlSession, productNo, productAmount);
            
            if (updateResult > 0) {
                System.out.println("프로젝트 현재 금액 업데이트 완료: productNo=" + productNo + ", amount=" + productAmount);
            } else {
                System.err.println("프로젝트 현재 금액 업데이트 실패");
            }
            
        } catch (Exception e) {
            System.err.println("프로젝트 현재 금액 업데이트 실패: " + e.getMessage());
            e.printStackTrace();
            // 이 부분은 실패해도 전체 트랜잭션을 롤백하지 않도록 예외를 던지지 않음
        }
    }
}