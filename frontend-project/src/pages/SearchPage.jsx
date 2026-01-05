import AppFooter from '../components/AppFooter';
import Header from '../components/Header';
import ProjectsSection from '../components/ProjectsSection';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProjectList } from '../api/projectApi';
import { mapProjectListResponse } from '../utils/projectMappers';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim() ?? '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (!query) {
      setResults([]);
      setError('');
      return () => {
        isMounted = false;
      };
    }

    const runSearch = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProjectList(50, query);
        if (!isMounted) {
          return;
        }
        const normalizedQuery = query.toLowerCase();
        const mapped = mapProjectListResponse(data);
        const filtered = mapped.filter((project) =>
          (project.title ?? '').toLowerCase().includes(normalizedQuery),
        );
        setResults(filtered);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError('검색 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        setResults([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    runSearch();

    return () => {
      isMounted = false;
    };
  }, [query]);

  const hasQuery = Boolean(query);
  const resultCount = useMemo(() => results.length, [results]);

  return (
    <div className="app">
      <Header />
      <main className="main-content" style={{ paddingTop: "32px" }}>
        {!hasQuery && (
          <div className="search-empty-state">
            <h2>검색어를 입력해주세요.</h2>
            <p>상단 검색창 또는 추천 키워드를 사용해 검색을 시작할 수 있어요.</p>
          </div>
        )}

        {hasQuery && loading && (
          <div className="search-empty-state">
            <h2>검색 중입니다...</h2>
            <p>잠시만 기다려 주세요.</p>
          </div>
        )}

        {hasQuery && !loading && error && (
          <div className="search-empty-state">
            <h2>검색 오류</h2>
            <p>{error}</p>
          </div>
        )}

        {hasQuery && !loading && !error && resultCount > 0 && (
          <ProjectsSection
            title={`"${query}" 검색 결과`}
            count={resultCount}
            projects={results}
            variant="compact"
            showSort={false}
          />
        )}

        {hasQuery && !loading && !error && resultCount === 0 && (
          <div className="search-empty-state search-empty-state--expanded">
            <h2>검색 결과가 없습니다.</h2>
            <p>다른 키워드를 입력하거나 실시간 인기 검색어를 선택해보세요.</p>
          </div>
        )}
      </main>
         <AppFooter/>
    </div>
  );
}
