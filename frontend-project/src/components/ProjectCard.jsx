import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({
  project,
  variant = 'featured',
  hideWish = false,
  hideProgress = false,
  hideMeta = false,
}) {
  const rate = Math.floor((project.current / project.goal) * 100);
  const daysLabel = variant === 'featured' ? `${project.daysLeft}일 남음` : `${project.daysLeft}일`;
  const [liked, setLiked] = useState(false);

  const toggleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLiked((prev) => !prev);
  };

  const cardContent = (
    <div className={`project-card${variant === 'compact' ? ' project-card--compact' : ''}`}>
      <div className="project-card__media">
        <img src={project.image} alt={project.title} className="project-card__image" />
        {!hideWish && (
          <button
            type="button"
            className={`project-card__wish${liked ? ' is-active' : ''}`}
            aria-label={liked ? '관심 프로젝트 설정됨' : '관심 프로젝트 설정'}
            aria-pressed={liked}
            onClick={toggleLike}
          >
            <Heart
              size={18}
              color={liked ? '#be123c' : '#4b5563'}
              fill={liked ? '#fb7185' : 'none'}
              strokeWidth={1.6}
            />
          </button>
        )}
      </div>
      <div className="project-card__body">
        <div className="project-card__category">
          <span className="tag">{project.category}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        {!hideProgress && (
          <div className="project-card__progress">
            <div className="project-card__progress-label">{rate}% 달성</div>
            <div className={`progress-bar${variant === 'compact' ? ' progress-bar--compact' : ''}`}>
              <div
                className="progress-bar__fill"
                style={{ '--progress-width': `${Math.min(rate, 100)}%` }}
              />
            </div>
          </div>
        )}
        {!hideMeta && (
          <div className="project-card__meta">
            <span>{project.current.toLocaleString()}원</span>
            <span>{daysLabel}</span>
          </div>
        )}
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
