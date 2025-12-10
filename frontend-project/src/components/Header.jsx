import { Search, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header__inner">
        <div className="header__brand">
          <img src={logo} alt="Foodding" className="header__logo" />
          <nav className="header__nav">
            <a href="http://localhost:5173/" className="header__nav-link">프로젝트</a>
            <a href="/imbak" className="header__nav-link">마감임박</a>
            <a href="/notice" className="header__nav-link">공지사항</a>
          </nav>
        </div>
        <div className="header__actions">
          <button type="button" className="icon-button" aria-label="검색">
            <Search size={20} color="#6b7280" />
          </button>
          <button type="button" className="icon-button" aria-label="관심 프로젝트">
            <Heart size={20} color="#6b7280" />
          </button>
          <button type="button" className="icon-button" aria-label="마이 페이지">
            <User size={20} color="#6b7280" />
          </button>
          <Link to="/create" className="header__cta">
            프로젝트 올리기
          </Link>
        </div>
      </div>
    </header>
  );
}
