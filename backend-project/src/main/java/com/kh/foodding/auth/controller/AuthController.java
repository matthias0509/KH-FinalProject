package com.kh.foodding.auth.controller;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.auth.model.service.AuthService;
import com.kh.foodding.member.model.vo.Member;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/")
public class AuthController {
	
	public static final String secretKey = "Hello123KHAcademy456Dangsan789WelcomeToEClass";

	@Autowired
	private AuthService authService;

	@Autowired	
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	@PostMapping("login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Member m) {

		System.out.println("========== 로그인 시도 ==========");
		System.out.println("입력한 ID: " + m.getUserId());
		System.out.println("입력한 PW: " + m.getUserPwd());

		// 1. 아이디로 DB에서 회원 정보 조회
		Member loginUser = authService.login(m.getUserId());
	
		if (loginUser == null) {
			System.out.println("❌ 로그인 실패: 해당 아이디(" + m.getUserId() + ")를 가진 유저가 DB에 없음");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

		System.out.println("DB에 저장된 암호화 PW: " + loginUser.getUserPwd());
		
		// 비밀번호 일치 여부 확인
		boolean isPwdMatch = bcryptPasswordEncoder.matches(m.getUserPwd(), loginUser.getUserPwd());
		System.out.println("비밀번호 일치 여부: " + isPwdMatch);

		if (isPwdMatch) {
			System.out.println("✅ 로그인 성공! 토큰 생성 시작");

			// 2. 키 생성
			Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
		
			// 3. JWT 생성
			String jwt = Jwts.builder()
				.setSubject(loginUser.getUserId()) 
				.claim("name", loginUser.getUserName()) 
				.claim("role", loginUser.getUserRole()) 
				.claim("userNo", loginUser.getUserNo())
				.claim("userRole", loginUser.getUserRole())
				.setIssuedAt(new Date()) 
				.setExpiration(new Date(System.currentTimeMillis() + 1 * 60 * 60 * 1000)) 
				.signWith(key, SignatureAlgorithm.HS256) 
				.compact();
		
			// 4. 응답 데이터 생성
			Map<String, Object> response = new HashMap<>();
			response.put("token", jwt);
			
			// 보안상 비밀번호 제거
			loginUser.setUserPwd(""); 
			response.put("user", loginUser); 

			return ResponseEntity.ok(response);

		} else {
			System.out.println("❌ 로그인 실패: 비밀번호 불일치");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
}