package com.kh.foodding.member.model.vo;

import java.sql.Date;
import java.time.LocalDate;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Schema(name="Member", description="TB_USER 테이블 정보를 담는 VO 클래스 입니다.")
@Alias("member")
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Member {
    
    // DB 컬럼명과 일치하는 필드 추가 및 수정
    @Schema(description="회원 번호 (PK)")
    private int userNo; // USER_NO NUMBER
    
    @Schema(description="회원 아이디", example="user01")
    private String userId;      // USER_ID VARCHAR2(20 BYTE)
    
    @Schema(description="회원 비밀번호", example="암호화된 문자열")
    private String userPwd;     // USER_PWD VARCHAR2(100 BYTE)
    
    @Schema(description="회원 이름", example="홍길동")
    private String userName;    // USER_NAME VARCHAR2(20 BYTE)
    
    @Schema(description="닉네임", example="여행가")
    private String nickname;    // NICKNAME VARCHAR2(24 BYTE) 
    
    @Schema(description="생년월일", example="1990-01-01")
    // 💡 @DateTimeFormat 어노테이션은 이제 필요 없습니다. (LocalDate가 자동 처리)
    private LocalDate birthDate;
    
    @Schema(description="성별", example="M")
    private String gender;      // GENDER VARCHAR2(1 BYTE)
    
    @Schema(description="회원 이메일", example="user01@naver.com")
    private String email;       // EMAIL VARCHAR2(50 BYTE)
    
    @Schema(description="전화번호", example="010-3333-4444")
    private String phone;       // PHONE VARCHAR2(13 BYTE)
    
    @Schema(description="원본 프로필 파일명")
    private String originProfile; // ORIGIN_PROFILE VARCHAR2(100)
    
    @Schema(description="수정된 프로필 파일명")
    private String modifyProfile; // MODIFY_PROFILE VARCHAR2(100)
    
    @Schema(description="우편번호", example="06973")
    private String postcode;    // POSTCODE VARCHAR2(10 BYTE)
    
    @Schema(description="주 기본 주소", example="서울시 마포구")
    private String mainAddress; // MAIN_ADDRESS VARCHAR2(100 BYTE)
    
    @Schema(description="주 상세 주소", example="101호")
    private String detailAddress; // DETAIL_ADDRESS VARCHAR2(200 BYTE)
    
    @Schema(description="회원가입일", example="2025-12-05")
    private Date enrollDate;    // ENROLL_DATE DATE
    
    @Schema(description="회원 탈퇴 여부 (Y/N)", example="N")
    private String userYn;      // USER_YN VARCHAR2(1 BYTE)
    
    @Schema(description="회원 권한", example="USER")
    private String userRole;    // USER_ROLE VARCHAR2(6 BYTE)
}


