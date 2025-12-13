import React, { useState } from 'react';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import '../../styles/AdminLoginPage.css'; // 관리자 로그인 전용 CSS 파일을 import 한다고 가정

const AdminLoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // 실제 로그인 로직 (생략)
        
        if (userId === 'admin' && password === 'admin1234') {
            console.log("관리자 로그인 성공");
            alert("관리자 로그인 성공! 대시보드로 이동합니다.");
            // TODO: 성공 시 AdminPage로 리다이렉트 (useNavigate 사용)
        } else {
            console.log("로그인 실패: ID 또는 비밀번호 오류");
            alert("로그인 실패: ID 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        // page-wrapper 대신 전체 화면을 덮는 admin-full-screen-wrapper 사용
        <div className="admin-full-screen-wrapper"> 
            
            <div className="login-container centered">
                <div className="login-card">
                    <h2>관리자 로그인</h2>
                    <p>관리자 ID와 비밀번호를 입력해주세요.</p>
                    
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