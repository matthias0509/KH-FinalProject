package com.kh.foodding.seller.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.seller.model.vo.SellerApplication;

@Repository
public class SellerApplicationDao {

    // 1. 신청서 등록
    public int insertApplication(SqlSessionTemplate sqlSession, SellerApplication application) {
        return sqlSession.insert("sellerApplicationMapper.insertApplication", application);
    }

    // 2. 내 최신 신청서 조회
    public SellerApplication selectLatestByUser(SqlSessionTemplate sqlSession, long userNo) {
        return sqlSession.selectOne("sellerApplicationMapper.selectLatestByUser", userNo);
    }

    // 3. 대기 중인 신청서 조회
    public List<SellerApplication> selectActivePendingByUser(SqlSessionTemplate sqlSession, long userNo) {
        return sqlSession.selectList("sellerApplicationMapper.selectActivePendingByUser", userNo);
    }

    // 4. 관리자용 목록 조회
    public List<SellerApplication> selectByStatus(SqlSessionTemplate sqlSession, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("status", status);
        return sqlSession.selectList("sellerApplicationMapper.selectByStatus", params);
    }

    // 5. 신청서 상세 조회
    public SellerApplication selectById(SqlSessionTemplate sqlSession, long applicationNo) {
        return sqlSession.selectOne("sellerApplicationMapper.selectById", applicationNo);
    }

    // 6. 상태 업데이트 (승인/반려)
    public int updateStatus(SqlSessionTemplate sqlSession, long applicationNo, String status, String adminMemo) {
        Map<String, Object> params = new HashMap<>();
        params.put("applicationNo", applicationNo);
        params.put("status", status);
        params.put("adminMemo", adminMemo);
        return sqlSession.update("sellerApplicationMapper.updateStatus", params);
    }

    // 7. ✅ 유저 권한 변경 (USER -> SELLER)
    public int updateUserRole(SqlSessionTemplate sqlSession, long applicationNo) {
        // XML의 updateUserRole 쿼리 호출
        return sqlSession.update("sellerApplicationMapper.updateUserRole", applicationNo);
    }

    // 8. ✅ [중요] 판매자 프로필 생성 (이 메서드가 없어서 에러가 났던 것!)
    public int insertSellerProfile(SqlSessionTemplate sqlSession, long applicationNo) {
        // XML의 insertSellerProfile 쿼리 호출
        return sqlSession.insert("sellerApplicationMapper.insertSellerProfile", applicationNo);
    }
}