import { Outlet } from 'react-router-dom'

/**
 * 애플리케이션의 기본 레이아웃 컴포넌트
 *
 * 주요 기능:
 * - React Router의 Outlet을 통해 중첩 라우트 렌더링
 * - 전체 화면 높이를 사용하는 중앙 정렬 레이아웃
 * - 모든 페이지에 공통으로 적용되는 스타일링
 */
export default function Layout() {
  return (
    <main className="flex h-screen w-full items-center justify-center p-5 text-[#333333]">
      <Outlet />
    </main>
  )
}
