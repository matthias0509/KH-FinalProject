import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProjectCard from '../../components/ProjectCard';
import AppFooter from '../../components/AppFooter';
import draftPlaceholder from '../../assets/기본이미지.jpg';

const dummyDrafts = [
  {
    id: 'temp-101',
    title: '여름 제철 과일청 프로젝트',
    category: '푸드 > 음료',
    updatedAt: '2025-01-12 14:30',
    progress: 65,
  },
  {
    id: 'temp-097',
    title: '친환경 콤부차 키트',
    category: '푸드 > 디저트',
    updatedAt: '2025-01-05 10:15',
    progress: 30,
  },
];

export default function CreateProjectLandingPage() {
  const navigate = useNavigate();
  const drafts = useMemo(() => dummyDrafts, []);

  return (
    <div className="app create-landing">
      <Header />
      <main className="create-landing__body">
        <section className="create-landing__hero">
          <p className="create-landing__eyebrow">project onboarding</p>
          <h1>새로운 푸딩 프로젝트를 시작해 볼까요?</h1>
          <p>
            임시저장된 드래프트를 불러오거나, 새 프로젝트를 만들어주세요. 심의 가이드와 템플릿도
            이곳에서 확인할 수 있어요.
          </p>
          <div className="create-landing__cta">
            <button type="button" className="btn btn--primary" onClick={() => navigate('/create/new')}>
              새 프로젝트 만들기
            </button>
            <button type="button" className="btn" onClick={() => navigate('/maker/project')}>
              메이커 센터로 이동
            </button>
          </div>
        </section>

        <section>
          <div className="create-landing__header">
            <h2>임시저장 프로젝트</h2>
            <span>총 {drafts.length}건</span>
          </div>

          {drafts.length === 0 && (
            <div className="create-landing__empty">
              <p>아직 임시저장한 프로젝트가 없어요.</p>
              <button type="button" className="btn btn--primary" onClick={() => navigate('/create/new')}>
                첫 프로젝트 만들기
              </button>
            </div>
          )}

          {drafts.length > 0 && (
              <div className="create-landing__grid project-grid">
                {drafts.map((draft) => (
                  <div key={draft.id} className="create-landing__card">
                    <ProjectCard
                      project={{
                        title: draft.title,
                        category: draft.category,
                        current: draft.progress * 10000,
                        goal: 1000000,
                        daysLeft: 30,
                        image: draft.thumbnail || draftPlaceholder,
                      }}
                      hideWish
                      hideProgress
                      hideMeta
                    />
                  <div className="create-landing__card-footer">
                    <p className="create-landing__updated">최근 저장 {draft.updatedAt}</p>
                    <div className="create-landing__actions">
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => navigate(`/create/new?draftId=${draft.id}`)}
                      >
                        이어서 작성
                      </button>
                      <button type="button" className="btn btn--ghost">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <AppFooter/>
    </div>
  );
}
