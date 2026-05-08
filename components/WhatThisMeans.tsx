import { ReactNode } from 'react'

export default function WhatThisMeans({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #60a5fa', background: '#eff6ff', padding: '1rem 1.25rem', margin: '1rem 0', borderRadius: '0 8px 8px 0' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
        What This Means
      </p>
      <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, margin: 0 }}>
        {children}
      </p>
    </div>
  )
}