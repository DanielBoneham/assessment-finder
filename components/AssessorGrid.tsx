'use client'

import { useState, useMemo } from 'react'
import { AssessorWithAvailability } from '@/lib/api'
import { ProfileCard } from '@/components/ProfileCard'

interface AssessorGridProps {
  assessors: AssessorWithAvailability[]
}

const CONDITIONS = ['ADHD', 'Autism', 'Dyslexia']

function formatUpdatedAt(timestamp?: string | null): string {
  if (!timestamp) return 'recently'
  const diff = Date.now() - new Date(timestamp).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export function AssessorGrid({ assessors }: AssessorGridProps) {
  const [city, setCity]           = useState('')
  const [condition, setCondition] = useState('')

  // Unique cities from data, sorted
  const cities = useMemo(
    () => [...new Set(assessors.map((a) => a.location_city))].sort(),
    [assessors]
  )

  // Filter entirely in-memory — no extra network request
  const filtered = useMemo(() => {
    return assessors.filter((a) => {
      const matchCity      = !city      || a.location_city === city
      const matchCondition = !condition || a.conditions.includes(condition)
      return matchCity && matchCondition
    })
  }, [assessors, city, condition])

  const hasFilters = city || condition

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.5rem', alignItems: 'center' }}>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={selectStyle}
        >
          <option value="">All locations</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={selectStyle}
        >
          <option value="">All conditions</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setCity(''); setCondition('') }}
            style={clearStyle}
          >
            Clear filters
          </button>
        )}

        <span style={{ fontSize: '13px', color: '#6b7280', marginLeft: 'auto' }}>
          {filtered.length} of {assessors.length} assessors
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '2.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            No assessors match your filters.{' '}
            <button
              onClick={() => { setCity(''); setCondition('') }}
              style={{ background: 'none', border: 'none', color: '#1a3a5c', fontWeight: 500, cursor: 'pointer', padding: 0, fontSize: '14px' }}
            >
              Clear filters
            </button>
          </p>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {filtered.map((assessor) => (
            <ProfileCard
              key={assessor.id}
              id={assessor.id}
              name={assessor.name}
              title={assessor.professional_title}
              location={assessor.location_city}
              conditions={assessor.conditions}
              availability={assessor.availability?.availability_range ?? '3-plus-months'}
              updatedAt={formatUpdatedAt(assessor.availability?.last_updated)}
              href={`/assessor/${assessor.id}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  height: '38px',
  border: '0.5px solid #d1d5db',
  borderRadius: '8px',
  padding: '0 12px',
  fontSize: '14px',
  fontFamily: 'inherit',
  background: '#fff',
  color: '#111827',
  cursor: 'pointer',
  minWidth: '150px',
}

const clearStyle: React.CSSProperties = {
  height: '38px',
  padding: '0 14px',
  background: 'none',
  border: '0.5px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#6b7280',
  cursor: 'pointer',
  fontFamily: 'inherit',
}
