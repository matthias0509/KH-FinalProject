package com.kh.foodding.createProject.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.ToString;
import lombok.Builder.Default;

/**
 * 프로젝트 생성 페이지에서 입력받는 값들을 한 번에 받기 위한 VO.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Project {

    private Long tempNo;
    private Long productNo;
    private Long userNo;             // 내부 사용자 번호

    private String title;               // 프로젝트 제목
    private String summary;             // 프로젝트 한 줄 요약
    private String category;            // 프로젝트 카테고리
    private String thumbnailUrl;            // 프로젝트 썸네일명
    private String thumbnailPath;           // 업로드된 썸네일 URL

    private LocalDate fundStartDate;        // 프로젝트 시작일
    private LocalDate fundEndDate;          // 프로젝트 마감일
    private BigDecimal targetAmount;       // 프로젝트 목표 금액

    private LocalDate shipStartDate;        // 발송 예정일


    private BigDecimal currentAmount;      // 현재까지 모금된 금액 0원
    
    private String status;                  // 프로젝트 상태 임시저장/제출/승인

    

    @Singular("tag")
    private List<String> tags;

    @Singular("attachment")
    private List<String> attachmentUrls;

    @Default
    private boolean commentsEnabled = true;

    @Default
    private boolean featured = false;

    @Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    private EditorContent content;

     private List<Reward> rewards;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Reward {
        private String title;
        private BigDecimal price;
        private String description;
    }
  
}

