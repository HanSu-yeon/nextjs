"use client";

import { useState } from "react";

export default function TestPrismaPage() {
	const [result, setResult] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const handleFetch = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/users");
			const data = await response.json();
			setResult(data);
		} catch (error: any) {
			setResult({ success: false, error: error.message });
		} finally {
			setLoading(false);
		}
	};

	const handleInsert = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setResult(data);
		} catch (error: any) {
			setResult({ success: false, error: error.message });
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
			<h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Prisma 테스트</h1>

			<div
				style={{
					marginBottom: "2rem",
					padding: "1.5rem",
					backgroundColor: "#f5f5f5",
					borderRadius: "8px",
				}}
			>
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
						{loading ? "로딩..." : "데이터 추가"}
					</button>
				</div>
			</div>

			{result && (
				<div
					style={{
						padding: "1.5rem",
						backgroundColor: result.success ? "#d1fae5" : "#fee2e2",
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
		</main>
	);
}

