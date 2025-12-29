package com.kh.foodding.mypage.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
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
    
    // 🚨 5. 프로필 사진 URL 업데이트 [수정됨]
    // Mapper XML에서 #{modifyProfile}을 쓰므로, 여기서도 이름을 맞춰줘야 합니다.
    // @Param("profileImageUrl") -> @Param("modifyProfile") 로 변경!
    int updateProfileImage(@Param("userId") String userId, @Param("modifyProfile") String modifyProfile);

    // 6. 이메일 업데이트
    int updateEmail(@Param("userId") String userId, @Param("newEmail") String newEmail);

    // 7. 휴대폰 번호 업데이트
    int updatePhone(@Param("userId") String userId, @Param("newPhone") String newPhone);

    // 8. 회원 탈퇴 (데이터 삭제)
    int deleteMember(String userId); 
    
    int updateNickname(@Param("userId") String userId, @Param("nickname") String nickname);
}