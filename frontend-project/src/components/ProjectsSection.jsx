import { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({
  title,
  count,
  projects = [],
  variant = 'featured',
  limit,
  className = '',
  showSort = true,
  persistSortKey,
}) {
  const gridClass = `project-grid${variant === 'compact' ? ' project-grid--compact' : ''}`;
  const tabOptions = [
    { value: 'popular', label: '전체' },
    { value: 'topFunded', label: '모집금액순' },
    { value: 'closing', label: '마감임박순' },
    { value: 'latest', label: '최신순' },
  ];
  const allowedSorts = tabOptions.map((tab) => tab.value);
  const storageKey = showSort ? persistSortKey || (title ? `projects-section:${title}` : null) : null;
  const readStoredSort = () => {
    if (!storageKey || typeof window === 'undefined') {
      return 'popular';
    }
    const stored = window.sessionStorage.getItem(storageKey);
    return allowedSorts.includes(stored) ? stored : 'popular';
  };
  const [sortOption, setSortOption] = useState(readStoredSort);
  const pageSize = typeof limit === 'number' && limit > 0 ? limit : projects.length || 1;

  const sortedProjects = useMemo(() => {
    if (!projects.length) {
      return [];
    }

    const items = [...projects];

    const getProgressScore = (project) => {
      const goalAmount = Number(project.goal) || 0;
      const currentAmount = Number(project.current) || 0;
      if (goalAmount > 0) {
        return currentAmount / goalAmount;
      }
      return currentAmount > 0 ? Number.POSITIVE_INFINITY : 0;
    };

    if (sortOption === 'latest') {
      return items.sort((a, b) => {
        const aTime = typeof a.createdAt === 'number' ? a.createdAt : 0;
        const bTime = typeof b.createdAt === 'number' ? b.createdAt : 0;
        return bTime - aTime;
      });
    }

    if (sortOption === 'closing') {
      return items.sort((a, b) => {
        const aDays = Number.isFinite(a.daysLeft) ? a.daysLeft : Number.POSITIVE_INFINITY;
        const bDays = Number.isFinite(b.daysLeft) ? b.daysLeft : Number.POSITIVE_INFINITY;
        const aEnded = aDays <= 0;
        const bEnded = bDays <= 0;

        if (aEnded && !bEnded) return 1;
        if (!aEnded && bEnded) return -1;
        return aDays - bDays;
      });
    }

    if (sortOption === 'topFunded') {
      return items.sort((a, b) => (Number(b.current) || 0) - (Number(a.current) || 0));
    }

    // 인기순 (기본) - 달성률 기준 내림차순 / 전체 역할
    return items.sort((a, b) => getProgressScore(b) - getProgressScore(a));
  }, [projects, sortOption]);

  const totalPages = Math.max(1, Math.ceil(sortedProjects.length / pageSize));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [projects, pageSize, sortOption]);

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') {
      return;
    }
    window.sessionStorage.setItem(storageKey, sortOption);
  }, [sortOption, storageKey]);

  const visibleProjects = useMemo(() => {
    if (!sortedProjects.length) return [];
    const start = page * pageSize;
    return sortedProjects.slice(start, start + pageSize);
  }, [sortedProjects, page, pageSize]);

  const maxVisiblePages = 5;
  const startPageIndex = Math.floor(page / maxVisiblePages) * maxVisiblePages;
  const visiblePageNumbers = Array.from({ length: Math.min(maxVisiblePages, totalPages - startPageIndex) }, (_, index) => startPageIndex + index);

  const goToPage = (target) => {
    setPage(Math.max(0, Math.min(totalPages - 1, target)));
  };

  return (
    <section className={className.trim()}>
      <div className="projects-section__header">
        <h2 className="projects-section__title">
          {title}
          {typeof count === 'number' && (
            <span className="text-accent">{count}</span>
          )}
        </h2>
        {showSort && (
          <div className="projects-sort" role="tablist" aria-label="프로젝트 정렬">
            {tabOptions.map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={`projects-sort__button${tab.value === sortOption ? ' is-active' : ''}`}
                onClick={() => setSortOption(tab.value)}
                aria-pressed={tab.value === sortOption}
              >
                {tab.label}
              </button>
            ))}
          </div>
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
