package com.kh.foodding.auth.controller;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
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


	// 로그인용 (ResponseEntity를 사용하여 HTTP 응답 상태를 명확히 함)

	@PostMapping("login")

	public String login(@RequestBody Member m) {


		// 1. 아이디로 DB에서 회원 정보 조회 (탈퇴 여부, 권한 ADMIN 여부까지 쿼리문으로 검사)
	
		Member loginUser = authService.login(m.getUserId());
	
		System.out.println("사용자 입력 비밀번호 (평문): " + m.getUserPwd());
	    System.out.println("DB 해시 비밀번호: " + loginUser.getUserPwd());
	
		if ((loginUser != null)
	
		&& (bcryptPasswordEncoder.matches(m.getUserPwd(), loginUser.getUserPwd()))) {
	
	
			// 2 문자열 타입의 비밀 키를 서명을 위한 Key 객체로 가공
		
			Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
		
		
			// 3 JWT 생성
		
			String jwt = Jwts.builder()
		
			.setSubject(loginUser.getUserId()) // 회원을 구분하는 고유값
		
			.claim("name", loginUser.getUserName()) // 회원의 이름
		
			.claim("role", loginUser.getUserRole()) // 회원의 권한
		
			.setIssuedAt(new Date()) // JWT 발급시간
		
			// 1시간 (60분 * 60초 * 1000ms) 뒤 만료 설정
		
			.setExpiration(new Date(System.currentTimeMillis() + 1 * 60 * 60 * 1000))
		
			.signWith(key, SignatureAlgorithm.HS256) // 서명 시 필요한 키, 알고리즘 지정
		
			.compact(); // 최종 토큰 문자열 생성
		
		
			// 4. 응답 데이터 리턴
		
			return jwt;


		} else {

			return null;
		}

	}
}
