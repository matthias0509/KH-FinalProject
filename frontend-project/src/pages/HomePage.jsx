import { useState } from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import HeroSlider from '../components/HeroSlider';
import ProjectsSection from '../components/ProjectsSection';
import RankSection from '../components/RankSection';
import AppFooter from '../components/AppFooter';
import { categories, projects, slides } from '../data/content';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredProjects =
    selectedCategory === '전체'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const rankedProjects = [...projects]
    .sort((a, b) => b.current / b.goal - a.current / a.goal)
    .slice(0, 5);

  const isAllCategory = selectedCategory === '전체';

  return (
    <div className="app">
      <Header />
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {isAllCategory && <HeroSlider slides={slides} />}

      <main className="main-content">
        {isAllCategory ? (
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
        )}
      </main>

      <AppFooter />
    </div>
  );
}
