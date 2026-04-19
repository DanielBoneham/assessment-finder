'use client'

import { ReactNode, useState } from 'react'

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
  const [locationsOpen, setLocationsOpen] = useState(false)

  const locations = [
    { label: 'London', href: '/adhd-assessment-london' },
    { label: 'Manchester', href: '/adhd-assessment-manchester' },
    { label: 'Birmingham', href: '/adhd-assessment-birmingham' },
  ]

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', fontFamily: 'inherit' }}>
      <nav style={{ background: '#1a3a5c', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 100 }}>

        <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontSize: '17px', fontWeight: 500, color: '#fff', letterSpacing: '-0.3px' }}>
            Assessment<span style={{ color: '#4ade80' }}>Finder</span>
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="/" style={navLink}>Find Assessments</a>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, fontFamily: 'inherit', color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}
            >
              Locations <span style={{ fontSize: '10px' }}>▼</span>
            </button>

            {locationsOpen && (
              <div style={{ position: 'absolute', top: '32px', left: '50%', transform: 'translateX(-50%)', background: '#fff', borderRadius: '10px', border: '0.5px solid #d1dce8', padding: '8px', minWidth: '200px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                {locations.map((loc) => (
                  <a key={loc.href} href={loc.href} style={{ display: 'block', padding: '8px 12px', fontSize: '14px', color: '#1a3a5c', textDecoration: 'none', borderRadius: '6px' }} onClick={() => setLocationsOpen(false)}>
                    ADHD assessment {loc.label}
                  </a>
                ))}
                <div style={{ borderTop: '0.5px solid #e5e7eb', margin: '6px 0' }} />
                <a href="/locations" style={{ display: 'block', padding: '8px 12px', fontSize: '13px', color: '#6b7280', textDecoration: 'none', borderRadius: '6px' }} onClick={() => setLocationsOpen(false)}>
                  View all locations →
                </a>
              </div>
            )}
          </div>

          <a href="/articles" style={navLink}>Articles</a>

          <a href="/list-your-practice" style={{ color: '#1a3a5c', background: '#4ade80', fontSize: '13px', fontWeight: 500, textDecoration: 'none', padding: '7px 14px', borderRadius: '8px' }}>
            For Assessors
          </a>
        </div>
      </nav>

      {locationsOpen && (
        <div onClick={() => setLocationsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
      )}

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