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

      {/* How it works steps */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px', marginTop: '1.5rem' }}>
        {[
          { num: '1', text: 'Search by location and condition' },
          { num: '2', text: 'See who is available sooner' },
          { num: '3', text: 'Contact assessors directly' },
        ].map((step) => (
          <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {step.num}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>
              {step.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}