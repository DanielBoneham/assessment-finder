import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  maxWidth?: string
  style?: React.CSSProperties
}

export function Container({ children, maxWidth = '860px', style }: ContainerProps) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding: '0 1.5rem', width: '100%', ...style }}>
      {children}
    </div>
  )
}

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', fontFamily: 'inherit' }}>
      <nav style={{ background: '#1a3a5c', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '17px', fontWeight: 500, color: '#fff', letterSpacing: '-0.3px' }}>
            Assessment<span style={{ color: '#4ade80' }}>Finder</span>
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="/" style={navLink}>Find Assessments</a>
          <a href="/locations" style={navLink}>Locations</a>
          <a href="/articles" style={navLink}>Articles</a>
          
            href="/list-your-practice"
            style={{
              color: '#1a3a5c',
              background: '#4ade80',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: '8px',
            }}
          >
            For Assessors
          </a>
        </div>

      </nav>
      <main>{children}</main>
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  style?: React.CSSProperties
}

export function Section({ children, style }: SectionProps) {
  return (
    <section style={{ padding: '2.5rem 0', ...style }}>
      {children}
    </section>
  )
}

const navLink: React.CSSProperties = {
  color: 'rgba(255,255,255,0.75)',
  fontSize: '14px',
  textDecoration: 'none',
}