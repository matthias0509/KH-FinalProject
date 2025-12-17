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
import ProductDetailPage from './pages/ProductDetailPage';
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



export default function App() {

  // ★ 여기서 유저 정보를 "딱 한 곳"에서 관리합니다 (Single Source of Truth)
  const [userInfo, setUserInfo] = useState({
    name: '푸딩러버',
    profileImg: '🍮',
    role: 'maker', // 이 값을 'supporter'로 바꾸면 양쪽 다 서포터 모드로 변함!
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
      <Route path="/projects/premium-macarons" element={<ProductDetailPage />} />
      {/* path="/projects/:slug 예정 각 상품별 상세페이지 */}
      <Route path='/change' element={<ChangePage/>}/>
      <Route path="/payment" element={<PaymentComponent />}/>


      {/* supper용 사이드바*/}
      <Route path="/mypage" element={<MyPage userInfo={userInfo} />} />
      <Route path="/maker" element={<MakerPage userInfo={userInfo} />} />

      {/* 박성진 */}
      <Route path="/notice" element={<NoticePage />}/>  
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/findid" element={<FindIdPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/notice/:id" element={<NoticeDetailPage />} />
      <Route path="/inquiry" element={<InquiryPage />} />
      <Route path="/inquiries" element={<InquiryHistoryPage />} />
      <Route path="/noticewrite" element={<NoticeWritePage />} />

      
      {/* 박주현 */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/maker" element={<MakerPage />} />

      <Route path="/profile" element={<ProfileEditPage />} />
      <Route path="/history" element={<FundingHistoryPage />} />
      <Route path="/cancel" element={<FundingCancelPage />} />
      <Route path="/detail" element={<FundingDetailPage />} />
      <Route path="/like" element={<LikeProjectPage />} />
      <Route path="/follow" element={<FollowProjectPage />} />
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/qna" element={<QnAPage />} />

      {/* maker용 사이드바*/} 
      <Route path="/maker/chat-history" element={<ChatHistoryPage userInfo={userInfo}/>} />
      <Route path="/maker/project" element={<ProjectPage userInfo={userInfo}/>} />
      <Route path="/maker/settlement" element={<SettlementPage userInfo={userInfo}/>} />

      {/* 관리자 전용 */}
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/adminlogin" element={<AdminLoginPage />} />
      <Route path="/usermanagement" element={<UserManagementPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />




      <Route path="/chat-history" element={<ChatHistoryPage />} />
      <Route path="/qna" element={<QnAPage />} />


      {/* 강호형 */}

      <Route path='/payment' element={<PaymentComponent/>}/>
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/payment/success" element={<PaymentSuccess />}/>
      <Route path="/payment/fail" element={<PaymentFail />}/>
    </Routes>
  );
}
