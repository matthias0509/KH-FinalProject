import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './LoginPage.css';
import Header from '../Header';
import AppFooter from '../AppFooter';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 폼 제출(로그인 버튼 클릭) 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 로그인 로직
    console.log('로그인 시도:');
    console.log('아이디:', username);
    console.log('비밀번호:', password);

    // 로그인 성공 시, navigate('/main') 등을 사용하여 페이지 이동
  };

  return (
    <div>
      <Header />
      <div className="login-container-wrapper">
        <div className="login-box">{/* 폼 배경 컨테이너 */}
          <h2 className="login-title">로그인</h2>
          <form onSubmit={handleSubmit}>
            {/* 아이디 입력 필드 */}
            <div className="input-group">
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="아이디를 입력하세요"
              />
            </div>
            {/* 비밀번호 입력 필드 */}
            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {/* 로그인 버튼 */}
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
          {/* 기타 이동 링크 그룹 */}
          <div className="link-group">
            <Link to="/createmember" className="link">회원가입</Link>
            <span className="separator">|</span>
            <Link to="/find-id" className="link">아이디 찾기</Link>
            <span className="separator">|</span>
            <Link to="/reset-password" className="link">비밀번호 변경</Link>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default LoginPage;
