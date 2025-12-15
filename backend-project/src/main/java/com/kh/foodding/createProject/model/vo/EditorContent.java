package com.kh.foodding.createProject.model.vo;

import com.fasterxml.jackson.annotation.JsonRawValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * tiptap 에디터에서 넘어오는 본문을 감싸는 VO.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditorContent {

    private String html;   // editor.getHTML()

    @JsonRawValue
    private String json;   // editor.getJSON()
}
