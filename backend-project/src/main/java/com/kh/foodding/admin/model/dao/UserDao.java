package com.kh.foodding.admin.model.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

import com.kh.foodding.admin.model.vo.User;

@Mapper
public interface UserDao {
    
    // 1. 전체 회원 수 조회 (페이징 계산용)
    int selectTotalCount(Map<String, Object> map);

    // 2. 회원 목록 조회 (검색 + 페이징)
    List<User> selectUserList(Map<String, Object> map);

    // 3. 회원 정보 수정 (모달창 저장)
    int updateUserInfo(User user);
    
    // 4. 회원 상태 변경 (정지/탈퇴 처리)
    int updateUserStatus(User user);
}