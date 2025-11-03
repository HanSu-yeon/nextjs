'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      // 환경 변수 확인
      if (!supabaseUrl || !supabaseAnonKey) {
        setIsConnected(false)
        return
      }
      
      // Supabase 연결 확인을 위해 간단한 쿼리 실행
      const { error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Supabase 연결 오류:', error)
        setIsConnected(false)
      } else {
        setIsConnected(true)
      }
    } catch (err) {
      console.error('연결 확인 실패:', err)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Next.js + Supabase
        </h1>
        
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.8 }}>
          Vercel 배포 준비 완료
        </p>

        <div style={{
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          marginBottom: '2rem'
        }}>
          {loading ? (
            <p>연결 확인 중...</p>
          ) : (
            <div>
              <p style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
                Supabase 연결 상태:
              </p>
              <p style={{
                fontSize: '1.1rem',
                color: isConnected ? '#10b981' : '#ef4444',
                fontWeight: 'bold'
              }}>
                {isConnected ? '✓ 연결됨' : '✗ 연결 안 됨'}
              </p>
            </div>
          )}
        </div>

        <div style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '2rem' }}>
          <p>환경 변수를 설정해주세요:</p>
          <ul style={{ listStyle: 'none', marginTop: '0.5rem' }}>
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
          </ul>
        </div>

        <a
          href="/examples"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'opacity 0.2s'
          }}
        >
          쿼리 예제 보기 →
        </a>
      </div>
    </main>
  )
}
