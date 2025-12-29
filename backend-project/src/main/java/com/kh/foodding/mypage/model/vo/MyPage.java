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
    private String password;
    private String name;
    private String nickname;
    private String email;
    private String phone;
    private String profileImageUrl; // MODIFY_PROFILE 컬럼 매핑
    private String role;           // 유저 권한 (supporter/maker)
    private String intro;          // 소개 (필요 시 사용)
}