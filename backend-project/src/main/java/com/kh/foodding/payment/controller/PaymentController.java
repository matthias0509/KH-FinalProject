package com.kh.foodding.payment.controller;

import com.kh.foodding.payment.model.dao.PaymentConfirmRequest;
import com.kh.foodding.payment.model.dao.PaymentConfirmResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${toss.payment.secret-key}")
    private String secretKey;

    @PostMapping("/confirm")
    public ResponseEntity<PaymentConfirmResponse> confirmPayment(
            @RequestBody PaymentConfirmRequest request) {
    	
    	System.out.println("TOSS SECRET KEY = [" + secretKey + "]");
        
        try {
            // 토스페이먼츠 API URL
            String url = "https://api.tosspayments.com/v1/payments/confirm";
            
            // Authorization 헤더 생성
            String auth = secretKey + ":";
            String encodedAuth = Base64.getEncoder()
                    .encodeToString(auth.getBytes(StandardCharsets.UTF_8));
            
            // 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Basic " + encodedAuth);
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // 요청 바디
            Map<String, Object> body = new HashMap<>();
            body.put("paymentKey", request.getPaymentKey());
            body.put("orderId", request.getOrderId());
            body.put("amount", request.getAmount());
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            
            // RestTemplate으로 API 호출
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> apiResponse = restTemplate.exchange(
                    url, 
                    HttpMethod.POST, 
                    entity, 
                    Map.class
            );
            
            // 성공 응답
            PaymentConfirmResponse response = new PaymentConfirmResponse(
                    true,
                    "결제 승인 완료",
                    apiResponse.getBody()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            // 실패 응답
            PaymentConfirmResponse response = new PaymentConfirmResponse(
                    false,
                    "결제 승인 실패: " + e.getMessage(),
                    null
            );
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}