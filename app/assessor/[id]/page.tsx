import { notFound } from 'next/navigation'
import { getAssessorById } from '@/lib/api'
import { PageLayout, Container, Section } from '@/components/Layout'
import { ContactForm } from '@/components/ContactForm'

interface Props {
  params: Promise<{ id: string }>
}

const AVAILABILITY_LABELS: Record<string, string> = {
  'within-2-weeks': 'Available within 2 weeks',
  '2-4-weeks':      'Available in 2 to 4 weeks',
  '1-3-months':     'Available in 1 to 3 months',
  '3-plus-months':  'Available in 3 or more months',
}

const AVAILABILITY_COLORS: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  'within-2-weeks': { bg: '#dcfce7', text: '#166534', dot: '#22c55e', border: '#86efac' },
  '2-4-weeks':      { bg: '#dcfce7', text: '#166534', dot: '#22c55e', border: '#86efac' },
  '1-3-months':     { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b', border: '#fcd34d' },
  '3-plus-months':  { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444', border: '#fca5a5' },
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

export default async function AssessorProfilePage({ params }: Props) {
  const { id } = await params
  const assessor = await getAssessorById(id)
  if (!assessor) notFound()

  const av = assessor.availability
  const avKey = av?.availability_range ?? '3-plus-months'
  const avLabel = AVAILABILITY_LABELS[avKey]
  const avColor = AVAILABILITY_COLORS[avKey]
  const updatedAt = formatUpdatedAt(av?.last_updated)
  const nextDate = av?.next_available_date ? formatDate(av.next_available_date) : null
  const photoUrl = getPhotoUrl(id)
  const firstName = assessor.name.split(' ')[0]

  return (
    <PageLayout>

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>

            {/* Name + photo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={photoUrl} alt={assessor.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
              <div>
                <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 500, margin: '0 0 4px' }}>
                  {assessor.name}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: '0 0 10px' }}>
                  {assessor.professional_title} · {assessor.location_city}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {assessor.is_verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(74,222,128,0.2)', color: '#4ade80', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', border: '0.5px solid rgba(74,222,128,0.4)' }}>
                      ✓ Verified practitioner
                    </span>
                  )}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px' }}>
                    ✓ Profile reviewed
                  </span>
                </div>
              </div>
            </div>

            {/* Availability panel */}
            {av && (
              <div style={{ background: avColor.bg, border: `1px solid ${avColor.border}`, borderRadius: '12px', padding: '1.25rem 1.5rem', minWidth: '240px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: avColor.text, textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 8px', opacity: 0.7 }}>
                  Current availability
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: avColor.dot, flexShrink: 0 }} />
                  <p style={{ fontSize: '17px', fontWeight: 700, color: avColor.text, margin: 0 }}>
                    {avLabel}
                  </p>
                </div>
                {nextDate && (
                  <p style={{ fontSize: '13px', color: avColor.text, margin: '0 0 4px', opacity: 0.85 }}>
                    Next available: <strong>{nextDate}</strong>
                  </p>
                )}
                <p style={{ fontSize: '12px', color: avColor.text, margin: 0, opacity: 0.6 }}>
                  Updated {updatedAt}
                </p>
              </div>
            )}

          </div>
        </Container>
      </div>

      {/* Body */}
      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '24px', alignItems: 'start' }}>

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Quick summary */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
                  Quick summary
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { label: 'Conditions', value: assessor.conditions.join(', ') || 'Not specified' },
                    { label: 'Location', value: assessor.location_city },
                    { label: 'Availability', value: avLabel ?? 'Contact for details' },
                    { label: 'Assessment types', value: assessor.assessment_types.join(', ') || 'Not specified' },
                    ...(assessor.price_range ? [{ label: 'Price range', value: assessor.price_range }] : []),
                    ...(assessor.governing_body ? [{ label: 'Governing body', value: assessor.governing_body }] : []),
                  ].map((item) => (
                    <div key={item.label} style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                      <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 4px', fontWeight: 500 }}>{item.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification */}
              <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', padding: '1.25rem 1.5rem', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>
                  ✓
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#166534', margin: '0 0 4px' }}>
                    {assessor.is_verified ? 'Verified practitioner' : 'Profile reviewed before publication'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#166534', margin: 0, opacity: 0.85, lineHeight: 1.5 }}>
                    {assessor.is_verified
                      ? 'Identity and professional credentials have been checked by Assessment Finder. This assessor is registered with a recognised governing body.'
                      : 'This profile has been reviewed by the Assessment Finder team before being published on the directory.'}
                  </p>
                </div>
              </div>

              {/* Bio */}
              {assessor.bio && (
                <Card title="About">
                  <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, margin: 0 }}>
                    {assessor.bio}
                  </p>
                </Card>
              )}

              {/* Assessment details */}
              <Card title="Assessment details">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {assessor.conditions.map((c) => <Tag key={c} label={c} />)}
                  {assessor.assessment_types.map((t) => <Tag key={t} label={t} color="blue" />)}
                </div>
              </Card>

              {/* Credentials */}
              {(assessor.governing_body || assessor.registration_number) && (
                <Card title="Credentials">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {assessor.governing_body && <Row label="Governing body" value={assessor.governing_body} />}
                    {assessor.registration_number && <Row label="Registration no." value={assessor.registration_number} />}
                  </div>
                </Card>
              )}

            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {assessor.price_range && (
                <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 8px' }}>Price range</p>
                  <p style={{ fontSize: '26px', fontWeight: 500, color: '#1a3a5c', margin: '0 0 6px' }}>
                    {assessor.price_range}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                    Prices may vary. Always confirm directly.
                  </p>
                </div>
              )}

              {/* Sticky contact form */}
              <div style={{ position: 'sticky', top: '1rem' }}>
                <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>
                    Contact {firstName}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                    Send a message to enquire about availability or to arrange an appointment.
                  </p>
                  <ContactForm assessorId={assessor.id} assessorName={assessor.name} />
                </div>
              </div>

            </div>
          </div>
        </Container>
      </Section>

      {/* Mobile sticky CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '0.5px solid #d1dce8', padding: '12px 1.5rem', display: 'flex', gap: '12px', alignItems: 'center', zIndex: 50 }}>
        {av && (
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: avColor.text, margin: 0 }}>{avLabel}</p>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Updated {updatedAt}</p>
          </div>
        )}
        
          href="#contact-form"
          style={{ background: '#1a3a5c', color: '#fff', fontSize: '14px', fontWeight: 500, padding: '11px 20px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Contact assessor
        </a>
      </div>

      <div style={{ height: '64px' }} />

    </PageLayout>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function Row({ label, value, valueColor = '#111827' }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #f3f4f6', paddingBottom: '10px', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: '#9ca3af', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 500, color: valueColor, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function Tag({ label, color = 'navy' }: { label: string; color?: 'navy' | 'blue' }) {
  const styles = {
    navy: { background: '#e8f0fa', color: '#1a3a5c' },
    blue: { background: '#eff6ff', color: '#1d4ed8' },
  }
  return (
    <span style={{ ...styles[color], fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: 500 }}>
      {label}
    </span>
  )
}

function formatUpdatedAt(timestamp?: string | null): string {
  if (!timestamp) return 'recently'
  const diff = Date.now() - new Date(timestamp).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}