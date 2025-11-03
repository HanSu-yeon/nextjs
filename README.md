# Next.js + Supabase 프로젝트

Next.js와 Supabase를 사용한 프로젝트입니다. Vercel에 배포할 수 있도록 구성되어 있습니다.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 프로젝트 생성 및 환경 변수 설정

#### 2-1. Supabase 프로젝트 생성

1. [Supabase Dashboard](https://app.supabase.com)에 접속하여 로그인
2. "New Project" 클릭하여 새 프로젝트 생성
3. 프로젝트 정보 입력 (이름, 데이터베이스 비밀번호, 리전 등)
4. 프로젝트 생성 완료 대기 (1-2분 소요)

#### 2-2. 프로젝트 URL과 API 키 확인

1. 프로젝트 Dashboard에서 **Settings** (⚙️) 클릭
2. 왼쪽 메뉴에서 **API** 선택
3. 다음 정보를 확인:
   - **Project URL**: `https://xxxxx.supabase.co` 형식 (예: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** 키: `eyJhbGc...` 로 시작하는 긴 문자열

#### 2-3. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 확인한 값 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **주의**: `.env.local` 파일은 Git에 커밋하지 마세요 (자동으로 제외됨)

📖 **더 자세한 설정 가이드는 [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)를 참고하세요.**

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## Vercel 배포

### 1. GitHub에 프로젝트 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your_repository_url
git push -u origin main
```

### 2. Vercel에서 프로젝트 가져오기

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. "Deploy" 클릭

### 3. 자동 배포

이후 main 브랜치에 푸시하면 자동으로 배포됩니다.

## 프로젝트 구조

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 레이아웃
│   ├── page.tsx             # 메인 페이지
│   ├── examples/            # 예제 페이지
│   │   └── page.tsx         # Supabase 쿼리 예제
│   ├── api/                 # API 라우트
│   │   └── example/         # 예제 API
│   │       └── route.ts
│   └── globals.css          # 전역 스타일
├── lib/                     # 유틸리티 및 설정
│   ├── supabase.ts          # Supabase 클라이언트
│   └── supabase-queries.ts  # Supabase 쿼리 헬퍼 함수
├── package.json
├── next.config.js
└── tsconfig.json
```

## 기능

- ✅ Supabase 연결 상태 확인
- ✅ 데이터 조회, 삽입, 업데이트, 삭제 예제
- ✅ 실시간 구독 예제
- ✅ API 라우트 예제
- ✅ Vercel 배포 설정

## 기술 스택

- **Next.js 14** - React 프레임워크
- **Supabase** - 백엔드 서비스
- **TypeScript** - 타입 안정성
- **Vercel** - 배포 플랫폼

