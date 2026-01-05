import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; 
import AppFooter from './AppFooter'; 
import Sidebar from './Sidebar'; 
import '../styles/MyPageLayout.css';

const MyPageLayout = ({ children, userInfo: propUserInfo }) => { // 1. props로 userInfo 받기
    
    // 2. 내 정보를 저장할 그릇 (부모가 줬으면 그거 쓰고, 없으면 null)
    const [myInfo, setMyInfo] = useState(propUserInfo || null);

    // 3. 부모(App.js)가 나중에라도 정보를 주면 업데이트 (동기화)
    useEffect(() => {
        if (propUserInfo) {
            setMyInfo(propUserInfo);
        }
    }, [propUserInfo]);

    // 4. 정보가 없으면 스스로 서버에서 가져오기 (새로고침 대응)
    useEffect(() => {
        const fetchUserInfo = async () => {
            // 이미 정보가 있으면 굳이 또 부르지 않음
            if (myInfo) return; 

            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                console.log('📡 [MyPageLayout] 내 정보 요청 시작...');
                const response = await axios.get("http://localhost:8001/foodding/api/mypage/info", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log('✅ [MyPageLayout] 정보 로드 성공:', response.data);
                setMyInfo(response.data); 

            } catch (error) {
                console.error("❌ [MyPageLayout] 정보 로드 실패:", error);
            }
        };

        fetchUserInfo();
    }, [myInfo]);

  if (!myInfo && !propUserInfo) {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true, state: { message: '로그인이 필요한 서비스입니다.' } });
      return null;
    }
  }
 // myInfo가 없을 때만 실행

    return (
        <div className="page-wrapper">
            <Header />
            
            <div className="mypage-container">
                {/* 🚨 5. 확보한 내 정보(myInfo)를 사이드바에 전달 */}
                <Sidebar userInfo={myInfo} />
                
                <main className="main-content">
                    {children}
                </main>
            </div>

            <AppFooter />
        </div>
    );
};

export default MyPageLayout;