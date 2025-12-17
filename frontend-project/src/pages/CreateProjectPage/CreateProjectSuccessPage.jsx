import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

export default function CreateProjectSuccessPage() {
  const navigate = useNavigate();

  const goToProjects = () => navigate('/maker/project');
  const goHome = () => navigate('/');
  const startNewProject = () => navigate('/create/new');

  return (
    <div className="app">
      <Header />
      <main className="create-success">
        <section className="create-success__card">
          <div className="create-success__icon" aria-hidden>
            <span>🎉</span>
          </div>
          <p className="create-success__eyebrow">프로젝트 제출 완료</p>
          <h1>심의 대기 중입니다</h1>
          <p className="create-success__message">
            메이커님의 프로젝트가 성공적으로 접수되었어요. 심의는 최대 3영업일 이내에 완료되며,
            결과는 등록된 이메일과 알림 센터로 알려드릴게요.
          </p>

          <div className="create-success__status">
            <div>
              <p className="create-success__status-label">현재 상태</p>
              <p className="create-success__status-value">심의 대기</p>
            </div>
            <div>
              <p className="create-success__status-label">다음 단계</p>
              <p className="create-success__status-value">심의 승인 후 공개 일정 확정</p>
            </div>
          </div>

          <div className="create-success__actions">
            <button type="button" className="btn btn--primary" onClick={goToProjects}>
              프로젝트 관리로 이동
            </button>
            <button type="button" className="btn" onClick={startNewProject}>
              다른 프로젝트 만들기
            </button>
            <button type="button" className="btn btn--ghost" onClick={goHome}>
              홈으로 돌아가기
            </button>
          </div>
        </section>
      </main>
      <AppFooter/>
    </div>
  );
}
