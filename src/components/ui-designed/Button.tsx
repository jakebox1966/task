/**
 * Button 컴포넌트의 Props 타입 정의
 */
type Props = {
  children: React.ReactNode // 버튼 내부에 표시될 내용
  className?: string // 추가 CSS 클래스 (선택적)
  onClick?: () => void // 클릭 이벤트 핸들러 (선택적)
}

/**
 * 재사용 가능한 기본 버튼 컴포넌트
 *
 * 주요 기능:
 * - 기본 스타일링이 적용된 버튼
 * - 커스텀 클래스명 지원
 * - 클릭 이벤트 처리
 * - 반응형 디자인을 위한 transition 효과
 */
const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
