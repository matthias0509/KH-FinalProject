package com.kh.foodding.mypage.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.foodding.mypage.model.vo.FundingHistory;
import com.kh.foodding.mypage.model.vo.LikedProject; // ✅ VO 임포트 필수!
import com.kh.foodding.mypage.model.vo.MyPage;

@Mapper
public interface MyPageDao {

    // 1. 회원 정보 조회
    MyPage selectMemberById(String userId); 
    
    // 2. 현재 저장된 해시 비밀번호만 조회 (인증용)
    String selectHashedPassword(String userId); 
    
    // 3. 회원 기본/계정 정보 업데이트 
    int updateMemberInfo(MyPage myPage); 

    // 4. 비밀번호 업데이트 
    int updatePassword(@Param("userId") String userId, @Param("newPassword") String newPassword);
    
    // 5. 프로필 사진 URL 업데이트
    int updateProfileImage(@Param("userId") String userId, @Param("modifyProfile") String modifyProfile);

    // 6. 이메일 업데이트
    int updateEmail(@Param("userId") String userId, @Param("newEmail") String newEmail);

    // 7. 휴대폰 번호 업데이트
    int updatePhone(@Param("userId") String userId, @Param("newPhone") String newPhone);

    // 8. 회원 탈퇴 (데이터 삭제)
    int deleteMember(String userId); 
    
    // 닉네임 업데이트 (Service에서 사용하는 경우 유지)
    int updateNickname(@Param("userId") String userId, @Param("nickname") String nickname);
    
    // ✅ 9. 통계 정보 가져오기 (좋아요 수, 팔로잉 수 등)
    Map<String, Object> selectMyPageStats(int userNo);

    // ✅ 10. 좋아요한 프로젝트 리스트 가져오기
    // (수정됨: LikedProjectDao -> LikedProject)
    List<LikedProject> selectLikedProjects(int userNo);
    
 // ✅ 11. 내 후원 내역 리스트 조회
    List<FundingHistory> selectFundingHistory(int userNo);
}