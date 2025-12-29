import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    fetchProjectReviewDetail,
    fetchProjectReviewList,
    reviewProjectSubmission,
} from '../../api/projectApi';
import { getProjectThumbnail } from '../../utils/projectMedia';
import '../../styles/AdminPage.css';
import '../../styles/UserManagement.css';

const STATUS_LABEL = {
    WAITING: '심사대기',
    OPEN: '진행중',
    REJECT: '반려',
    CLOSE: '종료',
    SUCCESS: '성공',
    FAIL: '실패',
};

const formatCurrency = (amount) => {
    const numeric = Number(amount) || 0;
    return `${numeric.toLocaleString()}원`;
};

const formatStatus = (status) => STATUS_LABEL[status] || status;

const ProjectReviewModal = ({
    isOpen,
    project,
    isLoading,
    errorMessage,
    actionLoading,
    actionError,
    onClose,
    onAction,
}) => {
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setRejectReason('');
            setShowRejectInput(false);
        }
    }, [isOpen, project?.productNo]);

    if (!isOpen) {
        return null;
    }

    const handleApprove = () => {
        if (!project || actionLoading || isLoading) return;
        if (
            window.confirm(
                `[${project.productTitle}] 프로젝트를 승인하시겠습니까?\n승인 시 '진행중(OPEN)' 상태로 변경되며 사용자에게 공개됩니다.`,
            )
        ) {
            onAction(project.productNo, 'APPROVE');
        }
    };

    const handleReject = () => {
        if (!project || actionLoading || isLoading) return;
        if (!rejectReason.trim()) {
            alert('반려 사유를 반드시 입력해주세요.');
            return;
        }
        if (window.confirm('이 프로젝트를 반려 처리 하시겠습니까?')) {
            onAction(project.productNo, 'REJECT', rejectReason.trim());
        }
    };

    const storyHtml = project?.storyHtml || project?.productDesc || '<p>등록된 스토리가 없습니다.</p>';
    const thumbnailUrl = getProjectThumbnail(project, 'https://via.placeholder.com/620x420');

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large project-review-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>
                        📝 프로젝트 심사 ({formatStatus(project?.approvalStatus || project?.productStatus)})
                    </h3>
                    <button className="btn-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {isLoading ? (
                    <div className="modal-body">
                        <p className="no-data">프로젝트 상세 정보를 불러오는 중입니다...</p>
                    </div>
                ) : errorMessage ? (
                    <div className="modal-body">
                        <p className="no-data">{errorMessage}</p>
                    </div>
                ) : !project ? (
                    <div className="modal-body">
                        <p className="no-data">프로젝트 정보를 찾을 수 없습니다.</p>
                    </div>
                ) : (
                    <div className="modal-body review-layout">
                        <div className="review-section basic-info">
                            <div className="info-row">
                                <span className="label">카테고리</span>
                                <span className="value badge">{project.category}</span>
                                <span className="label">판매자(No)</span>
                                <span className="value">
                                    {project.sellerName} ({project.sellerNo})
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">목표 금액</span>
                                <span className="value highlight">{formatCurrency(project.targetAmount)}</span>
                                <span className="label">펀딩 기간</span>
                                <span className="value">
                                    {project.fundStartDate} ~ {project.fundEndDate}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">예상 발송일</span>
                                <span className="value">{project.shipStartDate}</span>
                                <span className="label">등록일</span>
                                <span className="value">{project.createDate}</span>
                            </div>
                            {project.rejectReason && (
                                <div className="info-row">
                                    <span className="label">반려 사유</span>
                                    <span className="value reject-reason">{project.rejectReason}</span>
                                </div>
                            )}
                        </div>

                        <hr className="divider" />

                        <div className="review-section content-preview">
                            <h4>프로젝트 스토리 & 이미지</h4>

                            <div className="preview-container">
                                <div className="preview-item thumbnail-box">
                                    <h5>대표 썸네일</h5>
                                    <img src={thumbnailUrl} alt="썸네일" />
                                </div>

                                <div className="preview-item story-box">
                                    <h5>상세 스토리 (HTML Preview)</h5>
                                    <div className="story-viewer" dangerouslySetInnerHTML={{ __html: storyHtml }} />
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        <div className="review-section">
                            <h4>리워드 구성</h4>
                            <div className="reward-list-grid">
                                {project.rewards && project.rewards.length > 0 ? (
                                    project.rewards.map((reward, idx) => (
                                        <div key={`${reward.title}-${idx}`} className="reward-card">
                                            <div className="reward-header">
                                                <span className="reward-price">{formatCurrency(reward.price)}</span>
                                                <span className="reward-name">{reward.title}</span>
                                            </div>
                                            <p className="reward-desc">{reward.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-data">등록된 리워드 정보가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-footer-actions">
                    {actionError && <div className="admin-seller__error">{actionError}</div>}
                    {isLoading ? (
                        <button className="btn-close-footer" onClick={onClose}>
                            닫기
                        </button>
                    ) : !showRejectInput ? (
                        <>
                            <button className="btn-save" onClick={handleApprove} disabled={actionLoading}>
                                승인 (공개 처리)
                            </button>
                            <button
                                className="btn-action btn-danger"
                                onClick={() => setShowRejectInput(true)}
                                disabled={actionLoading}
                            >
                                반려
                            </button>
                            <button className="btn-close-footer" onClick={onClose}>
                                닫기
                            </button>
                        </>
                    ) : (
                        <div className="reject-input-group">
                            <input
                                type="text"
                                placeholder="반려 사유를 입력하세요 (필수)"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="input-field full-width"
                                disabled={actionLoading}
                            />
                            <button className="btn-action btn-danger" onClick={handleReject} disabled={actionLoading}>
                                반려 확정
                            </button>
                            <button
                                className="btn-close-footer"
                                onClick={() => {
                                    setShowRejectInput(false);
                                    setRejectReason('');
                                }}
                                disabled={actionLoading}
                            >
                                취소
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProjectApprovalPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('WAITING');
    const [listLoading, setListLoading] = useState(false);
    const [listError, setListError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState('');
    const [actionError, setActionError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const loadProjects = useCallback(async () => {
        setListLoading(true);
        setListError('');
        try {
            const data = await fetchProjectReviewList(filterStatus);
            setProjectList(Array.isArray(data) ? data : []);
        } catch (error) {
            setListError('프로젝트 목록을 불러오지 못했습니다. 다시 시도해주세요.');
            setProjectList([]);
        } finally {
            setListLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleOpenModal = async (productNo) => {
        setIsModalOpen(true);
        setSelectedProject(null);
        setModalLoading(true);
        setModalError('');
        setActionError('');
        try {
            const detail = await fetchProjectReviewDetail(productNo);
            setSelectedProject(detail);
        } catch (error) {
            const message = error.response?.data || '상세 정보를 불러오지 못했습니다.';
            setModalError(typeof message === 'string' ? message : '상세 정보를 불러오지 못했습니다.');
        } finally {
            setModalLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setModalError('');
        setActionError('');
    };

    const handleProjectAction = async (productNo, actionType, reason) => {
        if (!productNo) return;
        setActionLoading(true);
        setActionError('');
        try {
            await reviewProjectSubmission(productNo, { action: actionType, reason });
            await loadProjects();
            handleCloseModal();
        } catch (error) {
            const message = error.response?.data || '처리 중 오류가 발생했습니다.';
            setActionError(typeof message === 'string' ? message : '처리 중 오류가 발생했습니다.');
        } finally {
            setActionLoading(false);
        }
    };

    const statusOptions = useMemo(
        () => [
            { value: 'WAITING', label: '심사 대기 (신규)' },
            { value: 'OPEN', label: '승인됨 (진행중)' },
            { value: 'REJECT', label: '반려됨' },
        ],
        [],
    );

    return (
        <div className="project-approval-page">
            <h2 className="page-title">📝 프로젝트 승인 및 반려</h2>

            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>진행 상태:</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="admin-card">
                {listError && <div className="admin-seller__error">{listError}</div>}
                {listLoading ? (
                    <div className="no-data">목록을 불러오는 중입니다...</div>
                ) : (
                    <table className="user-table flickspot-style">
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="10%">카테고리</th>
                                <th width="30%">프로젝트 제목</th>
                                <th width="12%">판매자</th>
                                <th width="12%">목표금액</th>
                                <th width="12%">신청일 / 펀딩기간</th>
                                <th width="9%">상태</th>
                                <th width="10%">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectList.length > 0 ? (
                                projectList.map((project) => (
                                    <tr key={project.productNo} className="hover-row">
                                        <td>{project.productNo}</td>
                                        <td>
                                            <span className="category-badge">{project.category}</span>
                                        </td>
                                        <td className="text-left">
                                            <div className="project-list-title">{project.productTitle}</div>
                                        </td>
                                        <td>
                                            <div>{project.sellerName}</div>
                                            <small>{project.sellerPhone}</small>
                                        </td>
                                        <td>{formatCurrency(project.targetAmount)}</td>
                                        <td>
                                            <div className="date-col">
                                                <span>신청: {project.createDate}</span>
                                                <span className="sub-date">
                                                    ({project.fundStartDate} ~ {project.fundEndDate})
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="status-badge">{formatStatus(project.approvalStatus || project.productStatus)}</span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-detail-small"
                                                onClick={() => handleOpenModal(project.productNo)}
                                            >
                                                심사하기
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="no-data">
                                        해당 상태의 프로젝트가 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <ProjectReviewModal
                isOpen={isModalOpen}
                project={selectedProject}
                isLoading={modalLoading}
                errorMessage={modalError}
                actionLoading={actionLoading}
                actionError={actionError}
                onClose={handleCloseModal}
                onAction={handleProjectAction}
            />
        </div>
    );
};

export default ProjectApprovalPage;
