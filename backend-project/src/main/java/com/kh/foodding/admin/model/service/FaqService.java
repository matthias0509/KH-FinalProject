package com.kh.foodding.admin.model.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kh.foodding.admin.model.dao.FaqDao;
import com.kh.foodding.admin.model.vo.Faq;

@Service
public class FaqService {

    @Autowired
    private FaqDao faqDao;

    // 1. 목록 조회
    public List<Faq> selectFaqList() {
        return faqDao.selectFaqList();
    }

    // 2. 등록
    public int insertFaq(Faq faq) {
        return faqDao.insertFaq(faq);
    }

    // 3. 수정
    public int updateFaq(Faq faq) {
        return faqDao.updateFaq(faq);
    }

    // 4. 삭제 (이 부분이 없어서 에러가 난 것입니다!)
    public int deleteFaq(int faqNo) {
        return faqDao.deleteFaq(faqNo);
    }
}