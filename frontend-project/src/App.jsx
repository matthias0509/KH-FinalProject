import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// 김동규
import HomePage from './pages/HomePage';
import CreateProjectLandingPage from './pages/CreateProjectPage/CreateProjectLandingPage';
import CreateProjectPage from './pages/CreateProjectPage/CreateProjectPage';
import CreateProjectSuccessPage from './pages/CreateProjectPage/CreateProjectSuccessPage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/DetailPage/ProductDetailPage';
import ChangePage from './pages/ChangePage';

// 박성진
import LoginPage from './pages/Login/LoginPage';
import CreateMember from './pages/Login/CreateMemberPage';
import NoticePage from './pages/NoticePage';
import FindIdPage from './pages/Login/FindIdPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';
import FAQPage from './pages/CustomerService/FAQPage';
import NoticeDetailPage from './pages/CustomerService/NoticeDetailPage';
import InquiryPage from './pages/CustomerService/InquiryPage';
import InquiryHistoryPage from './pages/CustomerService/InquiryHistoryPage';
import NoticeWritePage from './pages/CustomerService/NoticeWritePage';
import LogoutPage from './pages/Login/logoutPage';
import NoticeEditPage from './pages/CustomerService/NoticeEditPage';

// 박주현
import MakerPage from './pages/MakerPage'
import MyPage from './pages/MyPage'
import FundingHistoryPage from './pages/supporter/FundingHistoryPage'
import FundingCancelPage from './pages/supporter/FundingCancelPage'
import FundingDetailPage from './pages/supporter/FundingDetailPage'
import LikeProjectPage from './pages/supporter/LikeProjectPage'
import FollowProjectPage from './pages/supporter/FollowProjectPage'
import ProfileEditPage from './pages/supporter/ProfileEditPage'
import QnAPage from './pages/supporter/QnAPage'
import ProjectApprovalPage from './pages/admin/ProjectApprovalPage';


// 강호형
import ChatComponent from './pages/chat/ChatComponent';
import PaymentComponent from './pages/payment/PaymentComponent'
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFail from './pages/payment/PaymentFail';
import ProjectPage from './pages/maker/ProjectPage';
import SettlementPage from './pages/maker/SettlementPage';
import ChatHistoryPage from './pages/maker/ChatHistoryPage';
import AdminPage from './pages/admin/AdminPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import DashBoardPage from './pages/admin/DashBoardPage';
import ChatListPage from './pages/chat/ChatListPage';



export default function App() {

  // ★ 상태 관리 (Single Source of Truth)
  const [userInfo, setUserInfo] = useState({
    name: '푸딩러버',
    profileImg: '🍮',
    role: 'maker',
    stats: {
        fundingCount: 12,
        followingCount: 5,
        likedCount: 8
    }
  });

  return (
    <Routes>
      {/* 김동규 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectLandingPage />} />
      <Route path="/create/new" element={<CreateProjectPage />} />
      <Route path="/create/success" element={<CreateProjectSuccessPage />} />
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/projects/:ProjectNo" element={<ProductDetailPage />} />
      <Route path='/change' element={<ChangePage/>}/>
      
      {/* 박성진 */}
      <Route path="/notice" element={<NoticePage />}/>  
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/findid" element={<FindIdPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/inquiry" element={<InquiryPage />} />
      <Route path="/inquiries" element={<InquiryHistoryPage />} />
      <Route path="/notice/write" element={<NoticeWritePage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/notice/:noticeNo" element={<NoticeDetailPage />} />
      <Route path="/notice/edit/:noticeNo" element={<NoticeEditPage />} />

      
      {/* ======================================================= */}
      {/* ★ [박주현] 마이페이지 (서포터) 경로 수정 완료 ★ */}
      {/* 사이드바 링크(/mypage/xxx)와 여기 path를 일치시켰습니다. */}
      {/* ======================================================= */}
      <Route path="/mypage" element={<MyPage userInfo={userInfo} />} />
      
      {/* 사이드바가 /mypage/profile 로 보내니까 여기도 맞춰야 함 */}
      <Route path="/mypage/profile" element={<ProfileEditPage />} />
      <Route path="/mypage/history" element={<FundingHistoryPage />} />
      <Route path="/mypage/cancel" element={<FundingCancelPage />} />
      <Route path="/mypage/detail" element={<FundingDetailPage />} />
      <Route path="/mypage/like" element={<LikeProjectPage />} />
      <Route path="/mypage/follow" element={<FollowProjectPage />} />
      <Route path="/mypage/qna" element={<QnAPage />} />


      {/* ======================================================= */}
      {/* ★ [메이커] 경로 설정 */}
      {/* ======================================================= */}
      <Route path="/maker" element={<MakerPage userInfo={userInfo} />} />
      <Route path="/maker/chat-history" element={<ChatHistoryPage userInfo={userInfo}/>} />
      <Route path="/maker/project" element={<ProjectPage userInfo={userInfo}/>} />
      <Route path="/maker/settlement" element={<SettlementPage userInfo={userInfo}/>} />


      {/* 관리자 전용 */}
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/adminlogin" element={<AdminLoginPage />} />
      <Route path="/usermanagement" element={<UserManagementPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/projectapproval" element={<ProjectApprovalPage />} />
      

      {/* 강호형 - 결제 관련 */}
      <Route path='/payment' element={<PaymentComponent/>}/>
      <Route path="/payment/success" element={<PaymentSuccess />}/>
      <Route path="/payment/fail" element={<PaymentFail />}/>

      {/* 채팅 관련 */}
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/mypage/chat" element={<ChatListPage />} />
      
    </Routes>
  );
}