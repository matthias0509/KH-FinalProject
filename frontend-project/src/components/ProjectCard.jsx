import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjectDetailPath } from '../utils/projectPaths';

export default function ProjectCard({
  project,
  variant = 'featured',
  hideWish = false,
  hideProgress = false,
  hideMeta = false,
}) {
  const goalAmount = Number(project.goal) || 0;
  const currentAmount = Number(project.current) || 0;
  const rate = goalAmount > 0 ? Math.floor((currentAmount / goalAmount) * 100) : 0;
  const safeDaysLeft = Number.isFinite(project.daysLeft) ? project.daysLeft : 0;
  const daysLabel =
    variant === 'featured' ? `${safeDaysLeft}일 남음` : `${safeDaysLeft}일`;
  const [liked, setLiked] = useState(false);
  const detailPath = getProjectDetailPath(project);
  const imageSrc = project.image || project.heroImage || '';
  const categoryLabel = project.category ?? '기타';
  const title = project.title ?? '프로젝트';

  const toggleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLiked((prev) => !prev);
  };

  const cardContent = (
    <div className={`project-card${variant === 'compact' ? ' project-card--compact' : ''}`}>
      <div className="project-card__media">
        <img src={imageSrc} alt={title} className="project-card__image" />
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
          <span className="tag">{categoryLabel}</span>
        </div>
        <h3 className="project-card__title">{title}</h3>
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
            <span>{currentAmount.toLocaleString()}원</span>
            <span>{daysLabel}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (detailPath) {
    return (
      <Link to={detailPath} className="project-card__link">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
