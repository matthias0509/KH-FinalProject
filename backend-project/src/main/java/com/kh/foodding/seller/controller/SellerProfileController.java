package com.kh.foodding.seller.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.seller.model.service.SellerProfileService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("seller/profile")
public class SellerProfileController {

    @Autowired
    private final SellerProfileService sellerProfileService;

    @GetMapping("status")
    public ResponseEntity<Map<String, Object>> status(@RequestParam long userNo) {
        boolean hasProfile = sellerProfileService.hasProfile(userNo);
        Map<String, Object> response = new HashMap<>();
        response.put("hasProfile", hasProfile);
        return ResponseEntity.ok(response);
    }
}
