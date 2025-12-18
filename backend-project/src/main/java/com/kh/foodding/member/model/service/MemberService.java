package com.kh.foodding.member.model.service;

import java.io.File;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.member.dao.MemberDao;
import com.kh.foodding.member.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberDao memberDao;
    private final String savePath = "D:/foodding/profile_images/"; // 파일 저장 경로를 상수로 관리

    public int insertMember(Member m, MultipartFile upfile) {
    	System.out.println("전달된 upfile: " + (upfile != null ? upfile.getOriginalFilename() : "NULL"));
    	// 💡 저장 경로 폴더가 없으면 생성하는 코드 추가
        File folder = new File(savePath);
        if (!folder.exists()) {
            folder.mkdirs(); // d:/fooding/profile_images/ 폴더를 생성함
        }
        
        if (upfile != null && !upfile.isEmpty()) {
            // 💡 파일 첨부가 있을 경우
            String originFileName = upfile.getOriginalFilename();
            m.setOriginProfile(originFileName);
            
            // 1. 수정 파일명 생성 (밀리초 기반 + 5자리 랜덤 숫자)
            long timeMillis = System.currentTimeMillis(); // 현재 시각 (밀리초)
            int randomNumber = (int)(Math.random() * 90000 + 10000); // 5자리 랜덤 숫자 (10000 ~ 99999)
            
            // 최종 수정 파일명: 예) 1734567890123_45678.png
            String changeFileName = timeMillis + "_" + randomNumber + originFileName; 
            m.setModifyProfile(changeFileName); 
            
            // 2. 파일을 지정된 경로에 실제로 저장
            try {
                upfile.transferTo(new File(savePath + changeFileName));
            } catch (Exception e) {
                // 파일 저장 실패 시 예외 처리
                e.printStackTrace();
            }
            
        } else {
            // 💡 파일 첨부가 없을 경우: 기본 이미지로 설정
        	// DB에 이모지 문자열 저장
            m.setOriginProfile("푸딩 이모지");
            // 클라이언트에서 이모지임을 판단할 수 있는 키워드를 저장합니다.
            m.setModifyProfile("🍮");
        }
        
        // 4. DB에 회원 정보 삽입 (MyBatis/DAO 호출)
        return memberDao.insertMember(m); 
    }
    
    public int idCheck(String userId) {
    	return memberDao.idCheck(userId);
    }
    
    public int nicknameCheck(String nickname) {
    	return memberDao.nicknameCheck(nickname);
    }
    
    public int emailCheck(Member m) {
    	return memberDao.emailCheck(m);
    }
    
    public String findId(String email) {
    	return memberDao.findId(email);
    }

}
