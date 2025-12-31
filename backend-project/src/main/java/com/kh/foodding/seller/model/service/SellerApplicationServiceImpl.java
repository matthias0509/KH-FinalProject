package com.kh.foodding.seller.model.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.seller.model.dao.SellerApplicationDao;
import com.kh.foodding.seller.model.vo.SellerApplication;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SellerApplicationServiceImpl implements SellerApplicationService {

    private static final String STATUS_PENDING = "PENDING";
    private static final String STATUS_APPROVED = "APPROVED";
    private static final String STATUS_REJECTED = "REJECTED";

    @Autowired
    private SellerApplicationDao sellerApplicationDao;

    // SellerProfileDao는 이제 필요 없음 (SellerApplicationDao가 처리함)

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    @Transactional
    public SellerApplication apply(SellerApplication application) {
        if (application == null || application.getUserNo() == 0) {
            throw new IllegalArgumentException("회원 정보가 필요합니다.");
        }

        // 1. 이미 대기 중인 신청 확인
        List<SellerApplication> pending = sellerApplicationDao.selectActivePendingByUser(sqlSession, application.getUserNo());
        if (!pending.isEmpty()) {
            throw new IllegalStateException("이미 접수된 전환 신청이 있습니다.");
        }

        // 2. 신청서 등록
        sellerApplicationDao.insertApplication(sqlSession, application);
        
        // 3. 등록된 정보 반환
        return sellerApplicationDao.selectById(sqlSession, application.getApplicationNo());
    }

    @Override
    public SellerApplication getMyLatestApplication(long userNo) {
        return sellerApplicationDao.selectLatestByUser(sqlSession, userNo);
    }

    @Override
    public List<SellerApplication> getApplications(String status) {
        // status가 null이거나 빈 문자열이면 "ALL"로 처리하는 로직 포함
        return sellerApplicationDao.selectByStatus(sqlSession, normalizeStatus(status));
    }

    /**
     * ✅ 승인/반려 처리 로직 (핵심)
     */
    @Override
    @Transactional
    public SellerApplication reviewApplication(long applicationNo, String status, String adminMemo) {
        String normalized = normalizeStatus(status);
        
        if (applicationNo <= 0 || normalized == null || STATUS_PENDING.equals(normalized)) {
            throw new IllegalArgumentException("유효하지 않은 상태 값입니다.");
        }

        // 1. 상태 업데이트
        int result = sellerApplicationDao.updateStatus(sqlSession, applicationNo, normalized, adminMemo);

        if (result > 0) {
            // 2. 승인(APPROVED)일 경우 -> 권한 변경 & 프로필 생성 실행
            if (STATUS_APPROVED.equals(normalized)) {
                log.info("판매자 승인 처리 - 권한 변경 및 프로필 생성. AppNo: {}", applicationNo);
                
                // 2-1. 유저 권한 변경 (USER -> SELLER)
                sellerApplicationDao.updateUserRole(sqlSession, applicationNo);
                
                // 2-2. 판매자 프로필 생성 (기본값)
                sellerApplicationDao.insertSellerProfile(sqlSession, applicationNo);
            }
            
            // 3. 결과 반환
            return sellerApplicationDao.selectById(sqlSession, applicationNo);
        }

        throw new RuntimeException("신청 정보 업데이트에 실패했습니다.");
    }

    // 상태값 정규화 헬퍼 메서드
    private String normalizeStatus(String status) {
        if (status == null) {
            return "ALL";
        }
        String upper = status.trim().toUpperCase();
        if (upper.isEmpty() || "ALL".equals(upper)) {
            return "ALL";
        }
        if (STATUS_PENDING.equals(upper) || STATUS_APPROVED.equals(upper) || STATUS_REJECTED.equals(upper)) {
            return upper;
        }
        return "ALL"; // 기본값
    }
}