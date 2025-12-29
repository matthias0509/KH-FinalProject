package com.kh.foodding.search.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.search.dto.TrendingKeyword;

@Repository
public class SearchLogDao {

    public void insertSearchLog(SqlSessionTemplate sqlSession, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);
        sqlSession.insert("searchLogMapper.insertSearchLog", params);
    }

    public List<TrendingKeyword> selectTrendingKeywords(SqlSessionTemplate sqlSession, int windowMinutes, int limit) {
        Map<String, Object> params = new HashMap<>();
        params.put("windowMinutes", windowMinutes);
        params.put("limit", limit);
        return sqlSession.selectList("searchLogMapper.selectTrendingKeywords", params);
    }
}
