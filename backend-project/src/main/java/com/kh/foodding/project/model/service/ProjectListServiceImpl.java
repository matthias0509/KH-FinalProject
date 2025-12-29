package com.kh.foodding.project.model.service;

import java.util.Collections;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.project.dao.ProjectListDao;
import com.kh.foodding.project.model.vo.ProjectList;
import com.kh.foodding.project.model.vo.ProjectReward;
import com.kh.foodding.seller.model.dao.SellerProfileDao;

@Service
public class ProjectListServiceImpl implements ProjectListService {

    @Autowired
    private ProjectListDao projectListDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Autowired
    private SellerProfileDao sellerProfileDao;

    @Override
    public ProjectList selectDetail(long productNo) {
        ProjectList detail = projectListDao.selectDetail(sqlSession, productNo);
        if (detail == null) {
            return null;
        }
        if (detail.getSellerNo() != null) {
            detail.setSellerProfile(sellerProfileDao.selectSellerProfile(sqlSession, detail.getSellerNo()));
        }
        List<ProjectReward> rewards = projectListDao.selectProjectRewards(sqlSession, productNo);
        detail.setRewards(rewards == null ? Collections.emptyList() : rewards);
        return detail;
    }

    @Override
    public List<ProjectList> selectRecentProjects(int limit, String keyword) {
        int normalizedLimit = limit <= 0 ? 12 : Math.min(limit, 40);
        String normalizedKeyword = keyword == null ? null : keyword.trim();
        if (normalizedKeyword != null && normalizedKeyword.isEmpty()) {
            normalizedKeyword = null;
        }
        return projectListDao.selectRecentProjects(sqlSession, normalizedLimit, normalizedKeyword);
    }

    @Override
    public List<ProjectList> selectAllProjects(String status) {
        String normalized = status == null ? "ALL" : status.trim().toUpperCase();
        return projectListDao.selectAllProjects(sqlSession, normalized);
    }

    @Override
    public boolean updateProductVisibility(long productNo, String productYn) {
        return projectListDao.updateProductVisibility(sqlSession, productNo, productYn) > 0;
    }

}
