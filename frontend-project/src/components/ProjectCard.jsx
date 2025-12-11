import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, variant = 'featured' }) {
  const rate = Math.floor((project.current / project.goal) * 100);
  const daysLabel = variant === 'featured' ? `${project.daysLeft}일 남음` : `${project.daysLeft}일`;

  const cardContent = (
    <div className={`project-card${variant === 'compact' ? ' project-card--compact' : ''}`}>
      <div className="project-card__media">
        <img src={project.image} alt={project.title} className="project-card__image" />
        <button type="button" className="project-card__wish" aria-label="관심 프로젝트">
          <Heart size={16} color="#6b7280" />
        </button>
      </div>
      <div className="project-card__body">
        <div className="project-card__category">
          <span className="tag">{project.category}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__progress">
          <div className="project-card__progress-label">{rate}% 달성</div>
          <div className={`progress-bar${variant === 'compact' ? ' progress-bar--compact' : ''}`}>
            <div
              className="progress-bar__fill"
              style={{ '--progress-width': `${Math.min(rate, 100)}%` }}
            />
          </div>
        </div>
        <div className="project-card__meta">
          <span>{project.current.toLocaleString()}원</span>
          <span>{daysLabel}</span>
        </div>
      </div>
    </div>
  );

  if (project.detailPath) {
    return (
      <Link to={project.detailPath} className="project-card__link">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
