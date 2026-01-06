import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

import { useNavigate, useParams } from 'react-router-dom';
import { fetchProjectAxios } from './DetailApi';
import {
  fetchProjectLikeStatus,
  likeProject,
  unlikeProject,
  fetchSellerFollowStatus,
  followSeller,
  unfollowSeller,
} from '../../api/interactionApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { resolveProjectImageUrl, resolveProfileImageUrl } from '../../utils/projectMedia';
import { fetchProductReviews } from '../../api/reviewApi';
import { getLoginUserInfo } from '../../utils/auth';

const currencyFormatter = new Intl.NumberFormat('ko-KR');
const DEFAULT_AVATAR = 'https://placehold.co/80x80?text=User';



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

const enhanceStoryHtml = (html) => {
  if (!html || typeof window === 'undefined' || typeof window.DOMParser === 'undefined') {
    return html || '';
  }

  try {
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (!src || /^https?:/i.test(src) || src.startsWith('data:')) {
        return;
      }
      img.setAttribute('src', resolveProjectImageUrl(src));
    });
    return doc.body.innerHTML;
  } catch (error) {
    console.error('스토리 HTML 파싱 실패', error);
    return html;
  }
};

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
  const profileImage = seller.profileImage || seller.profileImg || null;
  const avatar = resolveProfileImageUrl(String(profileImage || '').trim(), DEFAULT_AVATAR);
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

  const normalizedStoryHtml = enhanceStoryHtml(data.storyHtml);

  const storyBlocks = normalizedStoryHtml
    ? [
        {
          heading: data.productTitle ?? '프로젝트 스토리',
          body: [stripHtml(normalizedStoryHtml) || '프로젝트 소개 내용이 등록되었습니다.'],
        },
      ]
    : projectInit.story;

  const normalizedRewards = Array.isArray(data.rewards)
    ? data.rewards.map((reward, index) => ({
        id: reward.optionNo ?? reward.id ?? index,
        title: reward.title ?? `리워드 ${index + 1}`,
        price: Number(reward.price) || 0,
        description: reward.description ?? '',
        includes: Array.isArray(reward.includes) ? reward.includes : [],
        shipping:
          reward.shipping ||
          (data.shipStartDate ? `${data.shipStartDate}부터 순차 발송` : '배송 일정 미정'),
      }))
    : projectInit.rewards;

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
    storyHtml: normalizedStoryHtml,
    timeline: timeline.length ? timeline : projectInit.timeline,
    creator: creator ?? projectInit.creator,
    rewards: normalizedRewards,
  };
};


export default function ProductDetailPage() {


  // 프로젝트에 들어갈 정보들
  const [project, setProject] = useState(projectInit);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  //
  const REVIEWS_PER_PAGE = 5;
  const fundingGoal = project.funding.goal || 0;
  const fundingRaised = project.funding.raised || 0;
  const progressRate = fundingGoal ? Math.round((fundingRaised / fundingGoal) * 100) : 0;
  const progressWidth = Math.min(progressRate, 100);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState('story');
  const [reviewPage, setReviewPage] = useState(1);
  const rewardSectionRef = useRef(null);
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
  const formatReviewDate = (value) => {
    if (!value) {
      return '';
    }
    try {
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) {
        return value;
      }
      return parsed.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } catch (error) {
      return value;
    }
  };



  const { ProjectNo } = useParams();
  // console.log(ProjectNo);

  const navigate = useNavigate();

  const ensureLogin = () => {
    const loginInfo = getLoginUserInfo();
    if (!loginInfo?.token) {
      toast.error('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return null;
    }
    return loginInfo;
  };

  const handleLikeToggle = async () => {
    if (!project.productNo) {
      toast.error('프로젝트 정보를 불러오는 중입니다.');
      return;
    }

    const loginInfo = ensureLogin();
    if (!loginInfo) {
      return;
    }

    try {
      const status = isLiked
        ? await unlikeProject(project.productNo)
        : await likeProject(project.productNo);
      setIsLiked(Boolean(status?.liked));
      setLikeCount(status?.likeCount ?? likeCount);
    } catch (error) {
      console.error('좋아요 처리 실패', error);
      toast.error('좋아요 처리 중 문제가 발생했습니다.');
    }
  };

  const handleFollowToggle = async () => {
    if (!project.sellerNo) {
      toast.error('판매자 정보를 찾을 수 없습니다.');
      return;
    }

    const loginInfo = ensureLogin();
    if (!loginInfo) {
      return;
    }

    try {
      const status = isFollowing
        ? await unfollowSeller(project.sellerNo)
        : await followSeller(project.sellerNo);
      setIsFollowing(Boolean(status?.following));
      setFollowerCount(status?.followerCount ?? followerCount);
    } catch (error) {
      console.error('팔로우 처리 실패', error);
      toast.error('팔로우 처리 중 문제가 발생했습니다.');
    }
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
    const sellerUserNo = project.sellerProfile?.userNo || project.creator?.userNo || project.sellerNo;
    
    if (!sellerUserNo) {
      toast.error('판매자 정보를 찾을 수 없습니다.');
      console.error('판매자 번호가 없습니다:', project);
      return;
    }

    console.log('판매자 프로필로 이동:', sellerUserNo);
    navigate(`/seller/${sellerUserNo}`);
  };

  // 후원하기 버튼 클릭 시 아래 후원 옵션 선택창으로 이동
  const handleDonateClick = () => {
    rewardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 강호형
  // handlePayment 함수를 다음과 같이 수정:
  const handlePayment = (reward) => {
    navigate('/payment', { 
      state: { 
        reward: {
          id: reward.id,
          title: reward.title,
          amount: reward.price,
          items: reward.includes || [],
          optionNo: reward.id,
          description: reward.description,
          shipping: reward.shipping
        }
      }
    });
  };



  const handleOpenChat = () => {
    const loginInfo = getLoginUserInfo();

    console.log('=== 디버깅 시작 ===');
    console.log('전체 project:', project);
    console.log('project.sellerProfile:', project.sellerProfile);
    console.log('project.creator:', project.creator);
    
    if (!loginInfo?.token) {
      toast.error('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    const payload = loginInfo.payload;
    const buyerNo = loginInfo.userNo || payload?.userNo || payload?.sub || payload?.id || null;

    if (!buyerNo) {
      console.error('토큰 확인 실패: 사용자 번호 파싱 불가', payload);
      toast.error('로그인 정보가 올바르지 않습니다.');
      navigate('/login');
      return;
    }

    console.log('Token payload:', payload);
    console.log('buyerNo:', buyerNo);

    const sellerUserNo = project.sellerProfile?.userNo || project.creator?.userNo;
    console.log('sellerUserNo:', sellerUserNo);
    console.log('=== 디버깅 끝 ===');
    
    if (!sellerUserNo) {
      toast.error('판매자 정보를 찾을 수 없습니다.');
      console.error('판매자 정보 없음!');
      return;
    }

    if (Number(sellerUserNo) === Number(buyerNo)) {
      toast.info('내 프로젝트에는 1:1 문의를 보낼 수 없습니다.');
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
      // 🔥 CHAT_READY 메시지를 기다렸다가 데이터 전송
      const handleChatReady = (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'CHAT_READY') {
          console.log('✅ 채팅창 준비 완료!');
          
          const dataToSend = {
            type: 'CREATOR_DATA',
            creator: {
              name: project.creator.name,
              avatar: project.creator.avatar
            },
            buyerNo: buyerNo,
            sellerNo: sellerUserNo,
            currentUserNo: buyerNo // 🔥 currentUserNo 추가!
          };
          
          console.log('📤 데이터 전송:', dataToSend);
          chatWindow.postMessage(dataToSend, window.location.origin);
          
          // 리스너 제거
          window.removeEventListener('message', handleChatReady);
        }
      };
      
      window.addEventListener('message', handleChatReady);
      
      // 🔥 타임아웃 설정: 5초 후에도 CHAT_READY를 못 받으면 리스너 제거
      setTimeout(() => {
        window.removeEventListener('message', handleChatReady);
        console.log('⚠️ CHAT_READY 타임아웃');
      }, 5000);
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
        if (error?.response?.status === 403) {
          setLoadError('진행 중인 프로젝트만 열람할 수 있습니다.');
        } else if (error?.response?.status === 404) {
          setLoadError('존재하지 않거나 삭제된 프로젝트입니다.');
        } else {
          setLoadError('프로젝트 정보를 불러오지 못했습니다.');
        }
      }
    };
    api();
  }, [ProjectNo, navigate]);

  useEffect(() => {
    if (!project.productNo) {
      setIsLiked(false);
      setLikeCount(0);
      return;
    }

    const loadLikeStatus = async () => {
      try {
        const status = await fetchProjectLikeStatus(project.productNo);
        setIsLiked(Boolean(status?.liked));
        setLikeCount(status?.likeCount ?? 0);
      } catch (error) {
        console.error('좋아요 상태 조회 실패', error);
      }
    };

    loadLikeStatus();
  }, [project.productNo]);

  useEffect(() => {
    if (!project.productNo) {
      setReviews([]);
      return;
    }

    const loadReviews = async () => {
      setReviewsLoading(true);
      try {
        const data = await fetchProductReviews(project.productNo);
        const mapped = (data || []).map((review) => ({
          id: review.reviewNo ?? review.orderNo,
          title: review.reviewTitle || '후기',
          date: formatReviewDate(review.reviewCreateDate),
          author: review.nickname || '익명',
          rating: review.rating || 0,
          body: review.reviewContent || '',
        }));
        setReviews(mapped);
      } catch (error) {
        console.error('후기 목록 조회 실패', error);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [project.productNo]);

  useEffect(() => {
    if (!project.sellerNo) {
      setIsFollowing(false);
      setFollowerCount(0);
      return;
    }

    const loadFollowStatus = async () => {
      try {
        const status = await fetchSellerFollowStatus(project.sellerNo);
        setIsFollowing(Boolean(status?.following));
        setFollowerCount(status?.followerCount ?? 0);
      } catch (error) {
        console.error('팔로우 상태 조회 실패', error);
      }
    };

    loadFollowStatus();
  }, [project.sellerNo]);

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
                  <strong>{currencyFormatter.format(project.funding.goal)}원</strong>
                  <span>목표 금액</span>
                </div>
                <div>
                  <strong>{currencyFormatter.format(project.funding.raised)}원</strong>
                  <span>달성 금액</span>
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
                onClick={handleLikeToggle}
                aria-pressed={isLiked}
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  fill={isLiked ? '#ef4444' : 'none'}
                  color={isLiked ? '#b91c1c' : '#6b7280'}
                />
                좋아요 {likeCount.toLocaleString()}개
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
                  {project.storyHtml ? (
                    <article
                      className="detail-story-content"
                      dangerouslySetInnerHTML={{ __html: project.storyHtml }}
                    />
                  ) : (
                    project.story.map((block) => (
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
                    ))
                  )}
                </div>
              )}

              {activeDetailTab === 'reviews' && (
                <div role="tabpanel">
                  <h2>후기</h2>
                  {reviewsLoading ? (
                    <p className="detail-review-empty">후기를 불러오는 중입니다...</p>
                  ) : reviews.length === 0 ? (
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
                    팔로워 {followerCount.toLocaleString()}명
                  </span>
                  
                </div>
              </button>
              <div className="detail-creator__actions">
                <button
                  type="button"
                  className={`detail-cta detail-cta--follow${isFollowing ? ' is-active' : ''}`}
                  onClick={handleFollowToggle}
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
                  <div key={reward.id ?? reward.optionNo ?? reward.title} className="detail-reward">
                    <div className="detail-reward__header">
                      <h4>{reward.title}</h4>
                      <span>{currencyFormatter.format(reward.price)}원</span>
                    </div>
                    {reward.description && <p>{reward.description}</p>}
                    {Array.isArray(reward.includes) && reward.includes.length > 0 && (
                      <ul>
                        {reward.includes.map((include) => (
                          <li key={include}>{include}</li>
                        ))}
                      </ul>
                    )}
                    <div className="detail-reward__shipping">배송 예정: {reward.shipping}</div>
                    <button type="button" className="detail-cta detail-cta--outline" onClick={() => handlePayment(reward)}>
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
