import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function AppFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <img src={logo} alt="Foodding" className="footer__logo" />
          </div>
          <div>
            <h3 className="footer__heading">서비스</h3>
            <div className="footer__links">
              <Link to="/" className="footer__link" onClick={scrollToTop}>
                푸슐랭
              </Link>
              <Link to="/imbak" className="footer__link" onClick={scrollToTop}>
                마감임박
              </Link>

            </div>
          </div>
          <div>
            <h3 className="footer__heading">지원</h3>
            <div className="footer__links">
              <Link to="/notice" className="footer__link" onClick={scrollToTop}>
                공지사항
              </Link>
              <Link to="#" className="footer__link" onClick={scrollToTop}>
                가이드
              </Link>
              <Link to="/faq" className="footer__link" onClick={scrollToTop}>
                문의하기
              </Link>
            </div>
          </div>
          <div>
            <h3 className="footer__heading">회사</h3>
            <div className="footer__links">
              <Link to="#" className="footer__link" onClick={scrollToTop}>
                회사소개
              </Link>
              <Link to="#" className="footer__link" onClick={scrollToTop}>
                이용약관
              </Link>
              <Link to="#" className="footer__link" onClick={scrollToTop}>
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 Foodding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
