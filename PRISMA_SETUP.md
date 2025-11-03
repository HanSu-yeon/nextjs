# Prisma 설정 완료 가이드

## ✅ 생성된 파일

1. `prisma/schema.prisma` - Prisma 스키마 파일
2. `lib/prisma.ts` - Prisma 클라이언트 인스턴스
3. `app/api/users/route.ts` - Prisma 사용 예제 API

## 📦 1단계: Prisma 설치

터미널에서 다음 명령어를 실행하세요:

```bash
npm install prisma @prisma/client
```

## 🔧 2단계: 환경 변수 확인

`.env.local` 파일에 다음이 있는지 확인:

```env
DATABASE_URL="postgresql://postgres:qwer1234!!@db.bxxsincguebrzumszyaw.supabase.co:5432/postgres"
```

## 🗄️ 3단계: 기존 테이블에서 스키마 가져오기

Supabase에 이미 테이블이 있다면 (예: `test` 테이블):

```bash
npx prisma db pull
```

이 명령어는 데이터베이스의 테이블 구조를 읽어서 `prisma/schema.prisma` 파일을 자동으로 업데이트합니다.

## 🏗️ 4단계: Prisma Client 생성

```bash
npx prisma generate
```

이 명령어는 Prisma Client를 생성하여 TypeScript 타입을 제공합니다.

## 📝 5단계: 스키마 수정 (필요한 경우)

`prisma/schema.prisma` 파일을 열어서 테이블 구조에 맞게 수정하세요:

```prisma
model Test {
  id        String   @id @default(uuid())
  name      String?
  createdAt DateTime? @default(now()) @map("created_at")
  
  @@map("test")
}
```

### 테이블 구조에 맞게 모델 추가

예를 들어 `users` 테이블이 있다면:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now()) @map("created_at")
  
  @@map("users")
}
```

## 🧪 6단계: 테스트

### API 테스트

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 브라우저 또는 Postman에서 테스트:
   - GET: `http://localhost:3000/api/users`
   - POST: `http://localhost:3000/api/users` (Body: `{"name": "테스트"}`)

### Prisma Studio 사용

시각적으로 데이터베이스를 확인하고 수정할 수 있습니다:

```bash
npm run db:studio
```

브라우저에서 `http://localhost:5555`가 자동으로 열립니다.

## 📚 Prisma 명령어

```bash
# Prisma Client 생성
npm run db:generate

# 데이터베이스로 스키마 푸시 (스키마 → DB)
npm run db:push

# 데이터베이스에서 스키마 가져오기 (DB → 스키마)
npm run db:pull

# Prisma Studio 실행 (GUI)
npm run db:studio
```

## 🔍 사용 예제

### 기본 조회

```typescript
import { prisma } from '@/lib/prisma'

// 모든 데이터 조회
const data = await prisma.test.findMany()

// 조건부 조회
const filtered = await prisma.test.findMany({
  where: {
    name: {
      contains: '검색어',
    },
  },
})
```

### 데이터 삽입

```typescript
const newData = await prisma.test.create({
  data: {
    name: '새로운 데이터',
  },
})
```

### 데이터 업데이트

```typescript
const updated = await prisma.test.update({
  where: {
    id: 'uuid-here',
  },
  data: {
    name: '수정된 이름',
  },
})
```

### 데이터 삭제

```typescript
const deleted = await prisma.test.delete({
  where: {
    id: 'uuid-here',
  },
})
```

## ⚠️ 주의사항

1. **스키마 변경 후**: `npx prisma generate` 실행 필요
2. **마이그레이션**: 프로덕션 환경에서는 `prisma migrate` 사용 권장
3. **RLS 정책**: Supabase의 RLS 정책도 확인하세요

## 🚀 다음 단계

1. Supabase Dashboard에서 테이블 구조 확인
2. `npx prisma db pull`로 스키마 가져오기
3. `npx prisma generate`로 클라이언트 생성
4. API 테스트

