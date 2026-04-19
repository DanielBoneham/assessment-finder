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
  href?: string // link to profile page
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
      {/* Name + title */}
      <div>
        <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: 0 }}>
          {name}
        </p>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>
          {title}
        </p>
      </div>

      {/* Location */}
      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
        📍 {location}
      </p>

      {/* Condition tags */}
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

      {/* Availability */}
      <AvailabilityBadge range={availability} updatedAt={updatedAt} />

      {/* CTA */}
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
