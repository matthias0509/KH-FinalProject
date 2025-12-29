package com.kh.foodding.chat.model.vo;

import java.sql.Timestamp;

public class Chatroom {
    private Long chatroomNo;
    private Timestamp chatroomCreateDate;
    private Long buyer;
    private Long seller;
    
    // Getters and Setters
    public Long getChatroomNo() {
        return chatroomNo;
    }
    
    public void setChatroomNo(Long chatroomNo) {
        this.chatroomNo = chatroomNo;
    }
    
    public Timestamp getChatroomCreateDate() {
        return chatroomCreateDate;
    }
    
    public void setChatroomCreateDate(Timestamp chatroomCreateDate) {
        this.chatroomCreateDate = chatroomCreateDate;
    }
    
    public Long getBuyer() {
        return buyer;
    }
    
    public void setBuyer(Long buyer) {
        this.buyer = buyer;
    }
    
    public Long getSeller() {
        return seller;
    }
    
    public void setSeller(Long seller) {
        this.seller = seller;
    }
}

