const BEST_TABS = ['전체', '테크·가전', '뷰티', '푸드'];

export default function RankSection({ projects }) {
  return (
    <aside className="rank-section">
      <div className="rank-card">
        <h2 className="section-title">실시간 베스트</h2>
        <div className="rank-tabs">
          {BEST_TABS.map((tab, idx) => (
            <button
              type="button"
              key={tab}
              className={`rank-tab${idx === 0 ? ' is-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="rank-list">
          {projects.map((project, idx) => {
            const rate = Math.floor((project.current / project.goal) * 100);
            return (
              <div key={project.id} className="rank-item">
                <div className={`rank-item__index rank-item__index--${idx + 1}`}>
                  {idx + 1}
                </div>
                <div className="rank-item__thumb">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="rank-item__body">
                  <h3 className="rank-item__title">{project.title}</h3>
                  <div className="rank-item__meta">
                    <span className="rank-item__category">{project.category}</span>
                    <span>{project.backers}명 참여</span>
                  </div>
                  <div className="rank-item__progress">{rate}% 달성</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
