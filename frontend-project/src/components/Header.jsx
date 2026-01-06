import { useEffect, useMemo, useState } from 'react';
import { Search, User, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { fetchTrendingKeywords } from '../api/searchApi';

const fallbackKeywords = [
  '친환경 랩',
  '저당 간식',
  '비건 초콜릿',
  '무알콜 와인',
  '홈카페 키트',
  '전통 장 프로젝트',
  '아트보틀 막걸리',
  '여름 김치',
  '캠핑 밀키트',
  '스페셜티 콜드브루',
];

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadTrendingKeywords = async () => {
      try {
        const data = await fetchTrendingKeywords();
        if (!active) {
          return;
        }
        if (Array.isArray(data) && data.length > 0) {
          setTrendingKeywords(data.map((item) => item.keyword));
        }
      } catch (error) {
        console.error('실시간 검색어 조회 실패', error);
      }
    };

    loadTrendingKeywords();
    const interval = setInterval(loadTrendingKeywords, 60000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const displayedKeywords = useMemo(() => {
    return trendingKeywords.length ? trendingKeywords : fallbackKeywords;
  }, [trendingKeywords]);

  const handleSuggestionClick = (keyword) => {
    setSearchTerm(keyword);
    setShowSuggestions(false);
  };

  const runSearch = () => {
    const defaultKeyword = displayedKeywords[0] || '';
    const keyword = (searchTerm.trim() || defaultKeyword).trim();
    if (!keyword) return;
    setSearchTerm(keyword);
    setShowSuggestions(false);
    navigate(`/search?query=${encodeURIComponent(keyword)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch();
  };

  return (
    <header className="app-header">
      <div className="header__inner">
        <div className="header__brand">
          <Link to="/">
          <img src={logo} alt="Foodding" className="header__logo" />
          </Link>
          <nav className="header__nav">
            
            <Link to = "/" className="header__nav-link" > 
              푸슐랭
            </Link>

            <Link to="/imbak" className="header__nav-link">
              마감임박
            </Link>

            <Link to="/notice" className="header__nav-link">
              공지사항
            </Link>
            
            {/* <Link to="/login" className='header__nav-link'>
              (로그인)
            </Link> */}

             
            
           
          </nav>
        </div>
        <div className="header__actions">
          <form className="search-container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              placeholder="검색어를 입력하세요"
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            <button
              type="submit"
              className="icon-button"
              aria-label="검색"
              onBlur={() => setShowSuggestions(false)}
            >
              <Search size={20} color="#6b7280" />
            </button>
            {showSuggestions && (
              <div className="search-suggestions">
                {displayedKeywords.map((keyword, index) => (
                  <button
                    key={keyword}
                    type="button"
                    className="search-suggestion"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionClick(keyword)}
                  >
                    <span className="search-suggestion__rank">{index + 1}</span>
                    <span>{keyword}</span>
                  </button>
                ))}
              </div>
            )}
          </form>
          <a href='/mypage/like' type="button" className="icon-button" aria-label="관심 프로젝트">
            <Heart size={20} color="#6b7280" />
          </a>

        
          <a href="/mypage" type="button" className="icon-button" aria-label="마이 페이지">
            <User size={20} color="#6b7280" />
          </a>
          
          <Link to="/create" className="header__cta">
            프로젝트 올리기
          </Link>
        </div>
      </div>
    </header>
  );
}
