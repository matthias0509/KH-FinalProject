package com.kh.foodding.createProject.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.createProject.model.dao.ProjectDao;
import com.kh.foodding.createProject.model.vo.Project;
import com.kh.foodding.seller.model.dao.SellerProfileDao;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Autowired
    private SellerProfileDao sellerProfileDao;

   
    // 제출하기
    @Transactional
    @Override
    public int insertProject(Project p) {
        if (p == null) {
            return 0;
        }

        if (p.getUserNo() == null) {
            p.setUserNo(1L); // 유저 번호로 수정 예정
        }
        Long sellerNo = requireSellerProfile(p.getUserNo());
        p.setSellerNo(sellerNo);

        if (p.getShipStartDate() == null) {
            p.setShipStartDate(p.getFundEndDate());
        }
        
        int result = projectDao.insertProject(sqlSession, p);

        if (result > 0 && p.getProductNo() != null && p.getRewards() != null) {
            // 기본 옵션을 교체하기 위해 기존 데이터를 제거한 뒤 새로 저장
            projectDao.deleteProductOptions(sqlSession, p.getProductNo());
            for (Project.Reward reward : p.getRewards()) {
                projectDao.insertProductOption(sqlSession, p.getProductNo(), reward);
            }
        }
         // 임시저장이었다면 TEMP_STATUS를 N으로 바꿔 숨겨준다
        if (result > 0 && p.getTempNo() != null) {
            projectDao.deleteProject(sqlSession, p.getSellerNo(), p.getTempNo());
        }

        return result;
    }

    // 임시저장
    @Transactional
    @Override
    public int imsiProject(Project p) {
        if (p == null) {
            return 0;
        }

        if (p.getUserNo() == null) {
            p.setUserNo(1L); // 유저 번호로 수정
        }
        Long sellerNo = requireSellerProfile(p.getUserNo());
        p.setSellerNo(sellerNo);

        if (p.getShipStartDate() == null) {
            p.setShipStartDate(p.getFundEndDate());
        }

        boolean hasTempNo = p.getTempNo() != null;

        if (hasTempNo) {
            int updateResult = projectDao.updateDraft(sqlSession, p);

            if (updateResult > 0 && p.getRewards() != null) {
                projectDao.deleteTempOptions(sqlSession, p.getTempNo());
                for (Project.Reward reward : p.getRewards()) {
                    projectDao.insertTempOption(sqlSession, p.getTempNo(), reward);
                }
            }

            return updateResult;
        }

        int insertResult = projectDao.imsiProject(sqlSession, p);

        if (insertResult > 0 && p.getTempNo() != null && p.getRewards() != null) {
            for (Project.Reward reward : p.getRewards()) {
                projectDao.insertTempOption(sqlSession, p.getTempNo(), reward);
            }
        }

        return insertResult;
    }

    // 임시저장 프로젝트 목록 조회
    @Transactional
    @Override
    public ArrayList<Project> selectProject(int userNo){
        Long sellerNo = requireSellerProfile((long) userNo);
        return projectDao.selectProject(sqlSession, sellerNo);
    }

    // 임시저장 프로젝트 상세 조회
    @Transactional
    @Override
    public Project selectProjectById(int userNo, long tempNo) {
        Long sellerNo = requireSellerProfile((long) userNo);
        Project project = projectDao.selectProjectById(sqlSession, sellerNo, tempNo);
        if (project != null) {
            project.setRewards(projectDao.selectTempOptions(sqlSession, tempNo));
        }
        return project;
    }

    // 임시저장 프로젝트 삭제
    @Transactional
    @Override
    public int deleteProject(int userNo, long tempNo){
        Long sellerNo = requireSellerProfile((long) userNo);
        return projectDao.deleteProject(sqlSession, sellerNo, tempNo);
    }

    private Long requireSellerProfile(Long userNo) {
        if (userNo == null) {
            throw new IllegalStateException("로그인 정보가 필요합니다.");
        }
        Long sellerNo = sellerProfileDao.selectSellerNoByUser(sqlSession, userNo);
        if (sellerNo == null) {
            throw new IllegalStateException("판매자 전환 승인 후 이용해 주세요.");
        }
        return sellerNo;
    }

}
