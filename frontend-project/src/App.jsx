import { Routes, Route } from 'react-router-dom';
import './App.css';

// 김동규
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import NoticePage from './pages/NoticePage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ChangePage from './pages/ChangePage';

// 박성진
import LoginPage from './pages/Login/LoginPage';
import CreateMember from './pages/Login/CreateMemberPage';


// 박주현
import ProfileEditPage from './pages/ProfileEditPage'
import MakerPage from './pages/MakerPage'
import MyPage from './pages/MyPage'
import FundingHistoryPage from './pages/supporter/FundingHistoryPage'
import FundingCancelPage from './pages/supporter/FundingCancelPage'
import FundingDetailPage from './pages/supporter/FundingDetailPage'
import LikeProjectPage from './pages/supporter/LikeProjectPage'
import FollowProjectPage from './pages/supporter/FollowProjectPage'
import ChatHistoryPage from './pages/supporter/ChatHistoryPage'
import QnAPage from './pages/supporter/QnAPage'


// 강호형
import ChatComponent from './pages/chat/ChatComponent';
import PaymentComponent from './pages/payment/PaymentComponent'



export default function App() {
  return (
    <Routes>
      {/* 김동규 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/projects/premium-macarons" element={<ProductDetailPage />} />
      {/* path="/projects/:slug 예정 각 상품별 상세페이지 */}
      <Route path='/change' element={<ChangePage/>}/>


      {/* 박성진 */}
      <Route path="/notice" element={<NoticePage />}/>  
      <Route path="/login" element={<LoginPage />} />

      
      {/* 박주현 */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/maker" element={<MakerPage />} />
      <Route path="/profile" element={<ProfileEditPage />} />
      <Route path="/history" element={<FundingHistoryPage />} />
      <Route path="/cancel" element={<FundingCancelPage />} />
      <Route path="/detail" element={<FundingDetailPage />} />
      <Route path="/like" element={<LikeProjectPage />} />
      <Route path="/follow" element={<FollowProjectPage />} />
      <Route path="/chat-history" element={<ChatHistoryPage />} />
      <Route path="/qna" element={<QnAPage />} />


      {/* 강호형 */}
      <Route path='/payment' element={<PaymentComponent/>}/>
      <Route path="/chat" element={<ChatComponent />} />
    </Routes>
  );
}