package com.kh.foodding.admin.model.vo;

import lombok.Data;

@Data
public class User {
    private int userNo;           // USER_NO
    private String userId;        // USER_ID
    private String userPwd;       // USER_PWD
    private String userName;      // USER_NAME
    private String nickname;      // NICKNAME
    private String birthDate;     // BIRTH_DATE
    private String gender;        // GENDER
    private String email;         // EMAIL
    private String phone;         // PHONE
    private String postcode;      // POSTCODE
    private String mainAddress;   // MAIN_ADDRESS
    
    // 👇 상세 주소는 React 모달에서 수정하므로 필수!
    private String detailAddress; // DETAIL_ADDRESS
    
    private String enrollDate;    // ENROLL_DATE
    private String userYn;        // USER_YN
    private String userRole;      // USER_ROLE
    
    // 화면 목록용 추가 필드
    private long accumFund;       // 누적 후원액
}