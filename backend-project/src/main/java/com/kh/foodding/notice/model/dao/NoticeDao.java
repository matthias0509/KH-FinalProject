package com.kh.foodding.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.foodding.notice.model.vo.Notice;

@Repository
public class NoticeDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public int insertNotice(Notice notice) {
		return sqlSession.insert("noticeMapper.insertNotice", notice);
	}
	
	public List<Notice> selectNoticeList(Map<String, Object> params){
		return sqlSession.selectList("noticeMapper.selectNoticeList", params);
	}
	public int selectNoticeCount(String keyword) {
		return sqlSession.selectOne("noticeMapper.selectNoticeCount", keyword);
	}
	
	public int increaseCount(int noticeNo) {
		return sqlSession.update("noticeMapper.increaseCount", noticeNo);
	}
	
	public Notice selectNoticeDetail(int noticeNo) {
		System.out.println("조회하려는 번호: " + noticeNo);
		return sqlSession.selectOne("noticeMapper.selectNoticeDetail", noticeNo);
	}
	
	public int deleteNotice(int noticeNo) {
		return sqlSession.update("noticeMapper.deleteNotice", noticeNo);
	}
	
	public int updateNotice(Notice notice) {
		return sqlSession.update("noticeMapper.updateNotice", notice);
	}

}
