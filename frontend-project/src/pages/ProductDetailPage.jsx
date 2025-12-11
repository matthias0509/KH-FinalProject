import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import { premiumMacaronDetail } from '../data/content';

import { useNavigate } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('ko-KR');

export default function ProductDetailPage() {
  const project = premiumMacaronDetail;
  const REVIEWS_PER_PAGE = 5;
  const progressRate = Math.round((project.funding.raised / project.funding.goal) * 100);
  const progressWidth = Math.min(progressRate, 100);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState('story');
  const [reviewPage, setReviewPage] = useState(1);
  const rewardSectionRef = useRef(null);
  const reviews = project.reviews ?? [];
  const detailTabs = [
    { id: 'story', label: '프로젝트 스토리' },
    { id: 'reviews', label: `후기 (${reviews.length})` },
  ];
  const totalReviewPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  const currentReviewPage = Math.min(reviewPage, totalReviewPages);
  const paginatedReviews = reviews.slice(
    (currentReviewPage - 1) * REVIEWS_PER_PAGE,
    currentReviewPage * REVIEWS_PER_PAGE,
  );

  const navigate = useNavigate();

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const handleTabSelect = (tabId) => {
    setActiveDetailTab(tabId);
    if (tabId === 'reviews') {
      setReviewPage(1);
    }
  };


  const handleCreatorProfileClick = () => {
    console.log('Creator profile clicked');
  };

  const handleDonateClick = () => {
    rewardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePayment= () => {
    navigate('/payment')
  }

  const handleOpenChat = () => {
  const width = 400;
  const height = 650;
  const left = window.screen.width - width - 100;
  const top = (window.screen.height - height) / 2;
  
  const chatWindow = window.open(
    `/chat`,
    'ChatWindow',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
  );
  
  // 창이 로드되면 데이터 전달
  chatWindow.onload = () => {
    chatWindow.postMessage({
      type: 'CREATOR_DATA',
      creator: project.creator
    }, window.location.origin);
  };
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
              <button type="button" className="detail-cta detail-cta--primary" onClick={handleDonateClick}>
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
                {isLiked ? '좋아요' : '좋아요'}
              </button>
            </div>
          </div>
        </section>

        <div className="detail-tabs" role="tablist" aria-label="프로젝트 스토리 및 후기">
          {detailTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`detail-tab${activeDetailTab === tab.id ? ' is-active' : ''}`}
              onClick={() => handleTabSelect(tab.id)}
              role="tab"
              aria-selected={activeDetailTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            <section className="detail-section">
              {activeDetailTab === 'story' && (
                <div role="tabpanel">
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
                </div>
              )}

              {activeDetailTab === 'reviews' && (
                <div role="tabpanel">
                  <h2>후기</h2>
                  {reviews.length === 0 ? (
                    <p className="detail-review-empty">아직 작성된 후기가 없습니다.</p>
                  ) : (
                    <div className="detail-review-list">
                      {paginatedReviews.map((review) => (
                        <article key={review.id} className="detail-review">
                          <div className="detail-review__header">
                            <strong>{review.title}</strong>
                            <span>{review.date}</span>
                          </div>
                          <div className="detail-review__meta">
                            <span>{review.author}</span>
                            <span className="detail-review__rating" aria-label={`별점 ${review.rating}점`}>
                              {'★'.repeat(review.rating)}{'☆'.repeat(Math.max(0, 5 - review.rating))}
                            </span>
                          </div>
                          <p>{review.body}</p>
                        </article>
                      ))}
                      {totalReviewPages > 1 && (
                        <div className="detail-review-pagination" role="navigation" aria-label="후기 페이지">
                          {Array.from({ length: totalReviewPages }, (_, index) => index + 1).map((page) => (
                            <button
                              key={`review-page-${page}`}
                              type="button"
                              className={`detail-pagination__button${currentReviewPage === page ? ' is-active' : ''}`}
                              onClick={() => setReviewPage(page)}
                              aria-current={currentReviewPage === page ? 'page' : undefined}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>

            {activeDetailTab === 'story' && (
              <>
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
              </>
            )}
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
                <button type="button" className="detail-cta detail-cta--chat" onClick={handleOpenChat}>
                  1:1 문의하기
                </button>
              </div>
            </div>

            <div className="detail-card" ref={rewardSectionRef}>
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
                    <button type="button" className="detail-cta detail-cta--outline" onClick={handlePayment}>
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
