package com.kh.foodding.cs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.config.JWTUtil;
import com.kh.foodding.cs.model.service.CSService;
import com.kh.foodding.cs.model.vo.Qna;

@RestController
@RequestMapping("/inquiry")
@CrossOrigin(origins = "http://localhost:5173")
public class CSController {
	
	@Autowired
	private JWTUtil jwtUtil;
	
	@Autowired
	private CSService csService;
	
	@PostMapping("/insert")
	public String insertInquiry(@RequestHeader("Authorization") String token, @RequestBody Qna qna) {
		String jwtToken = token.substring(7);
		int userNo = jwtUtil.extractUserNo(jwtToken);
		
		System.out.println("userNo : "+ userNo);
		System.out.println("QNA : "+ qna);
		
		qna.setUserNo(userNo);
		
		int result = csService.insertInquiry(qna);
		return result > 0 ? "success" : "fail";
	}
	
	@GetMapping("/list")
	public List<Qna> selectInquiryList(@RequestHeader("Authorization") String token){
		String jwtToken = token.substring(7);
		int userNo = jwtUtil.extractUserNo(jwtToken);
		
		return csService.selectInquiryList(userNo);
	}

}
