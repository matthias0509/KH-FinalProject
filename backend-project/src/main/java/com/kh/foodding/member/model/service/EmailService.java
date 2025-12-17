package com.kh.foodding.member.model.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.kh.foodding.member.dao.EmailDao;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailDao emailDao;

    public String createCode() {
        Random random = new Random();
        int code = random.nextInt(888889) + 111111;
        return String.valueOf(code);
    }

    public void sendEmail(String toEmail, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject("[Foodding] 회원가입 인증번호입니다.");
        
        String content = "<div style='padding:20px; border:1px solid #ddd;'>"
                       + "<h3>인증번호: " + code + "</h3>"
                       + "</div>";
        
        helper.setText(content, true);
        mailSender.send(message);

        Map<String, Object> authInfo = new HashMap<>();
        authInfo.put("email", toEmail);
        authInfo.put("code", Integer.parseInt(code)); 
        
        emailDao.insertAuthCode(authInfo);
    }

    public boolean verifyCode(String email, String userCode) {
        String serverCode = emailDao.selectAuthCode(email);
        if (serverCode != null && serverCode.equals(userCode)) {
            emailDao.deleteAuthCode(email);
            return true;
        }
        return false;
    }
}