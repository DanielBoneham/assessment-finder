type AvailabilityRange =
  | 'within-2-weeks'
  | '2-4-weeks'
  | '1-3-months'
  | '3-plus-months'

interface AvailabilityBadgeProps {
  range: AvailabilityRange
  updatedAt?: string // e.g. "2 days ago"
}

const AVAILABILITY_CONFIG: Record<
  AvailabilityRange,
  { label: string; color: 'green' | 'amber' | 'red' }
> = {
  'within-2-weeks': { label: 'Within 2 weeks', color: 'green' },
  '2-4-weeks':      { label: 'Available in 2–4 weeks', color: 'green' },
  '1-3-months':     { label: '1–3 months', color: 'amber' },
  '3-plus-months':  { label: '3+ months', color: 'red' },
}

const COLOR_STYLES = {
  green: { background: '#dcfce7', color: '#166534', dot: '#22c55e' },
  amber: { background: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  red:   { background: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
}

export function AvailabilityBadge({ range, updatedAt }: AvailabilityBadgeProps) {
  const config = AVAILABILITY_CONFIG[range]
  const styles = COLOR_STYLES[config.color]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 500,
          background: styles.background,
          color: styles.color,
          width: 'fit-content',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: styles.dot,
            flexShrink: 0,
          }}
        />
        {config.label}
      </span>
      {updatedAt && (
        <span style={{ fontSize: '11px', color: '#6b7280' }}>
          Updated {updatedAt}
        </span>
      )}
    </div>
  )
}
