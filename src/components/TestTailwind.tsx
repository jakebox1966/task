import React from 'react'

/**
 * TailwindCSS 클래스 정렬 테스트용 컴포넌트
 *
 * 주요 기능:
 * - TailwindCSS 클래스들이 올바르게 정렬되는지 확인
 * - 다양한 TailwindCSS 기능들을 테스트
 * - 개발 및 디버깅 목적으로 사용
 */
const TestTailwind: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-red-500 p-4 text-white shadow-md transition-colors duration-200 hover:bg-red-600">
      <h1 className="text-2xl font-bold">TailwindCSS 클래스 정렬 테스트</h1>
    </div>
  )
}

export default TestTailwind
