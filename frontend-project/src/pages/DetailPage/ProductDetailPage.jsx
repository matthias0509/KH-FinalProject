import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

import { useNavigate, useParams } from 'react-router-dom';
import { fetchProjectAxios } from './DetailApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { resolveProjectImageUrl } from '../../utils/projectMedia';

const currencyFormatter = new Intl.NumberFormat('ko-KR');
const DEFAULT_AVATAR = 'https://placehold.co/80x80?text=Maker';



  let projectInit = {
  projectNo: '',
  productTitle: '',
  productDesc: '',
  storyHtml: '',
  storyJson: '',
  targetAmount: 0,
  currentAmount: 0,
  fundStartDate: '',
  fundEndDate: '',
  shipStartDate: '',
  productStatus: '',
  category: '',
  originThumbnail: '',
  modifyThumbnail: '',
  createDate: '',
  productYn: '',
  sellerNo: '',
  heroImage: '',
  title: '',
  subtitle: '',
  funding: {
    goal: 0,
    raised: 0,
    percent: 0,
    backers: 0,
    daysLeft: 0,
  },
  creator: { name: '메이커', profileImage: DEFAULT_AVATAR, avatar: DEFAULT_AVATAR, followers: 0 },
  reviews: [],
  story: [],
  timeline: [],
  faqs: [],
  rewards: [],
};

const stripHtml = (value = '') => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const mapCreatorFromSeller = (seller) => {
  if (!seller) {
    return {
      name: '메이커',
      profileImage: DEFAULT_AVATAR,
      avatar: DEFAULT_AVATAR,
      followers: 0,
      introduction: '',
      email: '',
      phone: '',
      userNo: null, // 추가
    };
  }
  const avatar = resolveProjectImageUrl(seller.profileImage) || DEFAULT_AVATAR;
  return {
    name: seller.nickname || seller.sellerName || '메이커',
    profileImage: avatar,
    avatar,
    followers: seller.followers ?? 0,
    introduction: seller.introduction ?? '',
    email: seller.email ?? '',
    phone: seller.phone ?? '',
    userNo: seller.userNo, // 판매자의 USER_NO 추가
  };
};

const normalizeProjectDetail = (data = {}) => {
  const targetAmount = Number(data.targetAmount) || 0;
  const currentAmount = Number(data.currentAmount) || 0;
  const percent = targetAmount ? Math.round((currentAmount / targetAmount) * 100) : 0;
  const today = new Date();
  const endDate = data.fundEndDate ? new Date(data.fundEndDate) : null;
  const daysLeft = endDate ? Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))) : 0;
  const creator = mapCreatorFromSeller(data.sellerProfile);

  const timeline = [
    data.fundStartDate && {
      title: '펀딩 시작',
      date: data.fundStartDate,
      description: '프로젝트 펀딩이 시작되었습니다.',
    },
    data.fundEndDate && {
      title: '펀딩 종료',
      date: data.fundEndDate,
      description: '펀딩이 종료되는 날짜입니다.',
    },
    data.shipStartDate && {
      title: '배송 시작',
      date: data.shipStartDate,
      description: '리워드 배송이 시작되는 예정일입니다.',
    },
  ].filter(Boolean);

  const storyBlocks = data.storyHtml
    ? [
        {
          heading: data.productTitle ?? '프로젝트 스토리',
          body: [stripHtml(data.storyHtml) || '프로젝트 소개 내용이 등록되었습니다.'],
        },
      ]
    : projectInit.story;

  return {
    ...projectInit,
    ...data,
    title: data.productTitle ?? projectInit.title,
    subtitle: data.productDesc ?? projectInit.subtitle,
    heroImage: resolveProjectImageUrl(
      data.modifyThumbnail || data.originThumbnail,
      projectInit.heroImage,
    ),
    funding: {
      ...projectInit.funding,
      goal: targetAmount,
      raised: currentAmount,
      percent,
      daysLeft,
    },
    story: storyBlocks,
    timeline: timeline.length ? timeline : projectInit.timeline,
    creator: creator ?? projectInit.creator,
  };
};


export default function ProductDetailPage() {


  // 프로젝트에 들어갈 정보들
  const [project, setProject] = useState(projectInit);
  const [loadError, setLoadError] = useState('');
  //
  const REVIEWS_PER_PAGE = 5;
  const fundingGoal = project.funding.goal || 0;
  const fundingRaised = project.funding.raised || 0;
  const progressRate = fundingGoal ? Math.round((fundingRaised / fundingGoal) * 100) : 0;
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



  const { ProjectNo } = useParams();
  // console.log(ProjectNo);

  const navigate = useNavigate();

  // 좋아요 기능 추가 예정
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };


  // 팔로우 기능 추가 예정
  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };


  // 후기 이동
  const handleTabSelect = (tabId) => {
    setActiveDetailTab(tabId);
    if (tabId === 'reviews') {
      setReviewPage(1);
    }
  };

  // 판매자 프로필로 이동기능 넣을 예정
  const handleCreatorProfileClick = () => {
    console.log('Creator profile clicked');
  };

  // 후원하기 버튼 클릭 시 아래 후원 옵션 선택창으로 이동
  const handleDonateClick = () => {
    rewardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 강호형
  const handlePayment= () => {
    navigate('/payment')
  }

  const handleOpenChat = () => {
    // 로그인한 사용자 정보 가져오기
    const loginUserStr = localStorage.getItem('loginUser');
    const loginUser = JSON.parse(loginUserStr || '{}');
    const buyerNo = loginUser.userNo;
    
    console.log('buyerNo:', buyerNo);
    console.log('project:', project);
    console.log('project.creator:', project.creator);
    console.log('project.sellerProfile:', project.sellerProfile);
    
    if (!buyerNo) {
      toast.error('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    // 판매자의 USER_NO 가져오기
    const sellerUserNo = project.sellerProfile?.userNo || project.creator?.userNo;
    console.log('sellerUserNo:', sellerUserNo);
    
    if (!sellerUserNo) {
      toast.error('판매자 정보를 찾을 수 없습니다.');
      console.error('판매자 정보 없음!');
      return;
    }

    const width = 400;
    const height = 650;
    const left = window.screen.width - width - 100;
    const top = (window.screen.height - height) / 2;

    console.log('채팅창 열기 시도...');
    
    const chatWindow = window.open(
      `/chat`,
      'ChatWindow',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
    );

    console.log('chatWindow:', chatWindow);

    if (chatWindow) {
      const checkWindow = setInterval(() => {
        try {
          if (chatWindow.closed) {
            clearInterval(checkWindow);
            return;
          }
          console.log('데이터 전달 시도...');
          chatWindow.postMessage(
            {
              type: 'CREATOR_DATA',
              creator: project.creator,
              buyerNo: buyerNo,
              sellerNo: sellerUserNo
            },
            window.location.origin
          );
          clearInterval(checkWindow);
        } catch (e) {
          console.error('데이터 전달 오류:', e);
        }
      }, 100);
    }
  };

  // 처음에 출력 될 정보 useEffect사용
  useEffect(() => {
    if (!ProjectNo) {
      return;
    }

    setLoadError('');
    const api = async () => {
      try {
        const item = await fetchProjectAxios(ProjectNo);
        if (!item || !item.productNo) {
          setProject(projectInit);
          setLoadError('존재하지 않거나 삭제된 프로젝트입니다.');
          return;
        }
        setProject(normalizeProjectDetail(item));
      } catch (error) {
        setProject(projectInit);
        setLoadError('프로젝트 정보를 불러오지 못했습니다.');
      }
    };
    api();
  }, [ProjectNo, navigate]);

  if (loadError) {
    return (
      <div className="app">
        <Header />
        <main className="product-detail product-detail--empty">
          <div className="product-detail__error">
            <h1>알림</h1>
            <p>{loadError}</p>
            <button type="button" onClick={() => navigate('/')} className="detail-cta detail-cta--primary">
              홈으로 이동
            </button>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

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
