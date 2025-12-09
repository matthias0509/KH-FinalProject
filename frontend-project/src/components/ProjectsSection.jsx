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
  const visibleProjects = typeof limit === 'number' ? projects.slice(0, limit) : projects;

  return (
    <section className={className.trim()}>
      <div className="section-header">
        <h2 className="section-title">
          {title} <span className="text-accent">{count}</span>
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
    </section>
  );
}
