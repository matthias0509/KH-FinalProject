package com.kh.foodding.search.model.service;

import java.util.List;
import java.util.Locale;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.search.dao.SearchLogDao;
import com.kh.foodding.search.dto.TrendingKeyword;

@Service
public class SearchLogServiceImpl implements SearchLogService {

    private static final int TRENDING_WINDOW_MINUTES = 30;
    private static final int TRENDING_LIMIT = 10;

    @Autowired
    private SearchLogDao searchLogDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void recordKeyword(String keyword) {
        if (keyword == null) {
            return;
        }
        String normalized = keyword.trim().toLowerCase(Locale.ROOT);
        if (normalized.isEmpty()) {
            return;
        }
        if (normalized.length() > 100) {
            normalized = normalized.substring(0, 100);
        }
        searchLogDao.insertSearchLog(sqlSession, normalized);
    }

    @Override
    public List<TrendingKeyword> getTrendingKeywords() {
        return searchLogDao.selectTrendingKeywords(sqlSession, TRENDING_WINDOW_MINUTES, TRENDING_LIMIT);
    }
}
