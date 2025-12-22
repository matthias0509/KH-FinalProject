package com.kh.foodding.notice.model.service;

import java.util.Map;

import com.kh.foodding.notice.model.vo.Notice;

public interface NoticeService {
	Map<String, Object> selectNoticeList(int page, String keyword, int limit);
	int insertNotice(Notice notice);
	Notice selectNoticeDetail(int noticeNo);
	int deleteNotice(int noticeNo);
}
