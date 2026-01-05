import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/UserManagement.css'; 

// ===================================================
// [Helper] 상태/권한 한글 변환 함수
// ===================================================
const formatStatus = (yn) => {
    const status = yn || 'N'; 
    switch(status) {
        case 'N': return '활성';
        case 'Y': return '탈퇴';
        default: return '활성';
    }
};

const formatRole = (role) => {
    const userRole = role || 'SUPPORTER'; 
    switch(userRole) {
        case 'SUPPORTER': return '서포터';
        case 'USER':      return '서포터';
        case 'MAKER':     return '메이커';
        default: return userRole;
    }
};

// ===================================================
// A. 회원 상세 정보 및 수정 모달 (버튼 제거 버전)
// ===================================================
const UserDetailModal = ({ user, onClose, onRefresh }) => {
    if (!user) return null;

    const [editData, setEditData] = useState({
        userNo: user.userNo,
        nickname: user.nickname,
        phone: user.phone || '', 
        mainAddress: user.mainAddress || '',
        detailAddress: user.detailAddress || '',
        email: user.email,
        userYn: user.userYn || 'N', 
        userRole: user.userRole || 'SUPPORTER', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put('http://localhost:8001/foodding/api/admin/user/update', editData);
            alert(`[System] ${user.userId} 님의 정보가 수정되었습니다.`);
            onRefresh(); 
            onClose();   
        } catch (error) {
            console.error("Update failed:", error);
            alert("정보 수정 실패: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>회원 상세 정보</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body detail-layout">
                    <div className="detail-form-grid">
                        <div className="column">
                            <label>회원번호</label>
                            <input type="text" value={user.userNo} readOnly className="input-field read-only" />
                            <label>아이디</label>
                            <input type="text" value={user.userId} readOnly className="input-field read-only" />
                            <label>이름</label>
                            <input type="text" value={user.userName} readOnly className="input-field read-only" />
                            <label>닉네임</label>
                            <input type="text" name="nickname" value={editData.nickname} onChange={handleChange} className="input-field" />
                            <label>전화번호</label>
                            <input type="text" name="phone" value={editData.phone} onChange={handleChange} className="input-field" />
                            <label>주소 (기본)</label>
                            <input type="text" name="mainAddress" value={editData.mainAddress} onChange={handleChange} className="input-field" />
                            <label>주소 (상세)</label>
                            <input type="text" name="detailAddress" value={editData.detailAddress} onChange={handleChange} className="input-field" />
                        </div>

                        <div className="column">
                            <label>생년월일</label>
                            <input type="text" value={user.birthDate || '-'} readOnly className="input-field read-only" /> 
                            <label>성별</label>
                            <input type="text" value={user.gender || '-'} readOnly className="input-field read-only" /> 
                            <label>이메일</label>
                            <input type="email" name="email" value={editData.email} onChange={handleChange} className="input-field" /> 
                            <label>회원상태</label>
                            <select name="userYn" value={editData.userYn} onChange={handleChange} className="input-field">
                                <option value="N">활성 (N)</option>
                                <option value="Y">탈퇴 (Y)</option>
                            </select>
                            <label>회원 권한</label>
                            <select name="userRole" value={editData.userRole} onChange={handleChange} className="input-field">
                                <option value="SUPPORTER">서포터</option>
                                <option value="MAKER">메이커</option>
                            </select>
                            <label>가입일</label>
                            <input type="text" value={user.enrollDate} readOnly className="input-field read-only" />
                            <label>누적 후원액</label>
                            <input type="text" value={`${user.accumFund ? user.accumFund.toLocaleString() : 0} 원`} readOnly className="input-field read-only" />
                        </div>
                    </div>
                    
                    <div className="modal-footer-actions">
                        <button className="btn-save" onClick={handleSave}>정보 수정 저장</button>
                        <button className="btn-close-footer" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ===================================================
// B. 메인 탭 컴포넌트
// ===================================================
const UserManagementTab = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [modalUser, setModalUser] = useState(null); 

    const fetchUsers = useCallback(async (currentPage, currentFilter, currentSearch) => {
        try {
            const response = await axios.get('http://localhost:8001/foodding/api/admin/user/list', {
                params: {
                    page: currentPage,
                    size: 10,
                    status: currentFilter,
                    keyword: currentSearch
                }
            });

            setUserList(response.data.list || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error("회원 목록 로딩 실패:", error);
            setUserList([]);
        }
    }, []);

    useEffect(() => {
        fetchUsers(page, filterStatus, searchTerm);
    }, [page, filterStatus, fetchUsers]); 

    const handleSearch = () => {
        setPage(1); 
        fetchUsers(1, filterStatus, searchTerm);
    };
    
    return (
        <div className="user-management-tab">
            <div className="header-flex">
                <h2 className="page-title">
                    회원 정보 관리 
                    {totalCount > 0 && <span style={{fontSize: '0.6em', marginLeft:'10px', color:'#666'}}> (총 {totalCount}명)</span>}
                </h2> 
                <div className="search-group top-search">
                    <input 
                        type="text" 
                        placeholder="이름/ID/닉네임 검색" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="search-input"
                    />
                    <button className="btn-search" onClick={handleSearch}>검색</button>
                </div>
            </div>
            
            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>회원 상태:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                        className="filter-select"
                    >
                        <option value="all">전체</option>
                        <option value="N">활동중 (N)</option>
                        <option value="Y">탈퇴 (Y)</option>
                    </select>
                </div>
            </div>

            <div className="user-list-wrapper admin-card">
                <table className="user-table flickspot-style">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID</th>
                            <th>이름 (닉네임)</th>
                            <th>이메일</th>
                            <th>권한</th>
                            <th>상태</th>
                            <th>가입일</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.length > 0 ? (
                            userList.map((user) => (
                                <tr key={user.userNo} className={`user-row ${user.userYn === 'Y' ? 'status-deleted' : ''}`}>
                                    <td>{user.userNo}</td>
                                    <td>{user.userId}</td>
                                    <td>{user.userName} <span className="sub-text">({user.nickname})</span></td>
                                    <td>{user.email}</td>
                                    <td>{formatRole(user.userRole)}</td>
                                    <td>
                                        <span className={`status-badge ${user.userYn || 'N'}`}>
                                            {formatStatus(user.userYn)}
                                        </span>
                                    </td>
                                    <td>{user.enrollDate}</td>
                                    <td>
                                        <button className="btn-detail-small" onClick={() => setModalUser(user)}>
                                            상세/수정
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8" className="no-data">데이터가 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 0 && (
                <div className="pagination-area">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-page">&lt; 이전</button>
                    <span className="page-info"> {page} / {totalPages} </span>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-page">다음 &gt;</button>
                </div>
            )}
            
            <UserDetailModal user={modalUser} onClose={() => setModalUser(null)} onRefresh={() => fetchUsers(page, filterStatus, searchTerm)} />
        </div>
    );
};

export default UserManagementTab;