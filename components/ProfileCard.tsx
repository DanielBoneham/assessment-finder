'use client'

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
  isDemo?: boolean
}

const FEMALE_FIRST_NAMES = ['sophie', 'lena', 'priya', 'amelia', 'rachel', 'sarah', 'daniella']

function getPhotoUrl(id: string, name: string): string {
  const first = name.split(' ')[0].toLowerCase().replace(/^(dr|mr|mrs|ms)\.?\s*/i, '')
  const isFemale = FEMALE_FIRST_NAMES.some((n) => first.includes(n))
  const gender = isFemale ? 'women' : 'men'
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const seed = (Math.abs(hash) % 40) + 1
  return `https://randomuser.me/api/portraits/${gender}/${seed}.jpg`
}

const AVAILABILITY_CONFIG: Record<AvailabilityRange, { label: string; bg: string; text: string; dot: string }> = {
  'within-2-weeks': { label: 'Available within 2 weeks', bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  '2-4-weeks':      { label: 'Available in 2 to 4 weeks', bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  '1-3-months':     { label: 'Available in 1 to 3 months', bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  '3-plus-months':  { label: 'Available in 3 or more months', bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
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
  isDemo = false,
}: ProfileCardProps) {
  const photoUrl = getPhotoUrl(id, name)
  const av = AVAILABILITY_CONFIG[availability]

  return (
    <div style={{ background: '#ffffff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>

      {/* Demo badge */}
      {isDemo && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#f3f4f6', color: '#9ca3af', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
          Demo
        </div>
      )}

      <div style={{ background: av.bg, borderRadius: '8px', padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: av.dot, flexShrink: 0 }} />
          <p style={{ fontSize: '15px', fontWeight: 700, color: av.text, margin: 0 }}>{av.label}</p>
        </div>
        <p style={{ fontSize: '12px', color: av.text, margin: '0 0 0 17px', opacity: 0.75 }}>Updated {updatedAt}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={photoUrl} alt={name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '0.5px solid #d1dce8' }} />
        <div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>{title}</p>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{location}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {conditions.map((condition) => (
          <span key={condition} style={{ background: '#e8f0fa', color: '#1a3a5c', fontSize: '12px', padding: '3px 10px', borderRadius: '20px' }}>
            {condition}
          </span>
        ))}
      </div>

      {href && (
        <a href={href} style={{ display: 'block', textAlign: 'center', background: '#f0f4f8', color: '#1a3a5c', fontSize: '13px', fontWeight: 500, padding: '8px', borderRadius: '8px', textDecoration: 'none', border: '0.5px solid #d1dce8', marginTop: 'auto' }}>
          View profile
        </a>
      )}
    </div>
  )
}