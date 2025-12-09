import { Search, User, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header__inner">
        <div className="header__brand">
          <img src={logo} alt="Foodding" className="header__logo" />
          <nav className="header__nav">
            <a href="http://localhost:5173/" className="header__nav-link">펀딩하기</a>
            <a href="#" className="header__nav-link">마감임박</a>
            <a href="#" className="header__nav-link">공지사항</a>
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
          <button type="button" className="header__cta"><a href="http://localhost:5173/create">프로젝트 올리기</a></button>
        </div>
      </div>
    </header>
  );
}
