package com.kh.foodding.auth.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.auth.model.dao.AuthDao;
import com.kh.foodding.member.model.vo.Member;

@Service
public class AuthServiceImpl implements AuthService{
	
	// 💡 DAO만 주입 받습니다.
    @Autowired
    private AuthDao authDao;
    
    // ❌ SqlSessionTemplate 주입 및 필드는 제거합니다.
    // @Autowired
    // private SqlSessionTemplate sqlSession; 

    @Override
    public Member login(String userId) {
        // 💡 DAO 메서드 호출 시 SqlSessionTemplate을 전달하지 않고 userId만 전달합니다.
        // DAO가 이미 SqlSessionTemplate을 가지고 있기 때문입니다.
        return authDao.selectMemberForLogin(userId); // DAO 메서드명에 맞게 호출
    }

}
