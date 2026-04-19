import { ReactNode } from 'react'

// ─── Container ───────────────────────────────────────────────────────────────
// Centres content and caps max-width. Use inside every page section.

interface ContainerProps {
  children: ReactNode
  maxWidth?: string
  style?: React.CSSProperties
}

export function Container({
  children,
  maxWidth = '860px',
  style,
}: ContainerProps) {
  return (
    <div
      style={{
        maxWidth,
        margin: '0 auto',
        padding: '0 1.5rem',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── PageLayout ───────────────────────────────────────────────────────────────
// Top-level wrapper: nav + main content. Wrap every page with this.

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', fontFamily: 'inherit' }}>
      <nav
        style={{
          background: '#1a3a5c',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        <a
          href="/"
          style={{ textDecoration: 'none', fontSize: '17px', fontWeight: 500, color: '#fff', letterSpacing: '-0.3px' }}
        >
          assessment<span style={{ color: '#4ade80' }}>finder</span>
        </a>
        <a
          href="/list-your-practice"
          style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', textDecoration: 'none' }}
        >
          List your practice
        </a>
      </nav>
      <main>{children}</main>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
// Adds consistent vertical padding between page sections.

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
