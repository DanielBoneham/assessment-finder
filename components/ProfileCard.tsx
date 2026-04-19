'use client'

import { AvailabilityBadge } from './AvailabilityBadge'
import { Button } from './Button'

type AvailabilityRange =
  | 'within-2-weeks'
  | '2-4-weeks'
  | '1-3-months'
  | '3-plus-months'

interface ProfileCardProps {
  id: string
  name: string
  title: string
  location: string
  conditions: string[]
  availability: AvailabilityRange
  updatedAt: string
  href?: string
}

function idToSeed(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % 70 + 1
}

function getPhotoUrl(id: string): string {
  const seed = idToSeed(id)
  const gender = seed % 2 === 0 ? 'women' : 'men'
  return `https://randomuser.me/api/portraits/${gender}/${seed}.jpg`
}

const AVAILABILITY_COLORS: Record<AvailabilityRange, { bg: string; text: string; dot: string }> = {
  'within-2-weeks': { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  '2-4-weeks':      { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  '1-3-months':     { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  '3-plus-months':  { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
}

const AVAILABILITY_LABELS: Record<AvailabilityRange, string> = {
  'within-2-weeks': 'Within 2 weeks',
  '2-4-weeks':      '2–4 weeks',
  '1-3-months':     '1–3 months',
  '3-plus-months':  '3+ months',
}

export function ProfileCard({
  id,
  name,
  title,
  location,
  conditions,
  availability,
  updatedAt,
  href,
}: ProfileCardProps) {
  const photoUrl = getPhotoUrl(id)
  const avColor = AVAILABILITY_COLORS[availability]
  const avLabel = AVAILABILITY_LABELS[availability]

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '0.5px solid #d1dce8',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Photo + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={photoUrl}
          alt={name}
          style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '0.5px solid #d1dce8' }}
        />
        <div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>{title}</p>
        </div>
      </div>

      {/* Availability — prominent */}
      <div style={{ background: avColor.bg, borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '8px', height: '8px