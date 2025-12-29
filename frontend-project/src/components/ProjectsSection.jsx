import { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({
  title,
  count,
  projects,
  variant = 'featured',
  limit,
  className = '',
  showSort = true,
}) {
  const gridClass = `project-grid${variant === 'compact' ? ' project-grid--compact' : ''}`;
  const pageSize = typeof limit === 'number' && limit > 0 ? limit : projects.length || 1;
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [projects, pageSize]);

  const visibleProjects = useMemo(() => {
    if (!projects.length) return [];
    const start = page * pageSize;
    return projects.slice(start, start + pageSize);
  }, [projects, page, pageSize]);

  const maxVisiblePages = 5;
  const startPageIndex = Math.floor(page / maxVisiblePages) * maxVisiblePages;
  const visiblePageNumbers = Array.from({ length: Math.min(maxVisiblePages, totalPages - startPageIndex) }, (_, index) => startPageIndex + index);

  const goToPage = (target) => {
    setPage(Math.max(0, Math.min(totalPages - 1, target)));
  };

  return (
    <section className={className.trim()}>
      <div className="section-header">
        <h2 className="section-title">
          {title}
          {typeof count === 'number' && (
            <span className="text-accent">{count}</span>
          )}
        </h2>
        {showSort && (
          <select className="select-control">
            <option>인기순</option>
            <option>최신순</option>
            <option>마감임박순</option>
          </select>
        )}
      </div>
      <div className={gridClass}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant={variant} />
        ))}
      </div>
      {limit && totalPages > 1 && (
        <div className="projects-pagination">
          <button
            type="button"
            className="projects-pagination__button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
          >
            이전
          </button>
          {visiblePageNumbers.map((pageNumber) => (
            <button
              key={`page-${pageNumber}`}
              type="button"
              className={`projects-pagination__button${pageNumber === page ? ' is-active' : ''}`}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            type="button"
            className="projects-pagination__button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
          >
            다음
          </button>
        </div>
      )}
    </section>
  );
}
