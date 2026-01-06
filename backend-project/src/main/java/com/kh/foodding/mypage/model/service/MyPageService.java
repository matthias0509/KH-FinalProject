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
import com.kh.foodding.mypage.model.vo.FollowedSeller;
import com.kh.foodding.mypage.model.vo.FundingHistory;
import com.kh.foodding.mypage.model.vo.LikedProject;
import com.kh.foodding.mypage.model.vo.MyPage; 

@Service
public class MyPageService {

    @Autowired
    private MyPageDao myPageDao;

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
        
        // 1. 이름/닉네임 유지 로직 (기존 동일)
        if (myPage.getUserName() == null || myPage.getUserName().trim().isEmpty()) {
            myPage.setUserName(current.getUserName());
        }

        if (myPage.getNickname() == null || myPage.getNickname().trim().isEmpty()) {
            myPage.setNickname(current.getNickname());
        }

        if (myPage.getEmail() == null || myPage.getEmail().trim().isEmpty()) {
            myPage.setEmail(current.getEmail());
        }
        // 2. 비밀번호 변경 요청이 있을 경우
        if (myPage.getUserPwd() != null && !myPage.getUserPwd().trim().isEmpty()) {
            
            // ==========================================
            // 🚨 [추가된 로직] 현재 비밀번호와 동일한지 검사
            // ==========================================
            
            // A. DB에 저장된 현재 암호화된 비밀번호 가져오기
            String dbHashedPwd = myPageDao.selectHashedPassword(myPage.getUserId());
            
            // B. 입력한 새 비밀번호(평문)와 DB 비밀번호(암호문) 비교
            // matches(rawPassword, encodedPassword)가 true면 두 비밀번호가 같다는 뜻
            if (passwordEncoder.matches(myPage.getUserPwd(), dbHashedPwd)) {
                // 예외를 던져서 Controller가 이를 잡아 "비밀번호가 같습니다"라고 응답하게 함
                throw new IllegalArgumentException("현재 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.");
            }
            
            // ==========================================
            
            // 3. 다를 경우에만 암호화 진행 후 업데이트
            String encodedPwd = passwordEncoder.encode(myPage.getUserPwd());
            myPage.setUserPwd(encodedPwd);
            myPageDao.updatePassword(myPage.getUserId(), encodedPwd);
        }

        return myPageDao.updateMemberInfo(myPage) == 1;
    }

    /**
     * 🔒 비밀번호 확인 로직 (계정 정보 탭 진입 시 사용)
     */
    public boolean verifyPassword(String userId, String rawPassword) {
        // DB에 저장된 BCrypt 암호화된 비밀번호 조회
        String storedHashedPassword = myPageDao.selectHashedPassword(userId);
        if (storedHashedPassword == null) return false;
        
        // 사용자가 입력한 평문 비밀번호와 DB 암호문을 매칭 확인
        return passwordEncoder.matches(rawPassword, storedHashedPassword);
    }

    /**
     * 프로필 이미지 업데이트
     */
    @Transactional
    public String updateProfileImage(String userId, MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        Path profileDir = FileStorageUtils.getProfileImagesDir();
        String originalName = file.getOriginalFilename();
        String ext = (originalName != null && originalName.contains(".")) 
                     ? originalName.substring(originalName.lastIndexOf(".")) : "";
        String storedName = UUID.randomUUID() + ext;

        try {
            Path target = profileDir.resolve(storedName);
            Files.createDirectories(target.getParent());
            file.transferTo(target.toFile());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        int result = myPageDao.updateProfileImage(userId, storedName);
        return (result == 1) ? storedName : null;
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

    /**
     * 🚨 [수정됨] 회원 탈퇴 로직 (논리 삭제 처리)
     * 이 메서드는 매퍼에서 UPDATE TB_USER SET USER_STATUS = 'N' 쿼리를 실행합니다.
     */
    @Transactional
    public boolean withdrawMember(String userId) {
        // 제약 조건 에러를 피하기 위해 실제 삭제가 아닌 상태값 업데이트를 수행
        return myPageDao.deleteMember(userId) == 1;
    }
    
    /**
     * 마이페이지 메인 정보 (모든 회원정보 + 통계 데이터)
     */
    public Map<String, Object> getMyPageInfo(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        if (member == null) return null;

        Map<String, Object> stats = myPageDao.selectMyPageStats(member.getUserNo());
        Map<String, Object> result = new HashMap<>();
        
        // 리액트에서 필요한 모든 데이터 매핑
        result.put("userNo", member.getUserNo());
        result.put("userId", member.getUserId());
        result.put("userName", member.getUserName());
        result.put("nickname", member.getNickname());
        result.put("modifyProfile", member.getModifyProfile());
        result.put("role", member.getUserRole());
        result.put("email", member.getEmail());
        result.put("phone", member.getPhone());
        result.put("postcode", member.getPostcode());
        result.put("mainAddress", member.getMainAddress());
        result.put("detailAddress", member.getDetailAddress());
        
        if (stats == null) {
            stats = new HashMap<>(Map.of("likedCount", 0, "followingCount", 0, "fundingCount", 0));
        }
        result.put("stats", stats);
        
        return result;
    }

    // --- 이하 후원/팔로우/좋아요 목록 조회 로직 유지 ---
    public List<LikedProject> getLikedProjects(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        return myPageDao.selectLikedProjects(member.getUserNo());
    }
    
    public List<FundingHistory> getFundingHistory(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        return (member != null) ? myPageDao.selectFundingHistory(member.getUserNo()) : List.of();
    }
    
    public List<FollowedSeller> getFollowList(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        return (member != null) ? myPageDao.selectFollowList(member.getUserNo()) : List.of();
    }
    
    public Map<String, Object> selectFundingDetail(String orderNo, int userNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("orderNo", orderNo);
        params.put("userNo", userNo);
        return myPageDao.selectFundingDetail(params);
    }

    @Transactional
    public int cancelFunding(String orderNo, int userNo) {
        int result = myPageDao.updateOrderStatusToCancel(orderNo, userNo);
        if (result > 0) myPageDao.updateProductAmountDecrease(orderNo);
        return result;
    }

    public List<FundingHistory> getCanceledFundingHistory(String userId) {
        MyPage member = myPageDao.selectMemberById(userId);
        return (member != null) ? myPageDao.selectCanceledFundingHistory(member.getUserNo()) : List.of();
    }
}