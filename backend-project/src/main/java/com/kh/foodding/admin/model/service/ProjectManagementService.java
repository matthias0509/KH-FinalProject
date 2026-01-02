package com.kh.foodding.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.admin.model.dao.ProjectManagementDao;
import com.kh.foodding.admin.model.vo.AdminProject;

@Service
public class ProjectManagementService {

    @Autowired
    private ProjectManagementDao projectDao;

    /**
     * 프로젝트 관리 목록 조회 (검색 + 페이징)
     */
    public Map<String, Object> getProjectList(int page, int size, String status, String category, String keyword) {
        
        // 1. 파라미터 세팅
        Map<String, Object> map = new HashMap<>();
        map.put("status", status);
        map.put("category", category);
        map.put("keyword", keyword);

        // 2. 페이징 계산 (Oracle ROWNUM 방식)
        // 예: 1페이지(1~10), 2페이지(11~20)
        int startRow = (page - 1) * size + 1;
        int endRow = page * size;
        
        map.put("startRow", startRow);
        map.put("endRow", endRow);

        // 3. DB 조회
        // 3-1. 전체 개수 (검색 조건 적용)
        int totalCount = projectDao.selectTotalCount(map);
        
        // 3-2. 실제 리스트 조회
        List<AdminProject> list = projectDao.selectManagementList(map);

        // 4. 결과 반환용 Map 구성
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", list);
        resultMap.put("totalCount", totalCount);
        // 총 페이지 수 계산: 올림((전체개수 / 페이지당개수))
        resultMap.put("totalPages", (int) Math.ceil((double) totalCount / size));

        return resultMap;
    }

    /**
     * 프로젝트 상태 및 관리자 메모 수정
     */
    public boolean updateProjectStatus(Map<String, Object> paramMap) {
        // paramMap에는 projectNo, status, adminMemo가 들어있음
        return projectDao.updateProjectStatusInfo(paramMap) > 0;
    }
 // 기존 Service 파일에 추가
    public int updateProjectSuccess() {
        return projectDao.updateProjectSuccess();
    }

    public int updateProjectFail() {
        return projectDao.updateProjectFail();
    }
}