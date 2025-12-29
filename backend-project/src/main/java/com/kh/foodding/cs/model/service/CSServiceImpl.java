package com.kh.foodding.cs.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.foodding.cs.model.dao.CSDao;
import com.kh.foodding.cs.model.vo.Qna;

@Service
public class CSServiceImpl implements CSService {
	@Autowired
	private CSDao csDao;
	
	@Override
	public int insertInquiry(Qna qna) {
		return csDao.insertInquiry(qna);
	}
	
	@Override
	public List<Qna> selectInquiryList(int userNo){
		return csDao.selectInquiryList(userNo);
	}
}
