export default function MethodologyBlock({ condition }: { condition?: string }) {
  return (
    <div style={{ background: '#f9fafb', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', margin: '1rem 0' }}>
      <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>
        About This Data
      </h3>
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
        Availability insights on Assessment Finder are based on currently listed provider data and
        recent availability updates submitted directly by assessors.
        {condition ? ` This includes ${condition} assessment providers across the UK.` : ''}{' '}
        Data is self-reported by providers and may change over time. Assessment Finder does not
        independently verify availability claims but does review profiles for completeness and
        consistency.
      </p>
    </div>
  )
}