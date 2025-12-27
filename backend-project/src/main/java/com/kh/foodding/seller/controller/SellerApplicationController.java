package com.kh.foodding.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;

import com.kh.foodding.seller.model.service.SellerApplicationService;
import com.kh.foodding.seller.model.vo.SellerApplication;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("seller/applications")
public class SellerApplicationController {

    private final SellerApplicationService sellerApplicationService;

    @PostMapping
    public ResponseEntity<?> apply(@RequestBody SellerApplication request) {
        try {
            SellerApplication application = sellerApplicationService.apply(request);
            return ResponseEntity.ok(application);
        } catch (IllegalStateException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<SellerApplication> myApplication(@RequestParam long userNo) {
        SellerApplication application = sellerApplicationService.getMyLatestApplication(userNo);
        if (application == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(application);
    }

    @GetMapping
    public ResponseEntity<List<SellerApplication>> list(@RequestParam(defaultValue = "ALL") String status) {
        return ResponseEntity.ok(sellerApplicationService.getApplications(status));
    }

    @PatchMapping("/{applicationNo}")
    public ResponseEntity<?> review(
        @PathVariable long applicationNo,
        @RequestBody SellerApplication request
    ) {
        try {
            SellerApplication updated = sellerApplicationService.reviewApplication(
                applicationNo,
                request.getStatus(),
                request.getAdminMemo()
            );
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
