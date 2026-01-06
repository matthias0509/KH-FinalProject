package com.kh.foodding.project.dto;

// 관리자에서 프로젝트 노출 여부(Y/N)를 갱신할 때 사용하는 요청 DTO
public class ProductVisibilityUpdateRequest {

    private String productYn;

    public String getProductYn() {
        return productYn;
    }

    public void setProductYn(String productYn) {
        this.productYn = productYn;
    }
}
