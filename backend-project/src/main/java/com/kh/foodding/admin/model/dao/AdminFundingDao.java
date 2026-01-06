package com.kh.foodding.admin.model.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

// AdminFunding VO 임포트 확인
import com.kh.foodding.admin.model.vo.AdminFunding;

@Mapper
public interface AdminFundingDao {

    /**
     * 관리자용 후원 내역 전체 조회 (검색/필터 포함)
     * @param params (status: 필터값, keyword: 검색어)
     * @return 검색된 후원 내역 리스트
     */
    // 🚨 이 메서드가 정의되어야 서비스와 Mapper XML이 연결됩니다.
    List<AdminFunding> selectAdminFundingList(Map<String, Object> params);

    /**
     * ✅ 관리자 강제 취소 처리 (사용자 번호 검증 없이)
     */
    int updateOrderStatusToCancelByAdmin(String orderNo);

}
