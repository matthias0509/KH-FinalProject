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
        int writingCount = makerDao.countTempProjects(sellerNo); // 임시저장은 sellerNo 기준
        
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
        
        Integer sellerNo = makerDao.selectSellerNo(userNo);
        if (sellerNo == null) {
            return List.of(); // 판매자가 아니면 빈 리스트 반환
        }

        if ("draft".equals(status)) {
            return makerDao.selectTempProjectList(sellerNo);
        }

        // 2. '진행 중(open)' 또는 '종료(closed)'인 경우 -> PRODUCT 테이블 조회
        return makerDao.selectProductListByStatus(sellerNo, status);
    }
    
    /**
     * 정산 내역 조회 서비스
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

    /**
     * 특정 판매자의 기본 정보 조회
     */
    public Map<String, Object> getSellerInfo(int sellerNo) {
        return makerDao.selectSellerInfo(sellerNo);
    }

    /**
     * 특정 판매자의 공개 프로필 정보 (프로젝트 목록 + 통계) - 페이징 포함
     */
    public Map<String, Object> getSellerPublicProfileWithPaging(int sellerNo, int page, int size) {
        Map<String, Object> result = new HashMap<>();
        
        // 1. 판매자 통계 (프로젝트 수, 팔로워 수)
        Map<String, Object> stats = makerDao.selectSellerStats(sellerNo);
        
        // 2. 전체 프로젝트 수 조회 (페이징 계산용)
        int totalProjects = makerDao.countSellerPublicProjects(sellerNo);
        
        // 3. 페이징 계산
        int totalPages = (int) Math.ceil((double) totalProjects / size);
        int offset = (page - 1) * size;
        
        // 4. 페이징된 프로젝트 목록 조회
        List<Map<String, Object>> projects = makerDao.selectSellerPublicProjectsWithPaging(sellerNo, offset, size);
        
        // 5. 결과 조립
        result.put("stats", stats);
        result.put("recentProjects", projects);
        result.put("totalProjects", totalProjects);
        result.put("totalPages", totalPages);
        result.put("currentPage", page);
        
        return result;
    }

    /**
     * 기존 메서드 (페이징 없음) - 호환성 유지
     */
    public Map<String, Object> getSellerPublicProfile(int sellerNo) {
        // 기본값으로 1페이지, 10개 조회
        return getSellerPublicProfileWithPaging(sellerNo, 1, 10);
    }
}
