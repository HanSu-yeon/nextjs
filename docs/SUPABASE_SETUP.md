# Supabase 프로젝트 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase 공식 사이트](https://supabase.com)에 접속
2. "Start your project" 또는 "Sign in" 클릭
3. GitHub 계정으로 로그인 (또는 이메일로 회원가입)

## 2. 새 프로젝트 만들기

1. Dashboard에서 "New Project" 클릭
2. 다음 정보 입력:
   - **Name**: 프로젝트 이름 (예: my-nextjs-app)
   - **Database Password**: 데이터베이스 비밀번호 (안전하게 저장해두세요!)
   - **Region**: 가장 가까운 리전 선택 (예: Northeast Asia (Seoul))
3. "Create new project" 클릭
4. 프로젝트 생성 완료까지 1-2분 정도 소요

## 3. 프로젝트 URL과 API 키 찾기

### 방법 1: Settings > API 메뉴

1. 왼쪽 사이드바에서 **Settings** (⚙️) 클릭
2. **API** 메뉴 클릭
3. 다음 정보를 확인:
   - **Project URL**: `https://xxxxx.supabase.co` 형식
   - **anon public** 키: `eyJhbGc...` 로 시작하는 긴 문자열

### 방법 2: 프로젝트 홈에서

1. 프로젝트 Dashboard 홈 화면
2. 오른쪽 상단 또는 상단 바에 프로젝트 정보 표시
3. "Project Settings" 클릭 후 API 메뉴로 이동

## 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTcwODgwMCwiZXhwIjoxOTYxMjg0ODAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **주의사항:**
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함되어 있음)
- `anon public` 키는 클라이언트에서 사용해도 안전합니다
- `service_role` 키는 서버 사이드에서만 사용하고 절대 클라이언트에 노출하지 마세요!

## 5. 테이블 생성 (예제)

1. 왼쪽 사이드바에서 **Table Editor** 클릭
2. "New table" 클릭
3. 테이블 이름 입력 (예: `users`, `posts`)
4. 컬럼 추가:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `name` (text)
   - `created_at` (timestamptz, default: now())
5. "Save" 클릭

## 6. 연결 테스트

프로젝트를 실행하고 메인 페이지에서 Supabase 연결 상태를 확인하세요:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속하여 연결 상태 확인

## 참고 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Dashboard](https://app.supabase.com)
- [Next.js + Supabase 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

