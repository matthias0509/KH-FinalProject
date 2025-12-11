import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import NoticePage from './pages/NoticePage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';
import LoginPage from './pages/Login/LoginPage';

<<<<<<< HEAD
import Paymentcompotnet from './components/payment/PaymentComponent';
import CreateMember from './pages/Login/CreateMemberPage';
=======
import Paymentcompotnet from './pages/payment/PaymentComponent';
import CreateMember from './components/Login/CreateMember';
import ChangePage from './pages/ChangePage';
import ChatComponent from './pages/chat/ChatComponent';
>>>>>>> a041e7efc898a814a4b94242d6c50ca7660f88fb

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path="/notice" element={<NoticePage />}/>
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/projects/premium-macarons" element={<ProductDetailPage />} />
      <Route path="/payment" element={<Paymentcompotnet />} />
      {/* path="/projects/:slug 예정 각 상품별 상세페이지 */}
      <Route path='/change' element={<ChangePage/>}/>
      <Route path='/chat' element={<ChatComponent />}/>
    </Routes>
  );
}
