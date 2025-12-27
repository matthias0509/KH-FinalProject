package com.kh.foodding.project.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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
