import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 추가
import axios from 'axios';
import '../../styles/AdminLoginPage.css';

const AdminLoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 2. navigate 객체 생성

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // 백엔드 로그인 API 호출
            const response = await axios.post('http://localhost:8001/foodding/login', {
                userId: userId,
                userPwd: password
            });

            // 3. 응답 데이터 확인 (백엔드에서 넘겨주는 구조에 맞춰 수정 필요)
            const { token, user } = response.data;

            // 4. 관리자 권한 확인 (ADMIN)
            if (user && user.userRole === 'ADMIN') {
                console.log("관리자 로그인 성공");
                
                // 세션에 로그인 정보 저장 (토큰 및 유저 정보)
                sessionStorage.setItem("loginUser", JSON.stringify(response.data));
                
                alert(`${user.userName} 관리자님, 환영합니다!`);
                navigate('/adminpage'); // 5. 관리자 페이지로 이동
            } else {
                alert("관리자 권한이 없습니다. 접근할 수 없습니다.");
            }
        } catch (error) {
            console.error("로그인 에러:", error);
            alert("로그인 실패: ID 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        <div className="admin-full-screen-wrapper"> 
            <div className="login-container centered">
                <div className="login-card">
                    <h2>관리자 로그인</h2>
                    <p>관리 시스템 접속을 위해 인증이 필요합니다.</p>
                    
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="userId">관리자 ID</label>
                            <input 
                                type="text" 
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="ID 입력"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                                required
                            />
                        </div>

                        <button type="submit" className="login-button">
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;