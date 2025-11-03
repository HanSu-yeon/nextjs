# Vercel 배포 가이드

## 1. Git 저장소 초기화 및 GitHub 푸시

### Git 초기화 및 커밋

프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가 (단, .env.local은 자동으로 제외됨)
git add .

# 커밋
git commit -m "Initial commit: Next.js + Supabase project"

# 브랜치 이름을 main으로 변경
git branch -M main

# GitHub 원격 저장소 추가 (이미 제공된 URL 사용)
git remote add origin git@github.com:HanSu-yeon/nextjs.git

# GitHub에 푸시
git push -u origin main
```

⚠️ **주의사항:**
- `.env.local` 파일은 절대 커밋하지 마세요 (`.gitignore`에 이미 포함되어 있음)
- SSH 키가 설정되어 있지 않다면 HTTPS URL 사용: `https://github.com/HanSu-yeon/nextjs.git`

### SSH 키 설정이 안 되어 있다면 HTTPS 사용

```bash
git remote add origin https://github.com/HanSu-yeon/nextjs.git
git push -u origin main
```

## 2. Vercel에서 프로젝트 배포

### 2-1. Vercel에 로그인

1. [Vercel](https://vercel.com)에 접속
2. GitHub 계정으로 로그인 (또는 회원가입)

### 2-2. 프로젝트 가져오기

1. Dashboard에서 **"Add New Project"** 클릭
2. **"Import Git Repository"** 선택
3. `HanSu-yeon/nextjs` 저장소 선택 (또는 검색)
4. **"Import"** 클릭

### 2-3. 프로젝트 설정

1. **Framework Preset**: Next.js (자동 감지됨)
2. **Root Directory**: `./` (기본값)
3. **Build Command**: `npm run build` (기본값)
4. **Output Directory**: `.next` (기본값)
5. **Install Command**: `npm install` (기본값)

### 2-4. 환경 변수 설정 (중요!)

**Environment Variables** 섹션에서 다음 환경 변수를 추가:

1. **첫 번째 환경 변수:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://bxxsincguebrzumszyaw.supabase.co`
   - **Environment**: Production, Preview, Development 모두 체크

2. **두 번째 환경 변수:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eHNpbmNndWVicnp1bXN6eWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjc1MDUsImV4cCI6MjA3Nzc0MzUwNX0.SUoUrloxrD6c_hz0ifjRBTVwkD9CfuqgsZE8huVH2uA`
   - **Environment**: Production, Preview, Development 모두 체크

3. **"Deploy"** 버튼 클릭

### 2-5. 배포 완료

- 배포가 완료되면 (약 2-3분) Vercel이 자동으로 배포 URL을 제공합니다
- URL 형식: `https://your-project-name.vercel.app`
- 이후 GitHub에 푸시할 때마다 자동으로 재배포됩니다!

## 3. 배포 후 확인

1. Vercel에서 제공한 URL로 접속
2. 메인 페이지에서 Supabase 연결 상태 확인
3. "쿼리 예제 보기" 페이지도 테스트

## 4. 환경 변수 추가/수정

나중에 환경 변수를 추가하거나 수정하려면:

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 환경 변수 추가/수정/삭제
4. **"Save"** 클릭 후 재배포

## 문제 해결

### 배포가 실패하는 경우

1. **환경 변수가 설정되지 않음**
   - Vercel Dashboard에서 Environment Variables 확인
   - 모든 환경(Production, Preview, Development)에 체크되어 있는지 확인

2. **빌드 에러**
   - Vercel Dashboard의 **Deployments** 탭에서 로그 확인
   - 로컬에서 `npm run build` 실행하여 에러 확인

3. **Supabase 연결 오류**
   - 환경 변수가 올바르게 설정되었는지 확인
   - Supabase Dashboard에서 프로젝트가 활성화되어 있는지 확인

## 자동 배포

GitHub에 푸시하면 자동으로 Vercel에서 재배포됩니다:
- `main` 브랜치에 푸시 → Production 배포
- 다른 브랜치에 푸시 → Preview 배포

## 참고

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

