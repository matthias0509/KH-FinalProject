import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import ProjectsSection from '../components/ProjectsSection';
import AppFooter from '../components/AppFooter';
import { categories } from '../data/content';
import { fetchProjectList } from '../api/projectApi';
import { mapProjectListResponse } from '../utils/projectMappers';

function ImbakPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchProjectList(60);
        if (!mounted) return;
        setProjects(mapProjectListResponse(response));
      } catch (err) {
        if (!mounted) return;
        setError('프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const deadlineProjects = useMemo(() => {
    return projects.filter((project) => typeof project.daysLeft === 'number' && project.daysLeft <= 7 && project.daysLeft >= 0);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === '전체') {
      return deadlineProjects;
    }
    return deadlineProjects.filter((project) => project.category === selectedCategory);
  }, [deadlineProjects, selectedCategory]);

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => a.daysLeft - b.daysLeft);
  }, [filteredProjects]);

  return (
    <div className="app">
      <Header />
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="main-content">
        {isLoading && <div className="home-status">프로젝트를 불러오는 중입니다...</div>}
        {error && !isLoading && <div className="home-error">{error}</div>}
        {!isLoading && !error && sortedProjects.length === 0 && (
          <div className="home-status">7일 이내 마감되는 프로젝트가 없습니다.</div>
        )}
        {!isLoading && !error && sortedProjects.length > 0 && (
          <ProjectsSection
            title={`마감임박 ${selectedCategory === '전체' ? '프로젝트' : selectedCategory}`}
            count={sortedProjects.length}
            projects={sortedProjects}
            variant="compact"
            showSort={false}
          />
        )}
      </main>

      <AppFooter />
    </div>
  );
}

export default ImbakPage
