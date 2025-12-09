# KH-FinalProject
KH정보교육원 파이널프로젝트

# 🥄 Foodding (푸딩)
음식 관련 창작자와 소비자를 연결하는 펀딩 플랫폼입니다.  
텀블벅과 와디즈를 벤치마킹하여 사용자 친화적인 UI와 안정적인 결제 흐름을 제공합니다.

---

## 🚀 주요 기능 (Features)
- 회원가입 / 로그인 (JWT 인증)
- 펀딩 프로젝트 목록 조회, 상세 페이지
- 펀딩 개설(등록) / 수정 / 삭제
- 결제 기능 연동 (예: Toss Payments)
- 마이페이지 (참여 펀딩 내역, 포인트 관리)
- 관리자 페이지 (펀딩 승인/반려)
- 이미지 업로드 기능

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- React (Vite)
- React Router
- Axios
- Styled-components 또는 Tailwind
- Zustand 또는 Redux Toolkit

### Backend
- Spring Boot 3.x
- Spring Security + JWT
- JPA 또는 MyBatis
- Oracle Database
- Lombok

---

## 📁 프로젝트 구조 (Directory Structure)

```plaintext
/foodding
 ├── frontend
 │    └── src
 │         ├── components
 │         ├── pages
 │         ├── api
 │         ├── store
 │         └── assets
 └── backend
      └── src
           ├── main/java/com/foodding
           └── main/resources