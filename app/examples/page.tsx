"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchData, insertData, updateData, deleteData } from "@/lib/supabase-queries";

export default function ExamplesPage() {
	const [tableName, setTableName] = useState("");
	const [result, setResult] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const handleFetch = async () => {
		if (!tableName) {
			alert("테이블명을 입력하세요");
			return;
		}

		setLoading(true);
		try {
			const data = await fetchData(tableName);
			setResult(data);
		} catch (error: any) {
			setResult({ error: error.message });
		} finally {
			setLoading(false);
		}
	};

	const handleInsert = async () => {
		if (!tableName) {
			alert("테이블명을 입력하세요");
			return;
		}

		// 테이블 구조를 먼저 확인
		try {
			const { data: tableData, error: fetchError } = await supabase.from(tableName).select("*").limit(0); // 구조만 확인

			if (fetchError && fetchError.message.includes("does not exist")) {
				setResult({
					error: `'${tableName}' 테이블이 존재하지 않습니다. Supabase Dashboard에서 먼저 테이블을 생성해주세요.`,
				});
				return;
			}

			// 간단한 샘플 데이터 (일반적인 구조)
			const sampleData: any = {};

			// id가 없다면 자동 생성되도록 함
			// created_at이 있다면 추가
			try {
				const { data: existingData } = await supabase.from(tableName).select("*").limit(1);

				if (existingData && existingData.length > 0) {
					// 기존 데이터 구조를 참고하여 샘플 생성
					const firstRow = existingData[0];
					Object.keys(firstRow).forEach((key) => {
						if (key !== "id") {
							if (key.includes("name") || key.includes("title")) {
								sampleData[key] = "샘플 데이터";
							} else if (key.includes("created_at") || key.includes("updated_at")) {
								sampleData[key] = new Date().toISOString();
							} else if (typeof firstRow[key] === "string") {
								sampleData[key] = "샘플";
							} else if (typeof firstRow[key] === "number") {
								sampleData[key] = 0;
							}
						}
					});
				} else {
					// 테이블이 비어있으면 기본 구조 시도
					sampleData.created_at = new Date().toISOString();
				}
			} catch (e) {
				// 기본 샘플 데이터
				sampleData.created_at = new Date().toISOString();
			}

			if (Object.keys(sampleData).length === 0) {
				setResult({
					error: `테이블 구조를 확인할 수 없습니다. Supabase Dashboard에서 테이블 구조를 확인해주세요.`,
				});
				return;
			}

			setLoading(true);
			const data = await insertData(tableName, sampleData);
			setResult(data);
		} catch (error: any) {
			setResult({ error: error.message });
		} finally {
			setLoading(false);
		}
	};

	return (
		<main
			style={{
				minHeight: "100vh",
				padding: "2rem",
				maxWidth: "1200px",
				margin: "0 auto",
			}}
		>
			<h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Supabase 쿼리 예제</h1>

			<div
				style={{
					marginBottom: "2rem",
					padding: "1.5rem",
					backgroundColor: "#f5f5f5",
					borderRadius: "8px",
				}}
			>
				<label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>테이블명:</label>
				<input
					type="text"
					value={tableName}
					onChange={(e) => setTableName(e.target.value)}
					placeholder="예: users, posts"
					style={{
						width: "100%",
						padding: "0.75rem",
						fontSize: "1rem",
						borderRadius: "4px",
						border: "1px solid #ddd",
						marginBottom: "1rem",
					}}
				/>

				<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
					<button
						onClick={handleFetch}
						disabled={loading}
						style={{
							padding: "0.75rem 1.5rem",
							backgroundColor: "#0070f3",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: loading ? "not-allowed" : "pointer",
							fontSize: "1rem",
							opacity: loading ? 0.6 : 1,
						}}
					>
						{loading ? "로딩..." : "데이터 조회"}
					</button>

					<button
						onClick={handleInsert}
						disabled={loading}
						style={{
							padding: "0.75rem 1.5rem",
							backgroundColor: "#10b981",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: loading ? "not-allowed" : "pointer",
							fontSize: "1rem",
							opacity: loading ? 0.6 : 1,
						}}
					>
						{loading ? "로딩..." : "샘플 데이터 삽입"}
					</button>
				</div>
			</div>

			{result && (
				<div
					style={{
						padding: "1.5rem",
						backgroundColor: "#f5f5f5",
						borderRadius: "8px",
						marginTop: "2rem",
					}}
				>
					<h2 style={{ marginBottom: "1rem" }}>결과:</h2>
					<pre
						style={{
							backgroundColor: "#fff",
							padding: "1rem",
							borderRadius: "4px",
							overflow: "auto",
							fontSize: "0.9rem",
						}}
					>
						{JSON.stringify(result, null, 2)}
					</pre>
				</div>
			)}

			<div
				style={{
					marginTop: "3rem",
					padding: "1.5rem",
					backgroundColor: "#fff3cd",
					borderRadius: "8px",
					marginBottom: "2rem",
				}}
			>
				<h3 style={{ marginBottom: "1rem" }}>사용 방법:</h3>
				<ol style={{ lineHeight: "1.8", marginBottom: "1rem" }}>
					<li>
						<strong>Supabase Dashboard에서 테이블을 생성하세요</strong>
						<ul style={{ marginTop: "0.5rem", marginLeft: "1.5rem", lineHeight: "1.6" }}>
							<li>[https://app.supabase.com](https://app.supabase.com) 접속</li>
							<li>프로젝트 선택 → Table Editor → New Table</li>
							<li>테이블 생성 예시: id (uuid, primary key), name (text), created_at (timestamptz)</li>
						</ul>
					</li>
					<li>위에 테이블명을 입력하세요</li>
					<li>조회 버튼으로 데이터를 확인합니다</li>
					<li>샘플 데이터 삽입 버튼으로 테스트 데이터를 추가합니다</li>
				</ol>
			</div>

			<div
				style={{
					padding: "1.5rem",
					backgroundColor: "#f0f9ff",
					borderRadius: "8px",
					border: "1px solid #0ea5e9",
				}}
			>
				<h3 style={{ marginBottom: "1rem", color: "#0c4a6e" }}>⚠️ 에러 발생 시:</h3>
				<ul style={{ lineHeight: "1.8", color: "#0c4a6e" }}>
					<li>
						<strong>&quot;new row violates row-level security policy&quot;</strong>:{" "}
						<strong style={{ color: "#dc2626" }}>Row Level Security (RLS) 정책 문제입니다!</strong>
						<br />
						해결 방법:
						<ol style={{ marginTop: "0.5rem", marginLeft: "1.5rem", lineHeight: "1.6" }}>
							<li>Supabase Dashboard → Authentication → Policies</li>
							<li>해당 테이블 선택 (예: test)</li>
							<li>&quot;New Policy&quot; 클릭 → &quot;Create policy from scratch&quot;</li>
							<li>
								정책 설정:
								<ul style={{ marginTop: "0.25rem", marginLeft: "1rem" }}>
									<li>Policy name: &quot;Enable insert for all users&quot;</li>
									<li>Allowed operation: INSERT 선택</li>
									<li>Policy definition: &quot;true&quot; 입력</li>
								</ul>
							</li>
							<li>SELECT, UPDATE, DELETE 정책도 필요하면 추가 생성</li>
							<li>
								또는 개발 환경에서는 RLS를 비활성화: Table Editor → 테이블 선택 → 우측 상단
								&quot;Disable RLS&quot;
							</li>
						</ol>
						📖 자세한 내용: <code>docs/RLS_SETUP.md</code> 참고
					</li>
					<li>
						<strong>&quot;Could not find the &apos;name&apos; column&quot;</strong>: 테이블에 해당 컬럼이
						없습니다. Supabase Dashboard에서 테이블 구조를 확인하세요.
					</li>
					<li>
						<strong>&quot;does not exist&quot;</strong>: 테이블이 존재하지 않습니다. 먼저 테이블을
						생성하세요.
					</li>
					<li>
						테이블 구조에 맞는 데이터를 삽입해야 합니다. 테이블 구조는 Supabase Dashboard의 Table Editor에서
						확인할 수 있습니다.
					</li>
				</ul>
			</div>
		</main>
	);
}
