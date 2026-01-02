package com.kh.foodding.admin.model.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.kh.foodding.admin.model.vo.Faq;

@Mapper
public interface FaqDao {

    // 목록 조회
    List<Faq> selectFaqList();

    // 등록
    int insertFaq(Faq faq);

    // 수정
    int updateFaq(Faq faq);

    // 삭제
    int deleteFaq(int faqNo);
}