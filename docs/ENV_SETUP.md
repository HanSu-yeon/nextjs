# 환경 변수 설정 가이드

환경 변수는 **Supabase에서 하는 것이 아니라, Next.js 프로젝트에서 설정**합니다.

## 환경 변수가 필요한 이유

Supabase는 **프로젝트 URL과 API 키**를 제공하고, 
우리 Next.js 프로젝트는 이 정보를 환경 변수로 저장하여 Supabase에 연결합니다.

## 1. 로컬 개발 환경 설정 (개발할 때)

### .env.local 파일 생성

프로젝트 루트 폴더(`nextjs`)에 `.env.local` 파일을 생성합니다.

**파일 경로**: `C:\Users\BIMATRIX\Desktop\개발\nextjs\.env.local`

### 파일 내용

```env
NEXT_PUBLIC_SUPABASE_URL=https://bxxsincguebrzumszyaw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eHNpbmNndWVicnp1bXN6eWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjc1MDUsImV4cCI6MjA3Nzc0MzUwNX0.SUoUrloxrD6c_hz0ifjRBTVwkD9CfuqgsZE8huVH2uA
```

### 파일 생성 방법

#### 방법 1: VS Code에서
1. VS Code에서 프로젝트 열기
2. 왼쪽 파일 탐색기에서 프로젝트 루트 폴더 우클릭
3. "New File" 선택
4. 파일명: `.env.local` 입력
5. 위 내용 붙여넣기

#### 방법 2: 파일 탐색기에서
1. `C:\Users\BIMATRIX\Desktop\개발\nextjs` 폴더 열기
2. 빈 공간에서 우클릭 → "새로 만들기" → "텍스트 문서"
3. 파일명을 `.env.local`로 변경 (확장자 포함)
4. 파일 열어서 위 내용 붙여넣기

### 확인 방법

파일 생성 후 개발 서버를 실행:
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속하여 연결 상태 확인

## 2. Vercel 배포 환경 설정 (배포할 때)

Vercel에 배포할 때는 Vercel Dashboard에서 환경 변수를 설정합니다.

### Vercel에서 환경 변수 설정 방법

1. [Vercel Dashboard](https://vercel.com)에 로그인
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 선택
5. 다음 환경 변수 추가:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
     **Value**: `https://bxxsincguebrzumszyaw.supabase.co`
     **Environment**: Production, Preview, Development 모두 선택
   
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     **Environment**: Production, Preview, Development 모두 선택
6. "Save" 클릭
7. 배포 재실행 (자동으로 재배포되거나 수동으로 "Redeploy" 클릭)

## 중요 사항

⚠️ **`.env.local` 파일은 절대 Git에 커밋하지 마세요!**
- 이미 `.gitignore`에 포함되어 있어 자동으로 제외됩니다
- 이 파일에는 민감한 정보가 들어있습니다

✅ **환경 변수는 다음 위치에 설정:**
- 로컬: `.env.local` 파일 (프로젝트 폴더)
- Vercel: Vercel Dashboard의 Environment Variables

❌ **Supabase Dashboard에서는 환경 변수를 설정하지 않습니다**
- Supabase Dashboard는 프로젝트 URL과 키를 **확인**하는 곳입니다
- 실제 환경 변수 설정은 Next.js 프로젝트나 Vercel에서 합니다

