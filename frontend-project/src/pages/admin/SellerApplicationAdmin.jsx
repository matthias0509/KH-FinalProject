import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  fetchSellerApplications,
  reviewSellerApplication,
} from '../../api/sellerApplicationApi';
import '../../styles/AdminSellerApplication.css';
import '../../styles/UserManagement.css'; // 🚨 페이지네이션 CSS 활용을 위해 추가

const STATUS_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: 'PENDING', label: '대기' },
  { value: 'APPROVED', label: '승인' },
  { value: 'REJECTED', label: '반려' },
];

const statusLabel = {
  PENDING: '심사 중',
  APPROVED: '승인 완료',
  REJECTED: '반려됨',
};

export default function SellerApplicationAdmin() {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actingId, setActingId] = useState(null);

  // 🚨 [추가] 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchSellerApplications(statusFilter);
      setApplications(Array.isArray(data) ? data : []);
      setCurrentPage(1); // 🚨 필터 변경 시 1페이지로 리셋
    } catch (err) {
      setError('신청 목록을 불러오지 못했습니다.');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  // 🚨 [추가] 현재 페이지 데이터 슬라이싱 로직
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return applications.slice(start, end);
  }, [applications, currentPage]);

  const handleAction = async (applicationNo, status) => {
    const actionText = status === 'APPROVED' ? '승인' : '반려';
    if (!window.confirm(`이 신청을 ${actionText} 처리하시겠습니까?`)) return;

    setActingId(applicationNo);
    setError('');
    try {
      await reviewSellerApplication(applicationNo, { status, adminMemo: '' });
      alert(`${actionText} 처리가 완료되었습니다.`);
      await loadApplications();
    } catch (err) {
      setError(err.response?.data || '처리에 실패했습니다.');
    } finally {
      setActingId(null);
    }
  };

  return (
    <section className="admin-seller">
      <div className="admin-seller__header">
        <div>
          <h2>판매자 전환 신청 관리</h2>
          <p>신청 정보를 검토하고 승인/반려 처리하세요.</p>
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="admin-seller__error">{error}</div>}
      {loading && <div className="admin-seller__status">불러오는 중...</div>}
      
      {!loading && currentItems.length === 0 && (
        <div className="admin-seller__status">표시할 신청이 없습니다.</div>
      )}

      {!loading && currentItems.length > 0 && (
        <>
          <table className="admin-seller__table user-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>신청자</th>
                <th>브랜드</th>
                <th>연락처</th>
                <th>상태</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((app) => (
                <tr key={app.applicationNo}>
                  <td>{app.applicationNo}</td>
                  <td>
                    <div>{app.applicantName}</div>
                    <small>{app.applicantEmail}</small>
                  </td>
                  <td>
                    <div>{app.businessName}</div>
                    <small>{app.businessNumber}</small>
                  </td>
                  <td>
                    <div>{app.applicantPhone}</div>
                    <small>{app.website}</small>
                  </td>
                  <td>
                    <span className={`admin-seller__badge admin-seller__badge--${app.status?.toLowerCase()}`}>
                      {statusLabel[app.status] ?? app.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-seller__actions">
                      <button
                        className="btn-detail-small"
                        style={{ backgroundColor: '#e3f2fd', color: '#1976d2', border: 'none' }}
                        type="button"
                        onClick={() => handleAction(app.applicationNo, 'APPROVED')}
                        disabled={actingId === app.applicationNo || app.status === 'APPROVED'}
                      >
                        승인
                      </button>
                      <button
                        className="btn-detail-small"
                        style={{ backgroundColor: '#fff3e0', color: '#e65100', border: 'none' }}
                        type="button"
                        onClick={() => handleAction(app.applicationNo, 'REJECTED')}
                        disabled={actingId === app.applicationNo || app.status === 'REJECTED'}
                      >
                        반려
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🚨 [추가] 하단 페이지네이션 UI */}
          {totalPages > 0 && (
            <div className="pagination-area">
              <button 
                className="btn-page" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span className="page-info">{currentPage} / {totalPages}</span>
              <button 
                className="btn-page" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}