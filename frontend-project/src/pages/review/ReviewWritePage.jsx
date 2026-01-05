import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyPageLayout from '../../components/MyPageLayout';
import { resolveProjectImageUrl } from '../../utils/projectMedia';
import { submitReview, fetchOrderReview } from '../../api/reviewApi';
import '../../styles/ReviewWritePage.css';

const MYPAGE_API = 'http://localhost:8001/foodding/api/mypage';

const defaultForm = {
  title: '',
  content: '',
  rating: 5,
};

const ReviewWritePage = () => {
  const { orderNo } = useParams();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.get(`${MYPAGE_API}/funding/${orderNo}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderInfo(data);

        try {
          const review = await fetchOrderReview(orderNo, token);
          if (review) {
            setExistingReview(review);
            setForm({
              title: review.reviewTitle,
              content: review.reviewContent,
              rating: review.rating,
            });
          }
        } catch (error) {
          if (error?.response?.status !== 404) {
            console.error('후기 조회 실패', error);
            toast.error('후기 정보를 불러오지 못했습니다.');
          }
        }
      } catch (error) {
        console.error('주문 정보 조회 실패', error);
        toast.error('해당 주문 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [orderNo, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting || existingReview) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!form.title.trim() || !form.content.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(
        {
          orderNo,
          title: form.title,
          content: form.content,
          rating: form.rating,
        },
        token,
      );
      toast.success('후기를 등록했습니다.');
      setTimeout(() => navigate('/mypage/history'), 800);
    } catch (error) {
      console.error('후기 작성 실패', error);
      const message = error?.response?.data?.message || '후기 작성 중 오류가 발생했습니다.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const imageUrl = resolveProjectImageUrl(
    orderInfo?.projectThumb || orderInfo?.originThumbnail,
    'https://via.placeholder.com/160x120?text=Foodding',
  );

  if (loading) {
    return (
      <MyPageLayout>
        <div className="review-write">
          <p className="review-write__status">정보를 불러오는 중입니다...</p>
        </div>
        <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} closeOnClick />
      </MyPageLayout>
    );
  }

  if (!orderInfo) {
    return (
      <MyPageLayout>
        <div className="review-write">
          <p className="review-write__status">주문 정보를 찾을 수 없습니다.</p>
          <button type="button" className="review-write__back" onClick={() => navigate('/mypage/history')}>
            목록으로 돌아가기
          </button>
        </div>
        <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} closeOnClick />
      </MyPageLayout>
    );
  }

  return (
    <MyPageLayout>
      <div className="review-write">
        <div className="review-write__header">
          <img src={imageUrl} alt={orderInfo.projectTitle} />
          <div>
            <p className="review-write__label">후기 작성</p>
            <h2>{orderInfo.projectTitle}</h2>
            <p className="review-write__maker">{orderInfo.makerName}</p>
          </div>
        </div>

        {existingReview ? (
          <div className="review-write__existing">
            <p>이미 작성한 후기가 있습니다.</p>
            <div className="review-write__existing-body">
              <h3>{existingReview.reviewTitle}</h3>
              <p className="review-write__existing-date">{existingReview.reviewCreateDate?.replace('T', ' ')}</p>
              <p className="review-write__existing-content">{existingReview.reviewContent}</p>
              <p className="review-write__existing-rating">별점: {existingReview.rating} / 5</p>
            </div>
            <div className="review-write__actions">
              <Link to={`/projects/${orderInfo.productNo}`} className="review-write__primary">
                프로젝트 보러가기
              </Link>
              <button type="button" className="review-write__back" onClick={() => navigate('/mypage/history')}>
                후원 내역으로 돌아가기
              </button>
            </div>
          </div>
        ) : (
          <form className="review-write__form" onSubmit={handleSubmit}>
            <label className="review-write__field">
              <span>제목</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="후기 제목을 입력하세요"
                maxLength={100}
                required
              />
            </label>

            <label className="review-write__field">
              <span>별점</span>
              <select name="rating" value={form.rating} onChange={handleChange}>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>{`${value}점`}</option>
                ))}
              </select>
            </label>

            <label className="review-write__field">
              <span>내용</span>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="프로젝트에 대한 후기를 작성해주세요."
                rows={8}
                maxLength={1000}
                required
              />
            </label>

            <div className="review-write__actions">
              <button type="submit" className="review-write__primary" disabled={submitting}>
                {submitting ? '등록 중...' : '후기 등록'}
              </button>
              <button type="button" className="review-write__back" onClick={() => navigate('/mypage/history')}>
                취소
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} closeOnClick />
    </MyPageLayout>
  );
};

export default ReviewWritePage;
