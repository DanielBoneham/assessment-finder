export default function EditorialAttribution({ lastUpdated = '7 May 2025' }: { lastUpdated?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderTop: '0.5px solid #e5e7eb', paddingTop: '1rem', marginTop: '1.5rem' }}>
      <svg style={{ width: '14px', height: '14px', flexShrink: 0, color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span style={{ fontSize: '12px', color: '#9ca3af' }}>
        Reviewed by the Assessment Finder editorial team · Last updated {lastUpdated}
      </span>
    </div>
  )
}