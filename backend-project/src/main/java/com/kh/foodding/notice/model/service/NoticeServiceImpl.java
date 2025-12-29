package com.kh.foodding.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.foodding.notice.model.dao.NoticeDao;
import com.kh.foodding.notice.model.vo.Notice;

@Service
public class NoticeServiceImpl implements NoticeService{
	@Autowired
	private NoticeDao noticeDao;
	
	@Override
	public int insertNotice(Notice notice) {
		return noticeDao.insertNotice(notice);
	}
	
	@Override
	public Map<String, Object> selectNoticeList(int page, String keyword, int limit){
		int start = (page - 1) * limit + 1;
		int end = page * limit;
		
		Map<String, Object> params = new HashMap<>();
		params.put("keyword", keyword);
		params.put("start", start);
		params.put("end", end);
		
		List<Notice> list = noticeDao.selectNoticeList(params);
		int totalCount = noticeDao.selectNoticeCount(keyword);
		
		Map<String, Object> result = new HashMap<>();
		result.put("list", list);
		result.put("totalCount", totalCount);
		
		return result;
	}
	
	@Transactional // 조회수 증가와 조회가 하나의 작업으로 묶임
	@Override
	public Notice selectNoticeDetail(int noticeNo) {
	    // 1. 조회수 1 증가
	    int result = noticeDao.increaseCount(noticeNo);
	    
	    // 2. 상세 정보 조회
	    if(result > 0) {
	        return noticeDao.selectNoticeDetail(noticeNo);
	    }
	    return null;
	}
	
	@Transactional
	@Override
	public int deleteNotice(int noticeNo) {
		return noticeDao.deleteNotice(noticeNo);
	}
	
	@Transactional
	@Override
	public int updateNotice(Notice notice) {
		return noticeDao.updateNotice(notice);
	}

}
