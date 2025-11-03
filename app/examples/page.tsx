'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchData, insertData, updateData, deleteData } from '@/lib/supabase-queries'

export default function ExamplesPage() {
  const [tableName, setTableName] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFetch = async () => {
    if (!tableName) {
      alert('테이블명을 입력하세요')
      return
    }
    
    setLoading(true)
    try {
      const data = await fetchData(tableName)
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleInsert = async () => {
    if (!tableName) {
      alert('테이블명을 입력하세요')
      return
    }
    
    const sampleData = {
      name: '샘플 데이터',
      created_at: new Date().toISOString(),
    }
    
    setLoading(true)
    try {
      const data = await insertData(tableName, sampleData)
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
        Supabase 쿼리 예제
      </h1>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          테이블명:
        </label>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="예: users, posts"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '1rem'
          }}
        />
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleFetch}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? '로딩...' : '데이터 조회'}
          </button>
          
          <button
            onClick={handleInsert}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? '로딩...' : '샘플 데이터 삽입'}
          </button>
        </div>
      </div>

      {result && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginTop: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>결과:</h2>
          <pre style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#fff3cd',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>사용 방법:</h3>
        <ol style={{ lineHeight: '1.8' }}>
          <li>Supabase Dashboard에서 테이블을 생성하세요</li>
          <li>위에 테이블명을 입력하세요</li>
          <li>조회 버튼을 클릭하여 데이터를 가져옵니다</li>
          <li>샘플 데이터 삽입 버튼으로 테스트 데이터를 추가합니다</li>
        </ol>
      </div>
    </main>
  )
}

