package com.kh.foodding.member.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kh.foodding.member.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberDao {
	
	// Spring Boot 환경에서는 SqlSessionTemplate을 주입받아 사용합니다.
    private final SqlSession sqlSession;

    /**
     * 새로운 회원을 TB_USER 테이블에 삽입합니다.
     * @param m 회원 정보 (암호화된 비밀번호, 파일명, 권한 포함)
     * @return 삽입된 행의 수 (1이면 성공)
     */
    public int insertMember(Member m) {
        // 💡 member-mapper.xml 파일에서 "insertMember" id를 가진 쿼리를 실행합니다.
        // m 객체에는 userRole, modifyProfile 등이 모두 설정되어 있습니다.
        return sqlSession.insert("authMapper.insertMember", m);
    }
    
    public int idCheck(String userId) {
    	return sqlSession.selectOne("authMapper.idCheck", userId);
    }
    
    public int nicknameCheck(String nickname) {
    	return sqlSession.selectOne("authMapper.nicknameCheck", nickname);
    }
    
    public int emailCheck(Member m) {
    	return sqlSession.selectOne("authMapper.emailCheck", m);
    }
    
    public String findId(String email) {
    	return sqlSession.selectOne("authMapper.findId", email);
    }
    
    public int idEmailCheck(Member m) {
    	return sqlSession.selectOne("authMapper.idEmailCheck", m);
    }
    
    public int updatePassword(Member m) {
    	return sqlSession.update("authMapper.updatePassword", m);
    }

}
