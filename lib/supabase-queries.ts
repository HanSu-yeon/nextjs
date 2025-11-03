import { supabase } from './supabase'

// Supabase 쿼리 예제 함수들

/**
 * 데이터 조회 예제
 */
export async function fetchData(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
  
  if (error) {
    console.error('조회 오류:', error)
    throw error
  }
  
  return data
}

/**
 * 데이터 삽입 예제
 */
export async function insertData(tableName: string, data: any) {
  const { data: insertedData, error } = await supabase
    .from(tableName)
    .insert(data)
    .select()
  
  if (error) {
    console.error('삽입 오류:', error)
    throw error
  }
  
  return insertedData
}

/**
 * 데이터 업데이트 예제
 */
export async function updateData(
  tableName: string, 
  id: string | number, 
  updates: any
) {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('업데이트 오류:', error)
    throw error
  }
  
  return data
}

/**
 * 데이터 삭제 예제
 */
export async function deleteData(tableName: string, id: string | number) {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('삭제 오류:', error)
    throw error
  }
  
  return data
}

/**
 * 실시간 구독 예제
 */
export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`public:${tableName}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: tableName,
      },
      callback
    )
    .subscribe()
}

