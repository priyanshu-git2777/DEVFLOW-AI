function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClasses =
    'rounded-xl px-5 py-3 font-semibold transition focus:outline-none focus:ring-4'

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500/30',
    secondary:
      'border border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-500/30',
    danger:
      'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500/30',
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button