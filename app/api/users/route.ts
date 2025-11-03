import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Prisma 사용 예제 - GET 요청 (데이터 조회)
export async function GET() {
  try {
    // test 테이블에서 모든 데이터 조회
    const tests = await prisma.test.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    // BigInt를 문자열로 변환
    const results = tests.map(test => ({
      ...test,
      id: test.id.toString(),
    }))

    return NextResponse.json({ 
      success: true,
      data: results, 
      count: results.length 
    })
  } catch (error: any) {
    console.error('Prisma query error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '데이터 조회 오류', 
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// Prisma 사용 예제 - POST 요청 (데이터 삽입)
export async function POST(request: Request) {
  try {
    // test 테이블에 데이터 삽입 (createdAt은 자동으로 설정됨)
    const newTest = await prisma.test.create({
      data: {},
    })

    // BigInt를 문자열로 변환
    const result = {
      ...newTest,
      id: newTest.id.toString(),
    }

    return NextResponse.json({ 
      success: true,
      message: '데이터가 성공적으로 추가되었습니다.',
      data: result 
    }, { status: 201 })
  } catch (error: any) {
    console.error('Prisma insert error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '데이터 삽입 오류', 
        message: error.message 
      },
      { status: 500 }
    )
  }
}

