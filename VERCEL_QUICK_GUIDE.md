# Vercel 배포 빠른 가이드

## 🚀 단계별 배포 방법

### 1단계: Vercel 접속 및 로그인

1. [https://vercel.com](https://vercel.com) 접속
2. **"Sign Up"** 또는 **"Log In"** 클릭
3. GitHub 계정으로 로그인 (권장) - 자동 연동됨

### 2단계: 프로젝트 가져오기

1. Dashboard에서 **"Add New..."** 또는 **"New Project"** 버튼 클릭
2. **"Import Git Repository"** 클릭
3. GitHub 저장소 목록에서 `HanSu-yeon/nextjs` 찾기 (또는 검색)
4. **"Import"** 버튼 클릭

### 3단계: 프로젝트 설정

**자동 감지됨 (변경 불필요):**

-   **Framework Preset**: Next.js ✅
-   **Root Directory**: `./` ✅
-   **Build Command**: `npm run build` ✅
-   **Output Directory**: `.next` ✅
-   **Install Command**: `npm install` ✅

**그대로 두고 다음 단계로!**

### 4단계: 환경 변수 설정 ⚠️ 중요!

**Environment Variables** 섹션에서 환경 변수 추가:

#### 첫 번째 환경 변수:

1. **Name (Key)**: `NEXT_PUBLIC_SUPABASE_URL`
2. **Value**: `https://bxxsincguebrzumszyaw.supabase.co`
3. **Environment**:
    - ✅ Production
    - ✅ Preview
    - ✅ Development
      (모두 체크!)

#### 두 번째 환경 변수:

1. **Name (Key)**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eHNpbmNndWVicnp1bXN6eWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjc1MDUsImV4cCI6MjA3Nzc0MzUwNX0.SUoUrloxrD6c_hz0ifjRBTVwkD9CfuqgsZE8huVH2uA`
3. **Environment**:
    - ✅ Production
    - ✅ Preview
    - ✅ Development
      (모두 체크!)

### 5단계: 배포!

1. 모든 설정 확인 후 **"Deploy"** 버튼 클릭
2. 배포 진행 중... (약 2-3분 소요)
3. 배포 완료! ✅

### 6단계: 배포 URL 확인

배포가 완료되면:

-   Vercel이 자동으로 URL을 제공합니다
-   형식: `https://nextjs-xxxxx.vercel.app`
-   또는 커스텀 도메인 설정 가능

## 🎉 완료!

이제 다음이 자동으로 작동합니다:

-   ✅ GitHub에 푸시 → 자동 재배포
-   ✅ `main` 브랜치 푸시 → Production 배포
-   ✅ 다른 브랜치 푸시 → Preview 배포

## 🔍 배포 확인

1. Vercel이 제공한 URL로 접속
2. 메인 페이지에서 Supabase 연결 상태 확인
3. "쿼리 예제 보기" 페이지도 테스트

## ❌ 문제 발생 시

### 배포 실패

1. **Deployments** 탭 클릭
2. 실패한 배포 선택
3. **Logs** 탭에서 에러 확인

### Supabase 연결 오류

1. **Settings** → **Environment Variables** 확인
2. 환경 변수가 올바르게 설정되었는지 확인
3. 모든 환경(Production, Preview, Development)에 체크되어 있는지 확인

## 📝 나중에 환경 변수 수정

1. 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 수정/추가/삭제
4. **"Save"** 클릭
5. 자동 재배포됨
