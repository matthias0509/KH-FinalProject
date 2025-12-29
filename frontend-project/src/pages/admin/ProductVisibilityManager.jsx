import { useEffect, useMemo, useState } from 'react';
import { fetchAdminProjectList, updateProjectVisibility } from '../../api/projectApi';
import '../../styles/AdminProjectVisibility.css';

const STATUS_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: 'Y', label: '노출' },
  { value: 'N', label: '숨김' },
];

const currencyFormatter = new Intl.NumberFormat('ko-KR');

export default function ProductVisibilityManager() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAdminProjectList(statusFilter);
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError('프로젝트 목록을 불러오지 못했습니다. 다시 시도해주세요.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [statusFilter]);

  const filteredProjects = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      return projects;
    }
    return projects.filter((project) => {
      const title = project.productTitle ?? project.title ?? '';
      const category = project.category ?? '';
      return (
        title.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
      );
    });
  }, [projects, searchKeyword]);

  const handleToggleVisibility = async (project) => {
    if (!project) return;
    const nextStatus = project.productYn === 'Y' ? 'N' : 'Y';
    setUpdatingId(project.productNo);
    setError('');

    try {
      await updateProjectVisibility(project.productNo, nextStatus);
      setProjects((prev) =>
        prev.map((item) =>
          item.productNo === project.productNo ? { ...item, productYn: nextStatus } : item,
        ),
      );
    } catch (err) {
      setError('상태 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadgeClass = (status) =>
    status === 'Y' ? 'status-badge status-badge--active' : 'status-badge status-badge--inactive';

  return (
    <section className="admin-visibility">
      <div className="admin-visibility__header">
        <div>
          <h2>프로젝트 노출 관리</h2>
          <p>승인된 프로젝트의 노출 여부(PRODUCT_YN)를 빠르게 전환할 수 있습니다.</p>
        </div>
        <div className="admin-visibility__filters">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder="프로젝트 제목 또는 카테고리 검색"
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
          />
        </div>
      </div>

      {loading && <div className="admin-visibility__status">목록을 불러오는 중입니다...</div>}
      {error && <div className="admin-visibility__error">{error}</div>}

      {!loading && filteredProjects.length === 0 && (
        <div className="admin-visibility__status">조건에 맞는 프로젝트가 없습니다.</div>
      )}

      {!loading && filteredProjects.length > 0 && (
        <div className="admin-visibility__table-wrapper">
          <table className="admin-visibility__table">
            <thead>
              <tr>
                <th>번호</th>
                <th>프로젝트명</th>
                <th>카테고리</th>
                <th>목표금액</th>
                <th>현재금액</th>
                <th>상태</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => {
                const title = project.productTitle ?? project.title ?? '프로젝트';
                return (
                  <tr key={project.productNo}>
                    <td>{project.productNo}</td>
                    <td className="admin-visibility__title-cell">
                      <div>{title}</div>
                      <small>
                        {project.fundStartDate ?? ''} ~ {project.fundEndDate ?? ''}
                      </small>
                    </td>
                    <td>{project.category ?? '-'}</td>
                    <td>{currencyFormatter.format(project.targetAmount ?? 0)}원</td>
                    <td>{currencyFormatter.format(project.currentAmount ?? 0)}원</td>
                    <td>
                      <span className={statusBadgeClass(project.productYn)}>
                        {project.productYn === 'Y' ? '노출' : '숨김'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="admin-visibility__action"
                        onClick={() => handleToggleVisibility(project)}
                        disabled={updatingId === project.productNo}
                      >
                        {project.productYn === 'Y' ? '숨기기' : '노출하기'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
