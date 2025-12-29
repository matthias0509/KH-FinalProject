package com.kh.foodding.mypage.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyPage {
    private int userNo;
    private String userId;
    private String userPwd;      // DB: USER_PWD 
    private String userName;     // DB: USER_NAME 
    private String nickname;
    private String email;
    private String phone;
    private String modifyProfile; // DB: MODIFY_PROFILE
    private String postcode;      // DB: POSTCODE
    private String mainAddress;   // DB: MAIN_ADDRESS
    private String detailAddress; // DB: DETAIL_ADDRESS
    private String userRole;      // DB: USER_ROLE
}