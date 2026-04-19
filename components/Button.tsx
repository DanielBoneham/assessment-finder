'use client'
import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
}

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: '#1a3a5c',
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    background: '#f0f4f8',
    color: '#1a3a5c',
    border: '0.5px solid #b8cee0',
  },
  ghost: {
    background: 'transparent',
    color: '#1a3a5c',
    border: '0.5px solid #b8cee0',
  },
}

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: '32px', padding: '0 12px', fontSize: '13px' },
  md: { height: '42px', padding: '0 20px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 24px', fontSize: '15px' },
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        fontWeight: 500,
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        transition: 'opacity 0.15s ease',
        fontFamily: 'inherit',
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.opacity = '0.85'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.opacity = '1'
      }}
      {...props}
    >
      {children}
    </button>
  )
}
