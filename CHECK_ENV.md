# 환경 변수 문제 해결

## 문제

여전히 5432 포트(Direct connection)에 연결 시도

## 원인

Next.js는 환경 변수를 다음 순서로 읽습니다:
1. `.env.local` (최우선)
2. `.env`

`.env.local`에 DATABASE_URL이 있으면 `.env`의 설정이 무시됩니다.

## 해결 방법

### 방법 1: .env.local 파일에도 DATABASE_URL 추가

`.env.local` 파일에 다음 추가:

```env
DATABASE_URL="postgresql://postgres.bxxsincguebrzumszyaw:qwer1234%21%21@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:qwer1234%21%21@db.bxxsincguebrzumszyaw.supabase.co:5432/postgres?sslmode=require"
```

### 방법 2: .env 파일만 사용

.env.local에서 DATABASE_URL을 제거하고 .env만 사용

## 전체 환경 변수 구조

### .env.local (Next.js용)
```env
NEXT_PUBLIC_SUPABASE_URL=https://bxxsincguebrzumszyaw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres.bxxsincguebrzumszyaw:qwer1234%21%21@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:qwer1234%21%21@db.bxxsincguebrzumszyaw.supabase.co:5432/postgres?sslmode=require"
```

### .env (Prisma CLI용)
```env
DATABASE_URL="postgresql://postgres.bxxsincguebrzumszyaw:qwer1234%21%21@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:qwer1234%21%21@db.bxxsincguebrzumszyaw.supabase.co:5432/postgres?sslmode=require"
```

