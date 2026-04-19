import { notFound } from 'next/navigation'
import { getAssessorById } from '@/lib/api'
import { PageLayout, Container, Section } from '@/components/Layout'
import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { ContactForm } from '@/components/ContactForm'

interface Props {
  params: Promise<{ id: string }>
}

const AVAILABILITY_LABELS: Record<string, string> = {
  'within-2-weeks': 'Within 2 weeks',
  '2-4-weeks':      '2 to 4 weeks',
  '1-3-months':     '1 to 3 months',
  '3-plus-months':  '3 or more months',
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
  const avLabel = av ? (AVAILABILITY_LABELS[av.availability_range] ?? av.availability_range) : null
  const updatedAt = formatUpdatedAt(av?.last_updated)
  const nextDate = av?.next_available_date ? formatDate(av.next_available_date) : null
  const photoUrl = getPhotoUrl(id)

  const isGreen = av?.availability_range === 'within-2-weeks' || av?.availability_range === '2-4-weeks'
  const avBg = isGreen ? '#dcfce7' : av?.availability_range === '1-3-months' ? '#fef3c7' : '#fee2e2'
  const avText = isGreen ? '#166534' : av?.availability_range === '1-3-months' ? '#92400e' : '#991b1b'
  const avDot = isGreen ? '#22c55e' : av?.availability_range === '1-3-months' ? '#f59e0b' : '#ef4444'

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
              <img src={photoUrl} alt={assessor.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
              <div>
                <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 500, margin: '0 0 4px' }}>
                  {assessor.name}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 0 8px' }}>
                  {assessor.professional_title} · {assessor.location_city}
                </p>
                {assessor.is_verified && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontSize: '12px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid rgba(74,222,128,0.3)' }}>
                    ✓ Verified practitioner
                  </span>
                )}
              </div>
            </div>

            {/* Availability panel */}
            {av && (
              <div style={{ background: avBg, borderRadius: '12px', padding: '1.25rem 1.5rem', minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: avDot, flexShrink: 0 }} />
                  <p style={{ fontSize: '16px', fontWeight: 700, color: avText, margin: 0 }}>
                    {avLabel}
                  </p>
                </div>
                {nextDate && (
                  <p style={{ fontSize: '13px', color: avText, margin: '0 0 4px', opacity: 0.85 }}>
                    Next available: <strong>{nextDate}</strong>
                  </p>
                )}
                <p style={{ fontSize: '12px', color: avText, margin: 0, opacity: 0.65 }}>
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
              <Card title="Quick summary">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { label: 'Conditions', value: assessor.conditions.join(', ') },
                    { label: 'Location', value: assessor.location_city },
                    { label: 'Availability', value: avLabel ?? 'Contact for details' },
                    { label: 'Assessment types', value: assessor.assessment_types.join(', ') },
                  ].map((item) => (
                    <div key={item.label} style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                      <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 4px', fontWeight: 500 }}>{item.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Bio */}
              {assessor.bio && (
                <Card title="About">
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
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
              <Card title="Credentials">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {assessor.governing_body && <Row label="Governing body" value={assessor.governing_body} />}
                  {assessor.registration_number && <Row label="Registration no." value={assessor.registration_number} />}
                  <Row
                    label="Verified"
                    value={assessor.is_verified ? '✓ Identity and credentials checked' : 'Not yet verified'}
                    valueColor={assessor.is_verified ? '#166534' : '#6b7280'}
                  />
                </div>
              </Card>

            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Price */}
              {assessor.price_range && (
                <Card title="Price range">
                  <p style={{ fontSize: '24px', fontWeight: 500, color: '#1a3a5c', margin: '0 0 6px' }}>
                    {assessor.price_range}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                    Prices may vary. Always confirm directly with the assessor.
                  </p>
                </Card>
              )}

              {/* Contact form — sticky */}
              <div style={{ position: 'sticky', top: '1rem' }}>
                <Card title={`Contact ${assessor.name.split(' ')[0]}`}>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 1rem', lineHeight: 1.5 }}>
                    Send a message to enquire about availability or to book an appointment.
                  </p>
                  <ContactForm assessorId={assessor.id} assessorName={assessor.name} />
                </Card>
              </div>

            </div>
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
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