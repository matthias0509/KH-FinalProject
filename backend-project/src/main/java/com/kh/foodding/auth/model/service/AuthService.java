package com.kh.foodding.auth.model.service;

import com.kh.foodding.member.model.vo.Member;

public interface AuthService {
	
	Member login(String userId);

}
