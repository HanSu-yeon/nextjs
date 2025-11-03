import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// 예제 API 라우트 - Supabase 사용법
export async function GET() {
  try {
    // 예제: Supabase에서 데이터 조회
    // 실제 테이블명으로 변경하세요 (예: 'users', 'posts' 등)
    const { data, error } = await supabase
      .from('_example_table') // 실제 테이블명으로 변경
      .select('*')
      .limit(10)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 예제: Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('_example_table') // 실제 테이블명으로 변경
      .insert(body)
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

