import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

const buttonVariants = {
  primary: 'bg-accent text-white',
  secondary: 'bg-white text-accent border border-accent',
}

const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button className={`${buttonVariants[variant]} text-[16px] font-medium rounded-full h-11 cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button