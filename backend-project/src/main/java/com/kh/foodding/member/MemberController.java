package com.kh.foodding.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.member.model.service.MemberService;
import com.kh.foodding.member.model.vo.Member;

// 💡 @CrossOrigin은 SecurityConfig에서 처리했다면 삭제하는 것이 좋습니다.
@RestController 
@RequestMapping("/")
public class MemberController {
	
	private final MemberService memberService;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public MemberController(MemberService memberService) {
	    this.memberService = memberService;
	}
	
    @PostMapping("/member/insert")
    // 💡 반환 타입을 ResponseEntity<String>으로 변경
    public ResponseEntity<String> insertMember(
        @ModelAttribute Member m, 
        @RequestPart(value = "upfile", required = false) MultipartFile upfile
    ) {
        
        m.setUserRole("USER");
        m.setUserPwd(bCryptPasswordEncoder.encode(m.getUserPwd())); 
        
        System.out.println("암호화 후 비밀번호 (Controller): " + m.getUserPwd()); // 💡 디버깅 로그

        int result = memberService.insertMember(m, upfile);

        if (result > 0) {
            // 💡 성공: 200 OK 반환
            return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
        } else {
            // 💡 실패: 500 INTERNAL_SERVER_ERROR 반환 (프론트에서 catch 처리됨)
            return new ResponseEntity<>("DB 저장 중 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
}