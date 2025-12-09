import logo from '../assets/logo.png';

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <img src={logo} alt="Foodding" className="footer__logo" />
            <p className="footer__text">
              맛있는 아이디어를 함께 만들어가는<br />음식 크라우드펀딩 플랫폼
            </p>
          </div>
          <div>
            <h3 className="footer__heading">서비스</h3>
            <div className="footer__links">
              <a href="#" className="footer__link">펀딩하기</a>
              <a href="#" className="footer__link">스토어</a>
              <a href="#" className="footer__link">커뮤니티</a>
            </div>
          </div>
          <div>
            <h3 className="footer__heading">지원</h3>
            <div className="footer__links">
              <a href="#" className="footer__link">공지사항</a>
              <a href="#" className="footer__link">가이드</a>
              <a href="#" className="footer__link">문의하기</a>
            </div>
          </div>
          <div>
            <h3 className="footer__heading">회사</h3>
            <div className="footer__links">
              <a href="#" className="footer__link">회사소개</a>
              <a href="#" className="footer__link">이용약관</a>
              <a href="#" className="footer__link">개인정보처리방침</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2025 Foodding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
