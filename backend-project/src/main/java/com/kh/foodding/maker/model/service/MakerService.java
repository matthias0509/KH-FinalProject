package com.kh.foodding.maker.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.maker.model.dao.MakerDao;

@Service
public class MakerService {

    @Autowired
    private MakerDao makerDao;

    /**
     * 메이커 대시보드 데이터 조회 (통계 + 상태별 카운트 + 최근 프로젝트)
     */
    public Map<String, Object> getMakerDashboard(int userNo) {
        Map<String, Object> result = new HashMap<>();

        // 1. 유저 번호로 판매자 번호(SellerNo) 조회
        Integer sellerNo = makerDao.selectSellerNo(userNo);
        
        // 판매자가 아니면 null 반환 (Controller에서 처리)
        if (sellerNo == null) {
            return null; 
        }

        // 2. 각종 통계 데이터 조회 (DAO 호출)
        int followerCount = makerDao.countFollowers(sellerNo);
        int writingCount = makerDao.countTempProjects(userNo); // 작성 중(임시저장)은 userNo 기준
        
        // 상태별 프로젝트 수 (Map으로 받아옴)
        Map<String, Object> statusCounts = makerDao.selectProjectStatusCounts(sellerNo);
        
        // DB에서 숫자가 BigDecimal 등으로 넘어올 수 있으므로 안전하게 String 변환 후 int 파싱
        int reviewing = Integer.parseInt(String.valueOf(statusCounts.getOrDefault("reviewing", 0)));
        int progress = Integer.parseInt(String.valueOf(statusCounts.getOrDefault("progress", 0)));
        int ended = Integer.parseInt(String.valueOf(statusCounts.getOrDefault("ended", 0)));
        
        // 전체 프로젝트 수 계산 (작성중 제외)
        int totalProjects = Integer.parseInt(String.valueOf(statusCounts.getOrDefault("total", 0)));

        // 3. 최근 프로젝트 리스트 조회
        List<Map<String, Object>> recentProjects = makerDao.selectRecentProjects(sellerNo);

        // 4. 프론트엔드 형식에 맞춰 데이터 조립
        result.put("stats", Map.of(
            "projectCount", totalProjects, 
            "followerCount", followerCount
        ));
        
        result.put("status", Map.of(
            "writing", writingCount,
            "reviewing", reviewing,
            "progress", progress,
            "ended", ended
        ));
        
        result.put("recentProjects", recentProjects);

        return result;
    }
    
    /**
     * 프로젝트 목록 조회 (상태별)
     */
    public List<Map<String, Object>> getProjectList(int userNo, String status) {
        
        // 1. '작성 중(draft)'인 경우 -> TEMPORARY 테이블 조회 (SellerNo 불필요)
        if ("draft".equals(status)) {
            return makerDao.selectTempProjectList(userNo);
        }

        // 2. '진행 중(open)' 또는 '종료(closed)'인 경우 -> PRODUCT 테이블 조회
        Integer sellerNo = makerDao.selectSellerNo(userNo);
        if (sellerNo == null) {
            return List.of(); // 판매자가 아니면 빈 리스트 반환
        }

        return makerDao.selectProductListByStatus(sellerNo, status);
    }
    
    /**
     * 🚨 [수정됨] 정산 내역 조회 서비스
     * (아까 이 메서드 선언부가 빠져 있었습니다)
     */
    public List<Map<String, Object>> getSettlementList(int userNo) {
        // 1. 유저 번호로 판매자 번호 조회
        Integer sellerNo = makerDao.selectSellerNo(userNo);
        
        // 2. 판매자가 아니면 빈 리스트 반환
        if (sellerNo == null) {
            return List.of();
        }

        // 3. DAO 호출
        return makerDao.selectSettlementList(sellerNo);
    }

}