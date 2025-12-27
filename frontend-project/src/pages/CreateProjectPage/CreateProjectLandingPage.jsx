import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProjectCard from '../../components/ProjectCard';
import AppFooter from '../../components/AppFooter';
import draftPlaceholder from '../../assets/기본이미지.jpg';
import { fetchImsiAxios, deleteProjectAxios } from './ProjectApi';
import { toast } from 'react-toastify';
import { getLoginUserNo } from '../../utils/auth';
import { fetchSellerProfileStatus } from '../../api/sellerApplicationApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/foodding';

const resolveAssetUrl = (path) => {
  if (!path || path === 'DEFAULT_THUMBNAIL.png') {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  }
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`;
  }
  return `${API_BASE_URL}/${path}`;
};




export default function CreateProjectLandingPage() {

  const navigate = useNavigate();
  const [userNo] = useState(() => getLoginUserNo());
  // 임시저장 목록 관리
  const [drafts, setDrafts] = useState([]);
  // 로딩중
  const [loading, setLoading] = useState(true);
  const [hasSellerProfile, setHasSellerProfile] = useState(false);
  const [checkingSeller, setCheckingSeller] = useState(true);

  const loadDrafts = async (currentUserNo) => {
    if (!currentUserNo) {
      setDrafts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchImsiAxios(currentUserNo);
      setDrafts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('임시저장 목록 불러오기 실패', error);
      setDrafts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userNo) {
      setLoading(false);
      toast.error('로그인 후 이용해 주세요.');
      navigate('/login');
      return;
    }
    const init = async () => {
      try {
        setCheckingSeller(true);
        const status = await fetchSellerProfileStatus(userNo);
        setHasSellerProfile(status);
      } catch (error) {
        setHasSellerProfile(false);
      } finally {
        setCheckingSeller(false);
      }
      loadDrafts(userNo);
    };
    init();
  }, [userNo, navigate]);


  //
  const stats = useMemo(() => {
    const toNumber = (value) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = Number(value.replace(/,/g, ''));
        return Number.isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    const totalTarget = drafts.reduce((sum, draft) => sum + toNumber(draft.targetAmount), 0);
    return {
      count: drafts.length,
      totalTarget,
    };
  }, [drafts]);



  const ensureSeller = () => {
    if (checkingSeller) {
      toast.info('판매자 정보를 확인 중입니다. 잠시만 기다려 주세요.');
      return false;
    }
    if (!hasSellerProfile) {
      toast.error('판매자 전환 승인 후 이용해 주세요.');
      navigate('/change');
      return false;
    }
    return true;
  };

  // 
  const goToNewProject = () => {
    if (!ensureSeller()) return;
    navigate('/create/new');
  };
  const goToMakerDashboard = () => {
    if (!ensureSeller()) return;
    navigate('/maker/project');
  };
  const handleContinueDraft = (draft) => {
    if (!draft?.tempNo) return;
    navigate(`/create/new?draft=${draft.tempNo}`);
  };


  // 삭제하기 버튼 클릭 시 실행할 함수
  const handleDeleteDraft = (draft) => {
    if (!draft?.tempNo) {
      return;
    }
    if (!userNo) {
      toast.error('로그인 후 이용해 주세요.');
      navigate('/login');
      return;
    }
    if (!window.confirm('해당 임시저장을 삭제하시겠습니까?')) {
      return;
    }

    const api = async () => {
      try {
        const msg = await deleteProjectAxios({ userNo, tempNo: draft.tempNo });
        toast.info(msg);
        setDrafts((prev) => prev.filter((item) => item.tempNo !== draft.tempNo));
      } catch (error) {
        toast.error('프로젝트 삭제 실패');
        console.error(error);
      }
    };

    api();
  };

  // UseEffect로 데이터 불러오기 전에 보여줄 화면
  if (loading) {
    return (
      <div className="app create-landing">
        <Header />
        <main className="create-landing__body">
          <section className="create-landing__loading">불러오는 중...</section>
        </main>
        <AppFooter />
      </div>
    );
  }

  const hasDrafts = stats.count > 0;

  // 로딩 완료 후 보여줄 화면
  return (
    <div className="app create-landing">
      <Header />
      <main className="create-landing__body">
        <section className="create-landing__hero">
          <p className="create-landing__eyebrow">Maker Studio</p>
          <h1>새로운 프로젝트를 시작해 보세요</h1>
          <p>
            아이디어 스케치부터 심의 제출까지 한 곳에서 관리할 수 있어요. 임시 저장한 초안을 이어서
            수정하고 마무리해 공개 일정을 잡아보세요.
          </p>
          <div className="create-landing__cta">
            <button type="button" className="btn btn--primary" onClick={goToNewProject}>
              새 프로젝트 만들기
            </button>
            <button type="button" className="btn btn--ghost" onClick={goToMakerDashboard}>
              프로젝트 관리로 이동
            </button>
          </div>
          {hasDrafts && (
            <span className="create-landing__hint">임시 저장된 프로젝트 {stats.count}개가 대기 중입니다.</span>
          )}
        </section>

        <section className="create-landing__panel">
          <div className="create-landing__header">
            <div>
              <p className="create-landing__eyebrow">임시저장</p>
              <h2>이어쓰기 가능한 프로젝트</h2>
            </div>
            <div className="create-landing__stats">
              <div className="create-landing__stat">
                <p className="create-landing__stat-label">임시저장 수</p>
                <p className="create-landing__stat-value">{stats.count}건</p>
              </div>
            </div>
          </div>

          {hasDrafts ? (
            <div className="create-landing__grid project-grid">
              {drafts.map((draft) => {
                const current = Number(draft.currentAmount ?? 0);
                const goal = Number(draft.targetAmount ?? 1) || 1;
                const imageSrc = resolveAssetUrl(draft.thumbnailUrl) || draftPlaceholder;
                return (
                  <div key={draft.tempNo || draft.id || draft.title} className="create-landing__card">
                    <ProjectCard
                      project={{
                        title: draft.title || '제목 미정',
                        category: draft.category || '카테고리 미정',
                        current,
                        goal,
                        daysLeft: 30,
                        image: imageSrc,
                        detailPath: draft.tempNo ? `/create/new?draft=${draft.tempNo}` : undefined,
                      }}
                      hideWish
                      hideProgress
                      hideMeta
                    />
                    <div className="create-landing__card-footer">
                      <div>
                        <p className="create-landing__updated">임시저장 번호 {draft.tempNo || '-'}</p>
                        <p className="create-landing__updated create-landing__updated--muted">
                          목표 금액 {goal.toLocaleString()}원
                        </p>
                      </div>
                      <div className="create-landing__actions">
                        <button
                          type="button"
                          className="btn btn--small btn--primary"
                          onClick={() => handleContinueDraft(draft)}
                        >
                          이어서 작성
                        </button>
                        <button
                          type="button"
                          className="btn btn--small btn--ghost"
                          onClick={() => handleDeleteDraft(draft)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="create-landing__empty">
              <p>아직 임시저장한 프로젝트가 없어요.</p>
              <p>아이디어가 떠오른다면 바로 임시저장해두고, 나중에 이어서 완성해보세요.</p>
            </div>
          )}
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
