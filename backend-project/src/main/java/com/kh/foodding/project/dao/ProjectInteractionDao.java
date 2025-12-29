package com.kh.foodding.project.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectInteractionDao {

    public long countLikes(SqlSessionTemplate sqlSession, long productNo) {
        return sqlSession.selectOne("projectInteractionMapper.countLikes", productNo);
    }

    public boolean hasLiked(SqlSessionTemplate sqlSession, long productNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("userNo", userNo);
        Integer result = sqlSession.selectOne("projectInteractionMapper.hasLiked", params);
        return result != null && result > 0;
    }

    public int insertLike(SqlSessionTemplate sqlSession, long productNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("userNo", userNo);
        return sqlSession.insert("projectInteractionMapper.insertLike", params);
    }

    public int deleteLike(SqlSessionTemplate sqlSession, long productNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("userNo", userNo);
        return sqlSession.delete("projectInteractionMapper.deleteLike", params);
    }

    public long countFollowers(SqlSessionTemplate sqlSession, long sellerNo) {
        return sqlSession.selectOne("projectInteractionMapper.countFollowers", sellerNo);
    }

    public boolean isFollowing(SqlSessionTemplate sqlSession, long sellerNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("userNo", userNo);
        Integer result = sqlSession.selectOne("projectInteractionMapper.isFollowing", params);
        return result != null && result > 0;
    }

    public int insertFollow(SqlSessionTemplate sqlSession, long sellerNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("userNo", userNo);
        return sqlSession.insert("projectInteractionMapper.insertFollow", params);
    }

    public int deleteFollow(SqlSessionTemplate sqlSession, long sellerNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("sellerNo", sellerNo);
        params.put("userNo", userNo);
        return sqlSession.delete("projectInteractionMapper.deleteFollow", params);
    }
}
