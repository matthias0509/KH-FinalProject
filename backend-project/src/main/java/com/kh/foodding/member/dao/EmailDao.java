package com.kh.foodding.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import lombok.RequiredArgsConstructor;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class EmailDao {

    private final SqlSessionTemplate sqlSession;

    // 인증번호 저장 (기존 데이터가 있으면 업데이트, 없으면 삽입)
    public int insertAuthCode(Map<String, Object> authInfo) {
        // MERGE 문을 사용하면 편리합니다.
        return sqlSession.insert("authMapper.insertAuthCode", authInfo);
    }

    // 인증번호 확인
    public String selectAuthCode(String email) {
        return sqlSession.selectOne("authMapper.selectAuthCode", email);
    }

    // 인증 완료 후 데이터 삭제 (선택 사항)
    public int deleteAuthCode(String email) {
        return sqlSession.delete("authMapper.deleteAuthCode", email);
    }
}