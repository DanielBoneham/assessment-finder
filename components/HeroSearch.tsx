'use client'

import { useState } from 'react'

const CONDITIONS = ['ADHD', 'Autism', 'Dyslexia']

export function HeroSearch() {
  const [city, setCity] = useState('')
  const [condition, setCondition] = useState('')

  function handleSearch() {
    const grid = document.getElementById('assessor-grid')
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.dispatchEvent(new CustomEvent('hero-search', {
      detail: { city, condition }
    }))
  }

  return (
    <div>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, minWidth: '140px', height: '42px', border: '0.5px solid #d1d5db', borderRadius: '8px', padding: '0 12px', fontSize: '14px', fontFamily: 'inherit', color: '#111827' }}
        />
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={{ flex: 1, minWidth: '140px', height: '42px', border: '0.5px solid #d1d5db', borderRadius: '8px', padding: '0 12px', fontSize: '14px', fontFamily: 'inherit', background: '#fff', color: '#111827' }}
        >
          <option value="">Condition</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          style={{ height: '42px', padding: '0 20px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Find Assessors
        </button>
      </div>

      {/* Trust signals */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '1.25rem' }}>
        {[
          '50+ assessors across the UK',
          'Availability updated regularly',
          'Fastest availability: within 2 weeks',
        ].map((text) => (
          <span key={text} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#4ade80', fontWeight: 700 }}>✔</span> {text}
          </span>
        ))}
      </div>
    </div>
  )
}