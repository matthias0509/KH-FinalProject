package com.kh.foodding.payment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.kh.foodding.payment.model.dto.PaymentConfirmRequest;
import com.kh.foodding.payment.model.dto.PaymentConfirmResponse;
import com.kh.foodding.payment.model.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(
	    originPatterns = {"http://localhost:5173", "http://localhost:3000"},
	    allowCredentials = "true",
	    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
	)
public class PaymentController {
    
    private final PaymentService paymentService;
    
    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/confirm")
    public ResponseEntity<PaymentConfirmResponse> confirmPayment(
            @RequestBody PaymentConfirmRequest request) {
        
        try {
            // Service에 모든 로직 위임
            PaymentConfirmResponse response = paymentService.processPayment(request);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            PaymentConfirmResponse response = new PaymentConfirmResponse(
                    false,
                    "결제 처리 실패: " + e.getMessage(),
                    null
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}