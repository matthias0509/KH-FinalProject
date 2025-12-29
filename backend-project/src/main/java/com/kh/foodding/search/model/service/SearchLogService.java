package com.kh.foodding.search.model.service;

import java.util.List;

import com.kh.foodding.search.dto.TrendingKeyword;

public interface SearchLogService {

    void recordKeyword(String keyword);

    List<TrendingKeyword> getTrendingKeywords();
}
