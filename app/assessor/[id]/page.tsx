import { notFound } from 'next/navigation'
import { getAssessorById } from '@/lib/api'
import { PageLayout, Container, Section } from '@/components/Layout'
import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { ContactForm } from '@/components/ContactForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AssessorProfilePage({ params }: Props) {
  const { id } = await params
  const assessor = await getAssessorById(id)
  if (!assessor) notFound()

  const av = assessor.availability
  const updatedAt = formatUpdatedAt(av?.last_updated)
  const nextDate = av?.next_available_date ? formatDate(av.next_available_date) : null

  return (
    <PageLayout>
      <div style={{ background: '#1a3a5c', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            ← Back to all assessors
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 4px' }}>
                {assessor.name}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: '0 0 10px' }}>
                {assessor.professional_title} · 📍 {assessor.location_city}
              </p>
              {assessor.is_verified && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontSize: '12px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid rgba(74,222,128,0.3)' }}>
                  ✓ Verified practitioner
                </span>
              )}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem 1.5rem', minWidth: '200px' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>
                Availability
              </p>
              {av ? (
                <>
                  <AvailabilityBadge range={av.availability_range} />
                  {nextDate && (
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '8px 0 0' }}>
                      Next available: <strong style={{ color: '#fff' }}>{nextDate}</strong>
                    </p>
                  )}
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '6px 0 0' }}>
                    Updated {updatedAt}
                  </p>
                </>
              ) : (
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Not yet updated</p>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '24px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Card title="Quick summary">
                <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <SummaryItem label="Conditions" value={assessor.conditions.join(', ')} />
                  <SummaryItem label="Location" value={assessor.location_city} />
                  <SummaryItem label="Assessment types" value={assessor.assessment_types.join(', ')} />
                  {assessor.price_range && <SummaryItem label="Price range" value={assessor.price_range} />}
                </ul>
              </Card>
              {assessor.bio && (
                <Card title="About">
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>{assessor.bio}</p>
                </Card>
              )}
              <Card title="Assessment details">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {assessor.conditions.map((c) => <Tag key={c} label={c} />)}
                  {assessor.assessment_types.map((t) => <Tag key={t} label={t} color="blue" />)}
                </div>
              </Card>
              <Card title="Credentials">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {assessor.governing_body && <Row label="Governing body" value={assessor.governing_body} />}
                  {assessor.registration_number && <Row label="Registration no." value={assessor.registration_number} />}
                  <Row label="Verified" value={assessor.is_verified ? '✓ Yes — identity and credentials checked' : 'Not yet verified'} valueColor={assessor.is_verified ? '#166534' : '#6b7280'} />
                </div>
              </Card>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {assessor.price_range && (
                <Card title="Price range">
                  <p style={{ fontSize: '22px', fontWeight: 500, color: '#1a3a5c', margin: '0 0 6px' }}>{assessor.price_range}</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Prices are set by the assessor and may vary.</p>
                </Card>
              )}
              <div style={{ position: 'sticky', top: '1rem' }}>
                <Card title={`Contact ${assessor.name.split(' ')[0]}`}>
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
      <h2 style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 1rem' }}>{title}</h2>
      {children}
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <li style={{ fontSize: '14px', color: '#374151' }}>
      <span style={{ color: '#9ca3af' }}>{label}:</span>{' '}
      <span style={{ fontWeight: 500 }}>{value}</span>
    </li>
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
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}