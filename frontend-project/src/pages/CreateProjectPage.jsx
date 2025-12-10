import Header from '../components/Header';
import AppFooter from '../components/AppFooter';

const initialForm = {
  title: '',
  category: '',
  goal: '',
  description: '',
};

function CreateProjectPage() {
  return (
    <div className="app">
      <Header />
      <main className="main-content create-project">
        <div className="create-project__intro">
          <h1 className="section-title">프로젝트 올리기</h1>
          <p className="create-project__description">
            나만의 멋진 아이디어를 펀딩으로 연결해 보세요. 아래 기본 정보를 입력하고
            제출하면 심사 후 스토어에 노출됩니다.
          </p>
        </div>

        <form
          className="create-project__form"
          onSubmit={(event) => {
            event.preventDefault();
            alert('프로젝트 등록 기능은 곧 제공될 예정입니다.');
          }}
        >
          <div className="form-group">
            <label htmlFor="project-title">프로젝트 제목</label>
            <input
              id="project-title"
              name="title"
              type="text"
              placeholder="예) 프리미엄 수제 마카롱 정기구독"
              defaultValue={initialForm.title}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-category">카테고리</label>
            <select id="project-category" name="category" defaultValue={initialForm.category} required>
              <option value="" disabled>
                카테고리를 선택하세요
              </option>
              <option value="베이커리">베이커리</option>
              <option value="디저트">디저트</option>
              <option value="한식">한식</option>
              <option value="양식">양식</option>
              <option value="일식">일식</option>
              <option value="음료">음료</option>
              <option value="건강식품">건강식품</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="project-goal">목표 금액 (원)</label>
            <input
              id="project-goal"
              name="goal"
              type="number"
              min="100000"
              step="10000"
              placeholder="예) 10000000"
              defaultValue={initialForm.goal}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-description">프로젝트 소개</label>
            <textarea
              id="project-description"
              name="description"
              rows={5}
              placeholder="프로젝트 스토리를 입력해 주세요."
              defaultValue={initialForm.description}
              required
            />
          </div>

          <button type="submit" className="header__cta create-project__submit">
            제출하기
          </button>
        </form>
      </main>
      <AppFooter />
    </div>
  );
}

export default CreateProjectPage