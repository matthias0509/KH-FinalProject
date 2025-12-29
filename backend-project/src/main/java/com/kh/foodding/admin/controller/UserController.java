package com.kh.foodding.admin.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kh.foodding.admin.model.service.UserService;
import com.kh.foodding.admin.vo.User;


@RestController
@RequestMapping("/api/admin/user") // URL은 Rest API 규칙에 맞춰 설정
@CrossOrigin(origins = {"http://localhost:5173"})
public class UserController {

    @Autowired
    private UserService userService;

    // 1. 회원 목록 조회
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getUserList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "all") String status,
            @RequestParam(required = false) String keyword
    ) {
        Map<String, Object> result = userService.getUserList(page, size, status, keyword);
        return ResponseEntity.ok(result);
    }

    // 2. 회원 정보 수정
    @PutMapping("/update")
    public ResponseEntity<String> updateUserInfo(@RequestBody User user) {
    	
    	System.out.println("🔥 프론트에서 받은 데이터: " + user.toString());
    	
        if(userService.updateUserInfo(user)) {
            return ResponseEntity.ok("회원 정보가 수정되었습니다.");
        }
        return ResponseEntity.badRequest().body("수정 실패");
    }

    // 3. 회원 상태 변경
    @PutMapping("/status")
    public ResponseEntity<String> updateUserStatus(@RequestBody User user) {
        if(userService.updateUserStatus(user)) {
            return ResponseEntity.ok("회원 상태가 변경되었습니다.");
        }
        return ResponseEntity.badRequest().body("상태 변경 실패");
    }
}