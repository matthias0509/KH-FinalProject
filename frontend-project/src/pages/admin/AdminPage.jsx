// src/pages/admin/AdminPage.jsx

import React, { useState } from 'react';

// 💡 사용자가 제공한 import 경로와 컴포넌트 이름 사용
import UserManagementPage from './UserManagementPage';
import DashBoardPage from './DashBoardPage'; // DashboardTab 대신 DashBoardPage 사용
import ProductVisibilityManager from './ProductVisibilityManager';
import SellerApplicationAdmin from './SellerApplicationAdmin';

import '../../styles/AdminPage.css'; // 관리자 전용 CSS
import '../../styles/MyPageLayout.css'; // 공통 레이아웃 (재활용)


// ===================================================
// A. 관리자 사이드바 컴포넌트
// ===================================================
const AdminSidebar = ({ activeMenu, setActiveMenu }) => {
    
    // 메뉴 구조 정의
    const adminMenus = [
        { id: 'dashboard', name: '📊 대시보드 (통계)', category: '주요 기능' },
        { id: 'proj_manage', name: '📝 프로젝트 승인/반려', category: '운영 관리' },
        { id: 'seller_apply', name: '🧾 판매자 전환 관리', category: '' },
        { id: 'refund_manage', name: '💰 후원/환불 관리', category: '' },
        { id: 'user_manage', name: '👤 회원 정보 조회/관리', category: '회원 관리' },
        { id: 'pudding_manage', name: '🍮 푸슐랭 관리', category: '' },
        { id: 'notice_manage', name: '📢 공지사항 관리', category: '콘텐츠 관리' },
        { id: 'faq_manage', name: '❓ FAQ 관리', category: '문의 관리' },
        { id: 'inquiry_manage', name: '💬 문의 관리 (Q&A/1:1)', category: '' },
    ];

    // 메뉴를 카테고리별로 그룹화
    const groupedMenus = adminMenus.reduce((acc, menu) => {
        // 이 로직은 카테고리 없는 메뉴를 바로 위 카테고리에 묶습니다.
        const category = menu.category || (acc.length > 0 ? acc[acc.length - 1].category : '기타');
        
        let existingGroup = acc.find(item => item.category === category);
        
        if (!existingGroup) {
            existingGroup = { category, items: [] };
            acc.push(existingGroup);
        }
        existingGroup.items.push(menu);
        return acc;
    }, []);


    return (
        <aside className="admin-sidebar">
            <h3 className="admin-title">관리자 콘솔</h3>
            
            <div className="menu-list">
                {groupedMenus.map(group => (
                    // 카테고리가 비어있지 않은 경우에만 그룹 헤더 표시
                    <div key={group.category} className="menu-group">
                        {group.category !== '기타' && <div className="menu-category">{group.category}</div>}
                        <ul>
                            {group.items.map(menu => (
                                <li 
                                    key={menu.id} 
                                    className={activeMenu === menu.id ? 'active-menu' : ''}
                                    onClick={() => setActiveMenu(menu.id)}
                                >
                                    <a href="#!">{menu.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
};


// ===================================================
// B. 메인 콘텐츠 뷰어 (ActiveMenu에 따라 내용 변경)
// ===================================================
const AdminContent = ({ activeMenu }) => {

    // 💡 'user_manage'를 별도 컴포넌트로 렌더링
    if (activeMenu === 'user_manage') {
        return (
            <main className="main-content admin-main-content">
                <UserManagementPage /> 
            </main>
        );
    }
    
    // 💡 'dashboard'를 별도 컴포넌트로 렌더링 (DashBoardPage 사용)
    if (activeMenu === 'dashboard') {
         return (
             <main className="main-content admin-main-content">
                 <DashBoardPage /> 
             </main>
         );
    }

    let content;

    switch (activeMenu) {
        // dashboard와 user_manage는 위 if문에서 처리했으므로 switch문에서 제외합니다.
        
        case 'proj_manage':
            content = (
                <ProductVisibilityManager />
            );
            break;
        case 'seller_apply':
            content = (
                <SellerApplicationAdmin />
            );
            break;
        case 'refund_manage':
            content = (
                <>
                    <h2 className="page-title">💰 후원 및 환불 관리</h2>
                    <p>후원 내역 상세 조회 및 강제 취소/환불 처리를 진행합니다. (유스케이스: 후원 취소/환불 관리, 후원 상세 조회)</p>
                </>
            );
            break;
        
        case 'pudding_manage':
            content = (
                <>
                    <h2 className="page-title">🍮 푸슐랭 관리</h2>
                    <p>푸슐랭 목록 조회 및 푸슐랭 정보 수정, 푸슐랭 삭제를 처리합니다. (유스케이스: 푸슐랭 목록 조회, 푸슐랭 정보 수정/삭제)</p>
                </>
            );
            break;
        case 'notice_manage':
            content = (
                <>
                    <h2 className="page-title">📢 공지사항 관리</h2>
                    <p>공지사항 등록, 수정, 삭제 기능을 제공합니다. (유스케이스: 공지사항 등록/수정/삭제)</p>
                </>
            );
            break;
        case 'faq_manage':
            content = (
                <>
                    <h2 className="page-title">❓ FAQ 관리</h2>
                    <p>FAQ 등록, 수정, 삭제 기능을 제공합니다. (유스케이스: FAQ 등록/수정/삭제)</p>
                </>
            );
            break;
        case 'inquiry_manage':
            content = (
                <>
                    <h2 className="page-title">💬 문의 관리 (Q&A/1:1 채팅)</h2>
                    <p>사용자 Q&A 및 1:1 채팅 내역을 통합 조회하고 답변 처리합니다. (유스케이스: Q&A 조회, 1:1 채팅 조회)</p>
                </>
            );
            break;
        default:
            content = <h2 className="page-title">관리자 대시보드에 오신 것을 환영합니다.</h2>;
    }

    return (
        <main className="main-content admin-main-content">
            {content}
            <div className="admin-content-box">
                {/* 나머지 메뉴들은 내용이 채워지기 전까지 이 상자가 표시됩니다. */}
                <p>여기에 {activeMenu} 관련 상세 콘텐츠가 표시됩니다.</p>
            </div>
        </main>
    );
};


// ===================================================
// C. 메인 페이지 컴포넌트 (AdminPage)
// ===================================================
const AdminPage = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    return (
        // Header와 Footer가 없는 전체 화면 래퍼 사용
        <div className="admin-full-page-wrapper"> 
            
            <div className="mypage-container admin-container no-header"> 
                
                {/* --- 왼쪽 사이드바 --- */}
                <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

                {/* --- 오른쪽 메인 콘텐츠 --- */}
                <AdminContent activeMenu={activeMenu} />

            </div>
        </div>
    );
};

export default AdminPage;
