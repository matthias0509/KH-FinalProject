package com.kh.foodding.project.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
// 프로젝트 좋아요/팔로우 관련 쿼리를 모은 DAO
public class ProjectInteractionDao {

    // 해당 프로젝트의 총 좋아요 수
    public long countLikes(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectOne("projectInteractionMapper.countLikes", productNo);
    }

    // 사용자가 이미 좋아요했는지 확인
    public boolean hasLiked(SqlSessionTemplate sqlSession, long productNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("userNo", userNo);
        Integer result = sqlSession.selectOne("projectInteractionMapper.hasLiked", params);
        return result != null && result > 0;
    }

    // 좋아요 추가
    public int insertLike(SqlSessionTemplate sqlSession, long productNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("userNo", userNo);
        return sqlSession.insert("projectInteractionMapper.insertLike", params);
    }

    // 좋아요 취소
    public int deleteLike(SqlSessionTemplate sqlSession, long productNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("userNo", userNo);
        return sqlSession.delete("projectInteractionMapper.deleteLike", params);
    }

    // 판매자 팔로워 수
    public long countFollowers(SqlSessionTemplate sqlSession, long sellerNo) {
        return sqlSession.selectOne("projectInteractionMapper.countFollowers", sellerNo);
    }

    // 사용자가 해당 판매자를 팔로우 중인지 확인
    public boolean isFollowing(SqlSessionTemplate sqlSession, long sellerNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("userNo", userNo);
        Integer result = sqlSession.selectOne("projectInteractionMapper.isFollowing", params);
        return result != null && result > 0;
    }

    // 팔로우 추가
    public int insertFollow(SqlSessionTemplate sqlSession, long sellerNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("userNo", userNo);
        return sqlSession.insert("projectInteractionMapper.insertFollow", params);
    }

    // 팔로우 취소
    public int deleteFollow(SqlSessionTemplate sqlSession, long sellerNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("userNo", userNo);
        return sqlSession.delete("projectInteractionMapper.deleteFollow", params);
    }
}
