import { Link } from 'react-router-dom';
import { getProjectDetailPath } from '../utils/projectPaths';

const BEST_TABS = ['전체', '테크·가전', '뷰티', '푸드'];

export default function RankSection({ projects = [] }) {
  return (
    <aside className="rank-section">
      <div className="rank-card">
        <h2 className="section-title">실시간 베스트</h2>
        <br />
        <div className="rank-list">
          {projects.map((project, idx) => {
            const goalAmount = Number(project.goal) || 0;
            const currentAmount = Number(project.current) || 0;
            const rate = goalAmount > 0 ? Math.floor((currentAmount / goalAmount) * 100) : 0;
            const detailPath = getProjectDetailPath(project);
            const key = project.id ?? project.projectNo ?? project.productNo ?? idx;
            const backers = project.backers ?? 0;
            const imageSrc = project.image || project.heroImage || '';
            const title = project.title ?? '프로젝트';
            const content = (
              <>
                <div className={`rank-item__index rank-item__index--${idx + 1}`}>
                  {idx + 1}
                </div>
                <div className="rank-item__thumb">
                  <img src={imageSrc} alt={title} />
                </div>
                <div className="rank-item__body">
                  <h3 className="rank-item__title">{title}</h3>
                  <div className="rank-item__meta">
                    <span className="rank-item__category">{project.category ?? '기타'}</span>
                  </div>
                  <div className="rank-item__progress">{rate}% 달성</div>
                </div>
              </>
            );

            if (detailPath) {
              return (
                <Link key={key} to={detailPath} className="rank-item">
                  {content}
                </Link>
              );
            }

            return (
              <div key={key} className="rank-item">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
