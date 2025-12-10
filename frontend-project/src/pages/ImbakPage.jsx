import { useState } from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import ProjectsSection from '../components/ProjectsSection';
import AppFooter from '../components/AppFooter';
import { categories, projects } from '../data/content';

function ImbakPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredProjects =
    selectedCategory === '전체'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const sortedProjects = [...filteredProjects].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="app">
      <Header />
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="main-content">
        <ProjectsSection
          title={`마감임박 ${selectedCategory === '전체' ? '프로젝트' : selectedCategory}`}
          count={sortedProjects.length}
          projects={sortedProjects}
          variant="compact"
          showSort={false}
        />
      </main>

      <AppFooter />
    </div>
  );
}

export default ImbakPage
