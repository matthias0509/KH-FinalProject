import '../../pages/Login/Login.css';
import { Link } from 'react-router-dom';

export default function AuthLinkGroup() {
    return (
        <div className="link-group">
            <Link to="/createmember" className="link">회원가입</Link>
            <span className="separator">|</span>
            <Link to="/findid" className="link">아이디 찾기</Link>
             <span className="separator">|</span>
            <Link to="/resetpassword" className="link">비밀번호 변경</Link>
        </div>
    );
}