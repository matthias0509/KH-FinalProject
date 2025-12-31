package com.kh.foodding.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import com.kh.foodding.admin.model.vo.AdminProject;
import com.kh.foodding.admin.model.vo.AdminReward;

@Repository
public class AdminProjectDao {

    public List<AdminProject> selectProjectList(SqlSessionTemplate sqlSession, String status) {
        return sqlSession.selectList("adminProjectMapper.selectProjectList", status);
    }

    public AdminProject selectProjectDetail(SqlSessionTemplate sqlSession, int productNo) {
        return sqlSession.selectOne("adminProjectMapper.selectProjectDetail", productNo);
    }

    public List<AdminReward> selectRewards(SqlSessionTemplate sqlSession, int productNo) {
        return sqlSession.selectList("adminProjectMapper.selectRewardsByProductNo", productNo);
    }

    public int updateProjectStatus(SqlSessionTemplate sqlSession, int productNo, String status, String reason) {
        Map<String, Object> params = new HashMap<>();
        params.put("productNo", productNo);
        params.put("status", status);
        params.put("reason", reason);
        return sqlSession.update("adminProjectMapper.updateProjectStatus", params);
    }
}