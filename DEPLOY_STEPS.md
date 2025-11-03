# Vercel 배포를 위한 Git 설정

Git 명령어가 실행되지 않는 경우, 아래 단계를 따라하세요.

## 1. Git Bash 또는 터미널에서 실행

프로젝트 폴더에서 다음 명령어를 순서대로 실행하세요:

### 원격 저장소 연결

```bash
# 원격 저장소 추가 (SSH 사용)
git remote add origin git@github.com:HanSu-yeon/nextjs.git

# 또는 HTTPS 사용 (SSH 키가 설정되어 있지 않은 경우)
git remote add origin https://github.com/HanSu-yeon/nextjs.git

# 원격 저장소 확인
git remote -v
```

### 파일 커밋 및 푸시

```bash
# 모든 파일 추가 (단, .env.local은 자동 제외됨)
git add .

# 커밋
git commit -m "Initial commit: Next.js + Supabase project"

# 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 2. SSH 키가 설정되어 있지 않은 경우

SSH 키가 설정되어 있지 않다면 HTTPS를 사용하세요:

```bash
# 기존 원격 저장소 제거
git remote remove origin

# HTTPS로 다시 추가
git remote add origin https://github.com/HanSu-yeon/nextjs.git

# 푸시 (GitHub 계정 로그인 필요)
git push -u origin main
```

## 3. Vercel 배포

GitHub에 푸시가 완료되면:

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. `HanSu-yeon/nextjs` 저장소 선택
4. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://bxxsincguebrzumszyaw.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eHNpbmNndWVicnp1bXN6eWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjc1MDUsImV4cCI6MjA3Nzc0MzUwNX0.SUoUrloxrD6c_hz0ifjRBTVwkD9CfuqgsZE8huVH2uA`
5. "Deploy" 클릭

## 문제 해결

### Git 명령어가 실행되지 않는 경우

1. Git이 설치되어 있는지 확인
2. Git Bash를 사용하여 실행
3. 또는 VS Code의 통합 터미널 사용 (Ctrl + `)

### 권한 오류가 발생하는 경우

1. 관리자 권한으로 실행
2. 또는 HTTPS를 사용 (SSH 키 설정 필요 없음)

