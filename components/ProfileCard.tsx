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

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '0.5px solid #d1dce8',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={photoUrl}
          alt={name}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: '0.5px solid #d1dce8',
          }}
        />
        <div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: 0 }}>
            {name}
          </p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>
            {title}
          </p>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
        📍 {location}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {conditions.map((condition) => (
          <span
            key={condition}
            style={{
              background: '#e8f0fa',
              color: '#1a3a5c',
              fontSize: '12px',
              padding: '3px 10px',
              borderRadius: '20px',
            }}
          >
            {condition}
          </span>
        ))}
      </div>

      <AvailabilityBadge range={availability} updatedAt={updatedAt} />

      <Button
        variant="secondary"
        size="sm"
        fullWidth
        onClick={() => {
          if (href) window.location.href = href
        }}
        style={{ marginTop: 'auto' }}
      >
        View profile
      </Button>
    </div>
  )
}
