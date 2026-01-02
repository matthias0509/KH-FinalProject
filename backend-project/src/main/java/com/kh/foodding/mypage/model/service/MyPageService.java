package com.kh.foodding.mypage.model.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.common.FileStorageUtils;
import com.kh.foodding.mypage.model.dao.MyPageDao;
import com.kh.foodding.mypage.model.vo.MyPage;
import com.kh.foodding.mypage.model.vo.LikedProject;    
import com.kh.foodding.mypage.model.vo.FundingHistory; 
import com.kh.foodding.mypage.model.vo.FollowedSeller; 

@Service
public class MyPageService {

    @Autowired
    private MyPageDao myPageDao; // 🚨 변수명 myPageDao로 통일

    @Autowired
    private PasswordEncoder passwordEncoder;

    public MyPage selectMemberInfo(String userId) {
        return myPageDao.selectMemberById(userId);
    }

    /**
     * 계정 정보 통합 업데이트
     */
    @Transactional
    public boolean updateAccountInfo(MyPage myPage) {
        MyPage current = myPageDao.selectMemberById(myPage.getUserId());
        
        if (myPage.getUserName() == null || myPage.getUserName().trim().isEmpty()) {
            myPage.setUserName(current.getUserName());
        }

        if (myPage.getNickname() == null || myPage.getNickname().trim().isEmpty()) {
            myPage.setNickname(current.getNickname());
        }

        if (myPage.getUserPwd() != null && !myPage.getUserPwd().trim().isEmpty()) {
            String encodedPwd = passwordEncoder.encode(myPage.getUserPwd());
            myPage.setUserPwd(encodedPwd);
            myPageDao.updatePassword(myPage.getUserId(), encodedPwd);
        }

        return myPageDao.updateMemberInfo(myPage) == 1;
    }

    /**
     * 비밀번호 확인 로직
     */
    public boolean verifyPassword(String userId, String rawPassword) {
        String storedHashedPassword = myPageDao.selectHashedPassword(userId);
        if (storedHashedPassword == null) return false;
        
        return passwordEncoder.matches(rawPassword, storedHashedPassword);
    }

    /**
     * ✅ 프로필 이미지 업데이트 (경로 수정됨)
     */
    @Transactional
    public String updateProfileImage(String userId, MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        Path profileDir = FileStorageUtils.getProfileImagesDir();

        String originalName = file.getOriginalFilename();
        String ext = "";
        if (originalName != null && originalName.contains(".")) {
            ext = originalName.substring(originalName.lastIndexOf("."));
        }
        String storedName = UUID.randomUUID() + ext;

        try {
            Path target = profileDir.resolve(storedName);
            Files.createDirectories(target.getParent());
            file.transferTo(target.toFile());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        String dbPath = storedName;
        int result = myPageDao.updateProfileImage(userId, dbPath);

        return (result == 1) ? dbPath : null;
    }

    @Transactional
    public boolean deleteProfileImage(String userId) {
        return myPageDao.updateProfileImage(userId, null) == 1;
    }

    @Transactional
    public boolean updateBaseInfo(MyPage myPage) {
        if (myPage.getUserName() == null || myPage.getUserName().trim().isEmpty()) {
            MyPage current = myPageDao.selectMemberById(myPage.getUserId());
            myPage.setUserName(current.getUserName());
        }
        return myPageDao.updateMemberInfo(myPage) == 1;
    }

    @Transactional
    public boolean withdrawMember(String userId) {
        return myPageDao.deleteMember(userId) == 1;
    }
    
    /**
     * [추가] 마이페이지 메인 정보 (회원정보 + 통계 같이 줌)
     */
    public Map<String, Object> getMyPageInfo(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        
        Map<String, Object> stats = myPageDao.selectMyPageStats(member.getUserNo());
        
        Map<String, Object> result = new HashMap<>();
        
        result.put("userNo", member.getUserNo());
        result.put("userId", member.getUserId());
        result.put("userName", member.getUserName());
        result.put("nickname", member.getNickname());
        result.put("modifyProfile", member.getModifyProfile());
        // 🚨 필드명 확인 필요 (보통 userRole 또는 role)
        result.put("role", member.getUserRole()); 
        
        if (stats == null) {
            stats = new HashMap<>();
            stats.put("likedCount", 0);
            stats.put("followingCount", 0);
            stats.put("fundingCount", 0);
        }
        result.put("stats", stats);
        
        return result;
    }

 
    //좋아요한 프로젝트 목록 조회
    public List<LikedProject> getLikedProjects(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        return myPageDao.selectLikedProjects(member.getUserNo());
    }
    
    // 내 후원 내역 가져오기
    public List<FundingHistory> getFundingHistory(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        if (member == null) return List.of();
        
        return myPageDao.selectFundingHistory(member.getUserNo());
    }
    
    // 팔로우 목록 가져오기
    public List<FollowedSeller> getFollowList(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        if (member == null) return List.of();
        
        return myPageDao.selectFollowList(member.getUserNo());
    }
    
    // 후원 상세 조회 서비스
    public Map<String, Object> selectFundingDetail(String orderNo, int userNo) {
        // Mapper에 파라미터를 2개 넘겨야 하므로 Map으로 묶음
        Map<String, Object> params = new HashMap<>();
        params.put("orderNo", orderNo);
        params.put("userNo", userNo);
        
        return myPageDao.selectFundingDetail(params);
    }
    @Transactional
    public int cancelFunding(String orderNo, int userNo) {
        // 1. 주문 상태 변경 ('PAY' -> 'CANCEL')
        int result = myPageDao.updateOrderStatusToCancel(orderNo, userNo);
        
        if (result > 0) {
            // 2. 상태 변경 성공 시, 프로젝트 모금액 차감
            myPageDao.updateProductAmountDecrease(orderNo);
        }
        
        return result; // 1이면 성공, 0이면 실패
    }
    /**
     * 🚨 [필수 확인] 취소된 후원 내역 가져오기
     * (이게 없으면 Controller에서 빨간 줄 에러가 뜹니다)
     */
    public List<FundingHistory> getCanceledFundingHistory(String userId) {
        // 1. 유저 정보 조회
        MyPage member = myPageDao.selectMemberById(userId);
        
        // 2. 없으면 빈 리스트 리턴
        if (member == null) return List.of();
        
        // 3. 방금 작성하신 DAO 메서드 호출
        return myPageDao.selectCanceledFundingHistory(member.getUserNo());
    }
}
