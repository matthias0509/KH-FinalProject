package com.kh.foodding.maker.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MakerDao {
    
    /**
     * 회원 번호(userNo)로 판매자 번호(sellerNo) 조회
     * 판매자가 아닌 경우 null이 반환될 수 있으므로 Integer 사용
     */
    Integer selectSellerNo(int userNo);

    /**
     * 나를 팔로우한 서포터 수 조회
     */
    int countFollowers(int sellerNo);

    /**
     * 작성 중인(임시저장) 프로젝트 수 조회
     */
    int countTempProjects(int userNo);

    /**
     * 프로젝트 상태별(심사중, 진행중, 종료) 카운트 조회
     */
    Map<String, Object> selectProjectStatusCounts(int sellerNo);

    /**
     * 최근 등록한 프로젝트 5개 리스트 조회
     */
    List<Map<String, Object>> selectRecentProjects(int sellerNo);
    
    
 // 작성 중인 프로젝트 리스트
    List<Map<String, Object>> selectTempProjectList(int userNo);

    // 진행 중 또는 종료된 프로젝트 리스트
    List<Map<String, Object>> selectProductListByStatus(@Param("sellerNo") int sellerNo, @Param("status") String status);
    
    /**
     * 정산 내역 리스트 조회
     */
    List<Map<String, Object>> selectSettlementList(int sellerNo);
    
    
    
    
    
    
    
    
    
    
    
    
    
}