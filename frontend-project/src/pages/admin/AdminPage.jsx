// src/pages/admin/AdminPage.jsx

import React, { useState } from 'react';

// 💡 각 페이지 컴포넌트 Import
import UserManagementPage from './UserManagementPage';
import ProjectApprovalPage from './ProjectApprovalPage';
import DashBoardPage from './DashBoardPage';
import PuddingManagementPage from './PuddingManagementPage'; // 👈 푸슐랭 관리 추가
import InquiryManagement from './InquiryManagement';
import SellerApplicationAdmin from './SellerApplicationAdmin';

// 💡 아직 페이지가 없는 경우를 위한 임시 컴포넌트 (필요 시 유지)
// import ProductVisibilityManager from './ProductVisibilityManager'; 

import '../../styles/AdminPage.css'; // 관리자 전용 CSS
import '../../styles/MyPageLayout.css'; // 공통 레이아웃 (재활용)
import FAQManagementPage from './FAQManagementPage';
import NoticeEditPage from '../CustomerService/NoticeEditPage';
import NoticeDetailPage from '../CustomerService/NoticeDetailPage';
import NoticeWritePage from '../CustomerService/NoticeWritePage';


// ===================================================
// A. 관리자 사이드바 컴포넌트
// ===================================================
const AdminSidebar = ({ activeMenu, setActiveMenu }) => {
    
    // 메뉴 구조 정의
    const adminMenus = [
        { id: 'dashboard', name: '📊 대시보드 (통계)', category: '주요 기능' },
        { id: 'proj_manage', name: '📝 프로젝트 승인/반려', category: '운영 관리' },
        { id: 'seller_apply', name: '🧾 판매자 전환 관리', category: '' },
        { id: 'pudding_manage', name: '🍮 푸슐랭(프로젝트) 관리', category: '' }, // 👈 이름 약간 수정
        { id: 'refund_manage', name: '💰 후원/환불 관리', category: '' },
        { id: 'user_manage', name: '👤 회원 정보 조회/관리', category: '회원 관리' },
        { id: 'notice_manage', name: '📢 공지사항 관리', category: '콘텐츠 관리' },
        { id: 'faq_manage', name: '❓ FAQ 관리', category: '문의 관리' },
        { id: 'inquiry_manage', name: '💬 문의 관리 (Q&A/1:1)', category: '' },
    ];

    // 메뉴를 카테고리별로 그룹화
    const groupedMenus = adminMenus.reduce((acc, menu) => {
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

    // 1. 대시보드
    if (activeMenu === 'dashboard') {
         return (
             <main className="main-content admin-main-content">
                 <DashBoardPage /> 
             </main>
         );
    }

    // 2. 프로젝트 승인/반려
    if (activeMenu === 'proj_manage') {
        return (
            <main className="main-content admin-main-content">
                <ProjectApprovalPage />
            </main>
        );
    }

    // 3. 회원 관리
    if (activeMenu === 'user_manage') {
        return (
            <main className="main-content admin-main-content">
                <UserManagementPage /> 
            </main>
        );
    }

    // ✅ [추가됨] 4. 푸슐랭(프로젝트) 관리
    // switch문에서 빼내어 독립된 화면으로 렌더링 (중복 타이틀 방지)
    if (activeMenu === 'pudding_manage') {
        return (
            <main className="main-content admin-main-content">
                <PuddingManagementPage />
            </main>
        );
    }

    // 5. 문의 관리
    if (activeMenu === 'inquiry_manage') {
        return (
            <main className="main-content admin-main-content">
                <InquiryManagement />
            </main>
        );
    }

    // =========================================================
    // 아직 전용 페이지 컴포넌트가 없는 메뉴들 (Switch로 처리)
    // =========================================================
    let content;

    switch (activeMenu) {
        case 'seller_apply':
            content = (
                <SellerApplicationAdmin />
            );
            break;

        case 'refund_manage':
            content = (
                <>
                    <h2 className="page-title">💰 후원 및 환불 관리</h2>
                    <p>후원 내역 상세 조회 및 강제 취소/환불 처리를 진행합니다.</p>
                </>
            );
            break;
        
        case 'notice_manage':
            content = (
                <>
                    <h2 className="page-title">📢 공지사항 관리</h2>
                    <p>공지사항 등록, 수정, 삭제 기능을 제공합니다.</p>
                    <NoticeWritePage/>
                </>
            );
            break;

        case 'faq_manage':
            content = (
                <>
                  
                    <FAQManagementPage/>
                </>
            );
            break;

        default:
            content = <h2 className="page-title">준비 중인 페이지입니다.</h2>;
    }

    return (
        <main className="main-content admin-main-content">
            {content}
            {/* 아직 개발되지 않은 페이지일 경우에만 박스 표시 */}
            <div className="admin-content-box">
                <p style={{ color: '#999', marginTop: '20px' }}>
                    '{activeMenu}' 메뉴의 상세 기능은 개발 예정입니다.
                </p>
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