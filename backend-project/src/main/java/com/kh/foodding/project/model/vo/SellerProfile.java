package com.kh.foodding.project.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// 상세/심사 화면에 필요한 판매자 프로필 정보를 담는 VO
public class SellerProfile {

    private Long sellerNo;
    private Long userNo;
    private String sellerName;
    private String nickname;
    private String email;
    private String phone;
    private String introduction;
    private String profileImage;
}
