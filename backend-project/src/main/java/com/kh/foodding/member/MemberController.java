package com.kh.foodding.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.member.model.service.MemberService;
import com.kh.foodding.member.model.vo.Member;

import lombok.RequiredArgsConstructor;


@RestController 
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberService memberService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
    @PostMapping("/insert")
    // 💡 반환 타입을 ResponseEntity<String>으로 변경
    public ResponseEntity<String> insertMember(
        @ModelAttribute Member m, 
        @RequestPart(value = "upfile", required = false) MultipartFile upfile
    ) {
        
        m.setUserRole("USER");
        m.setUserPwd(bCryptPasswordEncoder.encode(m.getUserPwd())); 
        
        //System.out.println("암호화 후 비밀번호 (Controller): " + m.getUserPwd()); // 💡 디버깅 로그

        int result = memberService.insertMember(m, upfile);

        if (result > 0) {
            // 💡 성공: 200 OK 반환
            return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
        } else {
            // 💡 실패: 500 INTERNAL_SERVER_ERROR 반환 (프론트에서 catch 처리됨)
            return new ResponseEntity<>("DB 저장 중 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    
    @GetMapping("/idCheck")
    public String idCheck(String userId) {
    	int count = memberService.idCheck(userId);
    	return count >0 ? "notAvailable" : "available";
    }
    
    @GetMapping("nicknameCheck")
    public String nicknameCheck(String nickname) {
    	int count = memberService.nicknameCheck(nickname);
    	return count > 0 ? "notAvailable" : "available";
    }
    
    @PostMapping("/emailCheck")
    public String emailCheck(@RequestBody Member m) {
    	int count = memberService.emailCheck(m);
    	
    	if(count>0) {
    		return "MATCH";
    	}else {
    		return "FAIL";
    	}
    }
    
    @GetMapping("/findId")
    public String findId(String email) {
    	String userId = memberService.findId(email);
    	return userId;
    }
    
    @PostMapping("/idEmailCheck")
    public String idEmailCheck(@RequestBody Member m) {
    	//System.out.println(m);
    	int count = memberService.idEmailCheck(m);
    	//System.out.println("count : " + count);
    	if (count > 0) {    		
    		return "MATCH";
    	}else {
    		return "FAIL";
    	}
    }
    
    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody Member m) {
    	// System.out.println(m);
    	int result = memberService.updatePassword(m);
    	if (result>0) {
    		return "success";
    	} else {
    		return "fail";
    	}
    }
}