package com.kh.foodding.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.foodding.chat.model.vo.Chatroom;
import com.kh.foodding.chat.model.vo.Message;

@Repository
public class ChatDao {
    
    // 채팅방 조회 (buyer와 seller로)
    public Chatroom selectChatroom(SqlSessionTemplate sqlSession, Map<String, Object> params) {
        return sqlSession.selectOne("chatMapper.selectChatroom", params);
    }
    
    // 채팅방 생성
    public int insertChatroom(SqlSessionTemplate sqlSession, Chatroom chatroom) {
        return sqlSession.insert("chatMapper.insertChatroom", chatroom);
    }
    
    // 메시지 저장
    public int insertMessage(SqlSessionTemplate sqlSession, Message message) {
        return sqlSession.insert("chatMapper.insertMessage", message);
    }
    
    // 메시지 조회
    public List<Message> selectMessageList(SqlSessionTemplate sqlSession, Long chatroomNo) {
        return sqlSession.selectList("chatMapper.selectMessageList", chatroomNo);
    }
    
    // 사용자의 채팅방 목록 조회
    public List<Map<String, Object>> selectChatroomListByUser(SqlSessionTemplate sqlSession, Long userNo) {
        return sqlSession.selectList("chatMapper.selectChatroomListByUser", userNo);
    }
}