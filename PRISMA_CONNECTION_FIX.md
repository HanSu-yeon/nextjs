# Prisma 데이터베이스 연결 오류 해결

## 문제: Can't reach database server

`npx prisma db pull` 실행 시 위 에러가 발생하면 다음을 확인하세요.

## 해결 방법

### 방법 1: SSL 모드 추가 (권장)

`.env` 파일의 DATABASE_URL에 `?sslmode=require` 추가:

```env
DATABASE_URL="postgresql://postgres:qwer1234!!@db.bxxsincguebrzumszyaw.supabase.co:5432/postgres?sslmode=require"
```

### 방법 2: 비밀번호 URL 인코딩

비밀번호에 특수문자(`!!`)가 있으면 URL 인코딩:

```env
# ! = %21
DATABASE_URL="postgresql://postgres:qwer1234%21%21@db.bxxsincguebrzumszyaw.supabase.co:5432/postgres?sslmode=require"
```

### 방법 3: Connection Pooling 사용

Direct connection 대신 Connection pooling 사용:

Supabase Dashboard → Settings → Database → Connection pooling URI 사용

```env
DATABASE_URL="postgresql://postgres.bxxsincguebrzumszyaw:[PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require"
```

## 수정 후 다시 시도

```bash
npx prisma db pull
```

## 확인 사항

1. Supabase 프로젝트가 활성화되어 있는지 확인
2. 네트워크 연결 확인
3. 방화벽 설정 확인
4. 비밀번호가 정확한지 확인

