package com.kh.foodding.admin.model.vo;
import lombok.Data;

@Data
public class Faq {
    private int faqNo;
    private String question;
    private String answer;
    private String createDate;
}