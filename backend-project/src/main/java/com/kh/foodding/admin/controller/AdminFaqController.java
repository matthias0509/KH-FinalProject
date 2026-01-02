package com.kh.foodding.admin.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.kh.foodding.admin.model.service.FaqService; // 서비스 생성 필요
import com.kh.foodding.admin.model.vo.Faq;

@RestController
@RequestMapping("/api/admin/faq")
public class AdminFaqController {

    @Autowired
    private FaqService faqService;

    @GetMapping("/list")
    public List<Faq> getFaqList() {
        return faqService.selectFaqList();
    }

    @PostMapping("/add")
    public String addFaq(@RequestBody Faq faq) {
        return faqService.insertFaq(faq) > 0 ? "Success" : "Fail";
    }

    @PutMapping("/update")
    public String updateFaq(@RequestBody Faq faq) {
        return faqService.updateFaq(faq) > 0 ? "Success" : "Fail";
    }

    @DeleteMapping("/delete/{faqNo}")
    public String deleteFaq(@PathVariable int faqNo) {
        return faqService.deleteFaq(faqNo) > 0 ? "Success" : "Fail";
    }
}