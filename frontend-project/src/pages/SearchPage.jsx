import AppFooter from '../components/AppFooter';
import Header from '../components/Header';
import ProjectsSection from '../components/ProjectsSection';
import { projects } from '../data/content';
import { useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim() ?? '';
  const normalizedQuery = query.toLowerCase();
  const results = normalizedQuery
    ? projects.filter((project) => project.title.toLowerCase().includes(normalizedQuery))
    : [];

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {query ? (
          results.length ? (
            <ProjectsSection
              title={`"${query}" 검색 결과`}
              count={results.length}
              projects={results}
              variant="compact"
              showSort={false}
            />
          ) : (
            <div className="search-empty-state">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h2>검색 결과가 없습니다.</h2>
              <p>
                다른 키워드를 입력하거나 실시간 인기 검색어를 선택해보세요.
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          )
        ) : (
          <div className="search-empty-state">
            <h2>검색어를 입력해주세요.</h2>
            <p>상단 검색창 또는 추천 키워드를 사용해 검색을 시작할 수 있어요.</p>
          </div>
          
        )}
      </main>
         <AppFooter/>
    </div>
  );
}
