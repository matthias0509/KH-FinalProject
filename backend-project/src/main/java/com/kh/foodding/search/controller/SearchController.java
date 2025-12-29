package com.kh.foodding.search.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.foodding.search.dto.TrendingKeyword;
import com.kh.foodding.search.model.service.SearchLogService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchLogService searchLogService;

    @GetMapping("/trending")
    public ResponseEntity<List<TrendingKeyword>> getTrendingKeywords() {
        return ResponseEntity.ok(searchLogService.getTrendingKeywords());
    }
}
