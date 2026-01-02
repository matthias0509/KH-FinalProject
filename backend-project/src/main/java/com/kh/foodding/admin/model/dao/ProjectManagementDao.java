package com.kh.foodding.admin.model.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.kh.foodding.admin.model.vo.AdminProject;

@Mapper
public interface ProjectManagementDao {

    // 1. 전체 게시글 수 조회 (검색 조건 포함)
    int selectTotalCount(Map<String, Object> map);

    // 2. 프로젝트 관리 목록 조회 (페이징 + 검색)
    List<AdminProject> selectManagementList(Map<String, Object> map);

    // 3. 프로젝트 상태 및 관리자 메모 수정
    int updateProjectStatusInfo(Map<String, Object> map);
    
 // 기존 DAO Interface에 추가
    int updateProjectSuccess();
    int updateProjectFail();
}