package com.kh.foodding.auth.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.foodding.member.model.vo.Member;

@Repository // 💡 스프링 빈으로 등록
public class AuthDao {
    
    // 💡 SqlSessionTemplate 주입
    @Autowired 
    private SqlSessionTemplate sqlSession; 

    /**
     * 특정 사용자 아이디(userId)로 회원 정보(비밀번호 검증, 권한 확인에 필요한 정보)를 조회합니다.
     * * @param userId 로그인 시도 아이디
     * @return 조회된 Member 객체 (조건 불일치 시 null)
     */
    // SqlSessionTemplate을 직접 메서드 인수로 받지 않고 필드를 사용하도록 수정합니다.
    public Member selectMemberForLogin(String userId) {
        
        // 💡 sqlSession.selectOne() 호출
        // "authMapper.selectMemberForLogin"는 맵퍼 XML의 namespace.id 형식입니다.
        return sqlSession.selectOne("authMapper.selectMemberForLogin", userId);
    }
}