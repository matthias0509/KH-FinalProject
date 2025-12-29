import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // 🚨 경로 확인 필요
import AppFooter from './AppFooter'; // 🚨 경로 확인 필요
import Sidebar from './Sidebar'; // 사이드바 불러오기
import '../styles/MyPageLayout.css';

const MyPageLayout = ({ children }) => {
    const navigate = useNavigate();
    
    // 1. 내 정보를 저장할 그릇
    const [userInfo, setUserInfo] = useState({
        userName: '',
        nickname: '',
        modifyProfile: '', 
        role: ''
    });

    // 2. 페이지가 뜰 때마다 서버에서 내 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return; // 토큰 없으면 패스 (로그인 페이지 리다이렉트는 선택)
                }

                const response = await axios.get("http://localhost:8001/foodding/api/mypage/info", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setUserInfo(response.data); // 받아온 정보를 저장!

            } catch (error) {
                console.error("내 정보 로딩 실패:", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="page-wrapper">
            <Header />
            
            <div className="mypage-container">
                {/* 🚨 핵심: 여기서 데이터를 사이드바에 넘겨줍니다! */}
                <Sidebar userInfo={userInfo} />
                
                {/* 각 페이지의 실제 내용이 들어가는 자리 */}
                <div className="main-content">
                    {children}
                </div>
            </div>

            <AppFooter />
        </div>
    );
};

export default MyPageLayout;