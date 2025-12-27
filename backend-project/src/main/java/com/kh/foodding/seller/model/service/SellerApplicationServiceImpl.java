package com.kh.foodding.seller.model.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.seller.model.dao.SellerApplicationDao;
import com.kh.foodding.seller.model.dao.SellerProfileDao;
import com.kh.foodding.seller.model.vo.SellerApplication;

@Service
public class SellerApplicationServiceImpl implements SellerApplicationService {

    private static final String STATUS_PENDING = "PENDING";
    private static final String STATUS_APPROVED = "APPROVED";
    private static final String STATUS_REJECTED = "REJECTED";

    @Autowired
    private SellerApplicationDao sellerApplicationDao;

    @Autowired
    private SellerProfileDao sellerProfileDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    @Transactional
    public SellerApplication apply(SellerApplication application) {
        if (application == null || application.getUserNo() == null) {
            throw new IllegalArgumentException("회원 정보가 필요합니다.");
        }

        List<SellerApplication> pending = sellerApplicationDao.selectActivePendingByUser(sqlSession, application.getUserNo());
        if (!pending.isEmpty()) {
            throw new IllegalStateException("이미 접수된 전환 신청이 있습니다.");
        }

        sellerApplicationDao.insertApplication(sqlSession, application);
        return sellerApplicationDao.selectById(sqlSession, application.getApplicationNo());
    }

    @Override
    public SellerApplication getMyLatestApplication(long userNo) {
        return sellerApplicationDao.selectLatestByUser(sqlSession, userNo);
    }

    @Override
    public List<SellerApplication> getApplications(String status) {
        return sellerApplicationDao.selectByStatus(sqlSession, normalizeStatus(status));
    }

    @Override
    @Transactional
    public SellerApplication reviewApplication(long applicationNo, String status, String adminMemo) {
        String normalized = normalizeStatus(status);
        if (applicationNo <= 0 || normalized == null || STATUS_PENDING.equals(normalized)) {
            throw new IllegalArgumentException("유효하지 않은 상태 값입니다.");
        }

        SellerApplication target = sellerApplicationDao.selectById(sqlSession, applicationNo);
        if (target == null) {
            throw new IllegalArgumentException("신청 정보를 찾을 수 없습니다.");
        }

        sellerApplicationDao.updateStatus(sqlSession, applicationNo, normalized, adminMemo);

        if (STATUS_APPROVED.equals(normalized)) {
            ensureSellerProfile(target.getUserNo(), target.getBrandDescription());
        }

        return sellerApplicationDao.selectById(sqlSession, applicationNo);
    }

    private void ensureSellerProfile(Long userNo, String introduction) {
        if (userNo == null) {
            return;
        }
        Long sellerNo = sellerProfileDao.selectSellerNoByUser(sqlSession, userNo);
        if (sellerNo != null) {
            return;
        }
        sellerProfileDao.insertSellerProfile(sqlSession, userNo, introduction);
    }

    private String normalizeStatus(String status) {
        if (status == null) {
            return null;
        }
        String upper = status.trim().toUpperCase();
        if (upper.isEmpty() || "ALL".equals(upper)) {
            return "ALL";
        }
        if (STATUS_PENDING.equals(upper) || STATUS_APPROVED.equals(upper) || STATUS_REJECTED.equals(upper)) {
            return upper;
        }
        return null;
    }
}
