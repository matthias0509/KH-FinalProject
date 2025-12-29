package com.kh.foodding.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.config.JWTUtil;
import com.kh.foodding.notice.model.service.NoticeService;
import com.kh.foodding.notice.model.vo.Notice;

@RestController
@RequestMapping("/notice")
@CrossOrigin(origins = "http://localhost:5173")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@Autowired
	private JWTUtil jwtUtil;
	
	@PostMapping("/write")
	public String insertNotice(@RequestHeader("Authorization") String token,
			@RequestBody Notice notice) {
		String jwtToken = token.substring(7);
		String role = jwtUtil.extractUserRole(jwtToken);
		
		if(!"ADMIN".equals(role)) {
			return "no_auth";
		}
		int result = noticeService.insertNotice(notice);
		return result > 0 ? "success" : "fail";
	}
	
	@GetMapping("/list")
	public Map<String, Object> selectNoticeList(
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "") String keyword){
		int limit = 7;
		return noticeService.selectNoticeList(page, keyword, limit);
	}
	
	@GetMapping("/detail/{noticeNo}")
	public Notice selectNoticeDetail(@PathVariable int noticeNo) {
	    //System.out.println("컨트롤러 요청 번호: " + noticeNo); // 1. 번호가 잘 오는지 확인
	    
	    Notice notice = noticeService.selectNoticeDetail(noticeNo);
	    
	    //System.out.println("조회된 결과: " + notice);
	    return notice;
	}
	
	@PostMapping("/delete")
	public String deleteNotice(@RequestBody Notice notice, @RequestHeader("Authorization") String token) {
	    String jwtToken = token.substring(7);
	    String role = jwtUtil.extractUserRole(jwtToken);
	    
	    if(!"ADMIN".equals(role)) {
	        return "no_auth";
	    }
	    
	    // noticeNo가 담긴 객체에서 번호 추출
	    int result = noticeService.deleteNotice(notice.getNoticeNo());
	    return result > 0 ? "success" : "fail";
	}
	
	@PostMapping("/update")
	public String updateNotice(@RequestHeader("Authorization") String token, @RequestBody Notice notice) {
		String jwtToken = token.substring(7);
		String role = jwtUtil.extractUserRole(jwtToken);
		
		if(!"ADMIN".equals(role)) {
			return "no_auth";
		}
		
		int result = noticeService.updateNotice(notice);
		
		return result > 0 ? "success" : "fail";
	}
	

}
