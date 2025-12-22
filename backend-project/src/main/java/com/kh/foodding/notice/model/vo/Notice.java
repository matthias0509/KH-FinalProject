package com.kh.foodding.notice.model.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Schema(name="Notice", description="TB_NOTICE 테이블 정보를 담는 VO클래스")
@Alias("notice")
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Notice {
	@Schema(description="공지 번호 (PK)")
    private int noticeNo;
    
    @Schema(description="공지 제목", example="푸딩 서비스 점검 안내")
    private String noticeTitle;
    
    @Schema(description="공지 내용")
    private String noticeContent;
    
    @Schema(description="공지 작성일")
    private Date noticeCreateDate;
    
    @Schema(description="조회수")
    private int noticeView;
    
    @Schema(description="공지사항 삭제 여부 (Y/N)", example="N")
    private String noticeYn;
}
