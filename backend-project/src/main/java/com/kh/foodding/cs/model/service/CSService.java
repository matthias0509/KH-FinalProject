package com.kh.foodding.cs.model.service;

import java.util.List;

import com.kh.foodding.cs.model.vo.Qna;

public interface CSService {
	int insertInquiry(Qna qna);

	List<Qna> selectInquiryList(int userNo);
	List<Qna> selectAdminInquiryList();
	int updateInquiryAnswer(Qna qna);
}
