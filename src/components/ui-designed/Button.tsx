type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
