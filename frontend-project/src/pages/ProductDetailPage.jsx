import { useState } from 'react';
import { Heart } from 'lucide-react';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import { premiumMacaronDetail } from '../data/content';

const currencyFormatter = new Intl.NumberFormat('ko-KR');

export default function ProductDetailPage() {
  const project = premiumMacaronDetail;
  const progressRate = Math.round((project.funding.raised / project.funding.goal) * 100);
  const progressWidth = Math.min(progressRate, 100);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const handleCreatorProfileClick = () => {
    console.log('Creator profile clicked');
  };

  return (
    <div className="app">
      <Header />
      <main className="product-detail">
        <section className="detail-hero">
          <div className="detail-hero__media">
            <img src={project.heroImage} alt={project.title} />
          </div>
          <div className="detail-hero__content">
            <div className="detail-hero__tags">
              <span className="tag">{project.category}</span>
              <span className="tag tag--muted">{project.location}</span>
              {project.badges.map((badge) => (
                <span key={badge} className="tag tag--outline">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="detail-hero__title">{project.title}</h1>
            <p className="detail-hero__subtitle">{project.subtitle}</p>

            <div className="detail-progress">
              <div className="detail-progress__bar">
                <span className="detail-progress__fill" style={{ width: `${progressWidth}%` }} />
              </div>
              <div className="detail-progress__stats">
                <div>
                  <strong>{project.funding.percent}%</strong>
                  <span>달성률</span>
                </div>
                <div>
                  <strong>{currencyFormatter.format(project.funding.raised)}원</strong>
                  <span>모인 금액</span>
                </div>
                <div>
                  <strong>{project.funding.backers.toLocaleString()}명</strong>
                  <span>후원자</span>
                </div>
                <div>
                  <strong>{project.funding.daysLeft}일</strong>
                  <span>남은 기간</span>
                </div>
              </div>
            </div>

            <div className="detail-hero__actions">
              <button type="button" className="detail-cta detail-cta--primary">
                지금 후원하기
              </button>
              <button
                type="button"
                className={`detail-cta detail-cta--ghost${isLiked ? ' is-active' : ''}`}
                onClick={toggleLike}
                aria-pressed={isLiked}
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  fill={isLiked ? '#ef4444' : 'none'}
                  color={isLiked ? '#b91c1c' : '#6b7280'}
                />
                {isLiked ? '좋아요 취소' : '좋아요'}
              </button>
            </div>

            <ul className="detail-highlights">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="detail-layout">
          <div className="detail-main">
            <section className="detail-section">
              <h2>프로젝트 스토리</h2>
              {project.story.map((block) => (
                <article key={block.heading} className="detail-story-block">
                  <h3>{block.heading}</h3>
                  {block.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {block.highlights && (
                    <ul className="detail-story-list">
                      {block.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  {block.image && (
                    <figure>
                      <img src={block.image} alt={block.caption ?? block.heading} />
                      {block.caption && <figcaption>{block.caption}</figcaption>}
                    </figure>
                  )}
                </article>
              ))}
            </section>

            <section className="detail-section">
              <h2>생산 및 배송 일정</h2>
              <ul className="detail-timeline">
                {project.timeline.map((item) => (
                  <li key={item.title}>
                    <div className="detail-timeline__date">{item.date}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail-section">
              <h2>FAQ</h2>
              <div className="detail-faq">
                {project.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="detail-card">
              <button
                type="button"
                className="detail-creator__profile"
                onClick={handleCreatorProfileClick}
              >
                <img src={project.creator.avatar} alt={project.creator.name} />
                <div>
                  <h4>{project.creator.name}</h4>
                  <span className="detail-creator__followers">
                    팔로워 {project.creator.followers.toLocaleString()}명
                  </span>
                </div>
              </button>
              <div className="detail-creator__actions">
                <button
                  type="button"
                  className={`detail-cta detail-cta--follow${isFollowing ? ' is-active' : ''}`}
                  onClick={toggleFollow}
                  aria-pressed={isFollowing}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
                </button>
                <button type="button" className="detail-cta detail-cta--chat">
                  문의하기
                </button>
              </div>
            </div>

            <div className="detail-card" >
              <h3>리워드 선택</h3>
              {/* <div className="detail-rewards detail-rewards--scroll"> */}
                {project.rewards.map((reward) => (
                  <div key={reward.id} className="detail-reward">
                    <div className="detail-reward__header">
                      <h4>{reward.title}</h4>
                      <span>{currencyFormatter.format(reward.price)}원</span>
                    </div>
                    <p>{reward.description}</p>
                    <ul>
                      {reward.includes.map((include) => (
                        <li key={include}>{include}</li>
                      ))}
                    </ul>
                    <div className="detail-reward__shipping">배송 예정: {reward.shipping}</div>
                    <button type="button" className="detail-cta detail-cta--outline">
                      리워드 선택
                    </button>
                  </div>
                ))}
              {/* </div> */}
            </div>

          </aside>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
