package com.kh.foodding.member.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.member.model.service.EmailService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    // 인증번호 발송 요청
    @PostMapping("/send")
    public String sendEmail(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        String code = emailService.createCode();

        try {
            emailService.sendEmail(email, code);
            session.setAttribute("emailCode", code);
            session.setAttribute("targetEmail", email);
            //System.out.println("발급된 인증번호: " + code);
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    @PostMapping("/verify")
    public boolean verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String userCode = request.get("code");
        return emailService.verifyCode(email, userCode);
    }
}
