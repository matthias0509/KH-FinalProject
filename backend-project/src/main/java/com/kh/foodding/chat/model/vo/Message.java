package com.kh.foodding.chat.model.vo;

import java.sql.Timestamp;

public class Message {
    private Long msgNo;
    private String msgContent;
    private Timestamp sendDate;
    private String readYn;
    private Long receiver;
    private Long sender;
    private Long chatroomNo;
    
    // Getters and Setters
    public Long getMsgNo() {
        return msgNo;
    }
    
    public void setMsgNo(Long msgNo) {
        this.msgNo = msgNo;
    }
    
    public String getMsgContent() {
        return msgContent;
    }
    
    public void setMsgContent(String msgContent) {
        this.msgContent = msgContent;
    }
    
    public Timestamp getSendDate() {
        return sendDate;
    }
    
    public void setSendDate(Timestamp sendDate) {
        this.sendDate = sendDate;
    }
    
    public String getReadYn() {
        return readYn;
    }
    
    public void setReadYn(String readYn) {
        this.readYn = readYn;
    }
    
    public Long getReceiver() {
        return receiver;
    }
    
    public void setReceiver(Long receiver) {
        this.receiver = receiver;
    }
    
    public Long getSender() {
        return sender;
    }
    
    public void setSender(Long sender) {
        this.sender = sender;
    }
    
    public Long getChatroomNo() {
        return chatroomNo;
    }
    
    public void setChatroomNo(Long chatroomNo) {
        this.chatroomNo = chatroomNo;
    }
    
    // JSON 응답을 위한 isRead 필드 (readYn을 boolean으로 변환)
    public boolean getIsRead() {
        return "Y".equals(this.readYn);
    }
}
