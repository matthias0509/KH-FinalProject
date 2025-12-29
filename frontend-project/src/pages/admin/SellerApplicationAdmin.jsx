import { useEffect, useState } from 'react';
import {
  fetchSellerApplications,
  reviewSellerApplication,
} from '../../api/sellerApplicationApi';
import '../../styles/AdminSellerApplication.css';

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

  const loadApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchSellerApplications(statusFilter);
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('신청 목록을 불러오지 못했습니다.');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleAction = async (applicationNo, status) => {
    setActingId(applicationNo);
    setError('');
    try {
      await reviewSellerApplication(applicationNo, { status, adminMemo: '' });
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
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="admin-seller__error">{error}</div>}
      {loading && <div className="admin-seller__status">불러오는 중...</div>}
      {!loading && applications.length === 0 && (
        <div className="admin-seller__status">표시할 신청이 없습니다.</div>
      )}
      {!loading && applications.length > 0 && (
        <table className="admin-seller__table">
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
            {applications.map((app) => (
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
                      type="button"
                      onClick={() => handleAction(app.applicationNo, 'APPROVED')}
                      disabled={actingId === app.applicationNo || app.status === 'APPROVED'}
                    >
                      승인
                    </button>
                    <button
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
      )}
    </section>
  );
}
