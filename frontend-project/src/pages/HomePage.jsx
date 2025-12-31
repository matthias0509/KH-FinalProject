import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import HeroSlider from '../components/HeroSlider';
import ProjectsSection from '../components/ProjectsSection';
import RankSection from '../components/RankSection';
import AppFooter from '../components/AppFooter';
import { categories, slides } from '../data/content';
import Snowfall from 'react-snowfall';
import { fetchProjectList } from '../api/projectApi';
import { mapProjectListResponse } from '../utils/projectMappers';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchProjectList(1000);
        if (!isMounted) {
          return;
        }
        setProjects(mapProjectListResponse(response));
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError('프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === '전체') {
      return projects;
    }
    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  const rankedProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const aGoal = Number(a.goal) || 0;
        const bGoal = Number(b.goal) || 0;
        const aRate = aGoal > 0 ? a.current / aGoal : 0;
        const bRate = bGoal > 0 ? b.current / bGoal : 0;
        return bRate - aRate;
      })
      .slice(0, 5);
  }, [projects]);

  const isAllCategory = selectedCategory === '전체';
  const hasProjects = filteredProjects.length > 0;

  return (
    <div className="app" style={{ position: 'relative' }}>
    
      <Snowfall
       color="#2883faff"
        style={{
          
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      />
     

      {/* 실제 페이지 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />

        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {isAllCategory && <HeroSlider slides={slides} />}

        <main className="main-content">
          {isLoading && <div className="home-status">프로젝트를 불러오는 중입니다...</div>}
          {error && <div className="home-error">{error}</div>}

          {!isLoading && !error && !hasProjects && (
            <div className="home-status">표시할 프로젝트가 없습니다.</div>
          )}

          {!isLoading && !error && hasProjects && (
            isAllCategory ? (
              <div className="home-grid">
                <ProjectsSection
                  title="주목할 만한 프로젝트"
                  projects={filteredProjects}
                  variant="featured"
                  limit={6}
                  className="project-section"
                />
                <RankSection projects={rankedProjects} />
              </div>
            ) : (
              <ProjectsSection
                title={`${selectedCategory} 프로젝트`}
                count={filteredProjects.length}
                projects={filteredProjects}
                variant="compact"
              />
            )
          )}
        </main>

        <AppFooter />
      </div>
    </div>
  );
}
