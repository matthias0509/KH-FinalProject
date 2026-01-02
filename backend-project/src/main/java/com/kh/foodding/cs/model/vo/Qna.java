package com.kh.foodding.cs.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Qna {
	private int qnaNo;
    private String qnaTitle;
    private String qnaContent;
    private String qnaDate;
    private String answerContent;
    private String answerDate;
    private int userNo;
    private String userId;
    private String userName;
}
