package com.kh.foodding.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.admin.model.dao.UserDao;
import com.kh.foodding.admin.model.vo.User;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    // 회원 목록 조회 로직 (DTO 없이 Map 사용)
    public Map<String, Object> getUserList(int page, int size, String status, String keyword) {
        
        // 1. 파라미터 Map 포장
        Map<String, Object> map = new HashMap<>();
        map.put("status", status);
        map.put("keyword", keyword);

        // 2. 페이징 계산 (Oracle ROWNUM 방식)
        int startRow = (page - 1) * size + 1;
        int endRow = page * size;
        
        map.put("startRow", startRow);
        map.put("endRow", endRow);

        // 3. DAO 호출
        int totalCount = userDao.selectTotalCount(map);
        List<User> list = userDao.selectUserList(map);

        // 4. 결과 반환용 Map 구성
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", list);           // 실제 데이터 리스트
        resultMap.put("totalCount", totalCount); // 총 회원 수
        resultMap.put("totalPages", (int) Math.ceil((double) totalCount / size)); // 총 페이지 수

        return resultMap;
    }

    // 회원 정보 수정
    public boolean updateUserInfo(User user) {
        return userDao.updateUserInfo(user) > 0;
    }

    // 회원 상태 변경
    public boolean updateUserStatus(User user) {
        return userDao.updateUserStatus(user) > 0;
    }
}