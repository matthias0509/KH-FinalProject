package com.kh.foodding.cs.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.foodding.cs.model.vo.Qna;

@Repository
public class CSDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public int insertInquiry(Qna qna) {
		return sqlSession.insert("noticeMapper.insertInquiry", qna);
	}
	
	public List<Qna> selectInquiryList(int userNo){
		return sqlSession.selectList("noticeMapper.selectInquiryList", userNo);
	}
}
