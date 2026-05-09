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
    day: 'numeric', month: 'long', year: 'numeric',
  })
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
  const photoUrl = assessor.photo_url || getPhotoUrl(id, assessor.name)
  const firstName = assessor.name.split(' ').find((p) => !['dr', 'mr', 'mrs', 'ms'].includes(p.toLowerCase())) ?? assessor.name.split(' ')[0]
  const isDemo = (assessor as any).is_demo === true

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: assessor.name,
    jobTitle: assessor.professional_title,
    address: { '@type': 'PostalAddress', addressLocality: assessor.location_city, addressCountry: 'GB' },
    ...(assessor.governing_body ? { memberOf: { '@type': 'Organization', name: assessor.governing_body } } : {}),
    ...(assessor.bio ? { description: assessor.bio } : {}),
    ...(photoUrl ? { image: photoUrl } : {}),
  }

  return (
    <PageLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <img src={photoUrl} alt={assessor.name} style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: 0 }}>{assessor.name}</h1>
                  {isDemo && (
                    <span style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>
                      Demo
                    </span>
                  )}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: '0 0 12px' }}>{assessor.professional_title} · {assessor.location_city}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {assessor.is_verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(74,222,128,0.2)', color: '#4ade80', fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '20px', border: '0.5px solid rgba(74,222,128,0.4)' }}>
                      ✓ Verified practitioner
                    </span>
                  )}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 500, padding: '5px 12px', borderRadius: '20px' }}>
                    ✓ Profile reviewed
                  </span>
                  {assessor.governing_body && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 500, padding: '5px 12px', borderRadius: '20px' }}>
                      {assessor.governing_body} registered
                    </span>
                  )}
                </div>
              </div>
            </div>
            {av && (
              <div style={{ background: avColor.bg, border: `1px solid ${avColor.border}`, borderRadius: '12px', padding: '1.25rem 1.5rem', minWidth: '240px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: avColor.text, textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 8px', opacity: 0.7 }}>Current availability</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: avColor.dot, flexShrink: 0 }} />
                  <p style={{ fontSize: '17px', fontWeight: 700, color: avColor.text, margin: 0 }}>{avLabel}</p>
                </div>
                {nextDate && (
                  <p style={{ fontSize: '13px', color: avColor.text, margin: '0 0 4px', opacity: 0.85 }}>
                    Next available: <strong>{nextDate}</strong>
                  </p>
                )}
                <p style={{ fontSize: '12px', color: avColor.text, margin: 0, opacity: 0.6 }}>Last updated: {updatedAt}</p>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Quick summary bar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
            {[
              { label: 'Conditions', value: assessor.conditions.join(', ') || 'Not specified' },
              { label: 'Location', value: assessor.location_city },
              { label: 'Assessment types', value: assessor.assessment_types.join(', ') || 'Not specified' },
              { label: 'Availability', value: avLabel },
              ...(assessor.price_range ? [{ label: 'Price range', value: assessor.price_range }] : []),
            ].map((item, i, arr) => (
              <div key={item.label} style={{ padding: '14px 20px', borderRight: i < arr.length - 1 ? '0.5px solid #e5e7eb' : 'none' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 3px', fontWeight: 500 }}>{item.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '24px', alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Demo notice */}
              {isDemo && (
                <div style={{ background: '#f9fafb', borderRadius: '12px', border: '0.5px solid #e5e7eb', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px' }}>ℹ️</span>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                    This is a demo profile created to illustrate how Assessment Finder works. Contact details and availability are for demonstration purposes only.
                  </p>
                </div>
              )}

              {/* Verification */}
              <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', padding: '1.25rem 1.5rem', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>✓</div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#166534', margin: '0 0 4px' }}>
                    {assessor.is_verified ? 'Verified practitioner' : 'Profile reviewed before publication'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#166534', margin: 0, opacity: 0.85, lineHeight: 1.6 }}>
                    {assessor.is_verified
                      ? 'Identity and professional credentials have been checked by Assessment Finder. This assessor is registered with a recognised governing body.'
                      : 'This profile has been reviewed by the Assessment Finder team before being published on the directory.'}
                  </p>
                  {assessor.governing_body && assessor.registration_number && (
                    <p style={{ fontSize: '12px', color: '#166534', margin: '6px 0 0', opacity: 0.7 }}>
                      {assessor.governing_body} · Registration no. {assessor.registration_number}
                    </p>
                  )}
                </div>
              </div>

              {/* About */}
              {assessor.bio && (
                <Card title="About">
                  <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.85, margin: 0 }}>{assessor.bio}</p>
                </Card>
              )}

              {/* Why choose */}
              <Card title="Why choose this assessor">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    ...(assessor.is_verified ? [{ text: 'Verified credentials checked by Assessment Finder' }] : []),
                    ...(assessor.governing_body ? [{ text: `Registered with ${assessor.governing_body}` }] : []),
                    ...(avKey === 'within-2-weeks' || avKey === '2-4-weeks' ? [{ text: 'Short waiting time — appointments available soon' }] : []),
                    ...(assessor.assessment_types.includes('Remote') ? [{ text: 'Remote assessments available' }] : []),
                    ...(assessor.conditions.length > 1 ? [{ text: `Assesses multiple conditions: ${assessor.conditions.join(', ')}` }] : []),
                    { text: 'Real availability shown — updated regularly' },
                    { text: 'Contact directly — no referral needed' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e8f0fa', color: '#1a3a5c', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <p style={{ fontSize: '14px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </Card>

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
                    <Row label="Profile last updated" value={updatedAt} />
                    <Row label="Status" value={assessor.is_verified ? '✓ Fully verified' : 'Profile reviewed'} valueColor={assessor.is_verified ? '#166534' : '#6b7280'} />
                  </div>
                </Card>
              )}

            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {assessor.price_range && (
                <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 8px' }}>Price range</p>
                  <p style={{ fontSize: '28px', fontWeight: 500, color: '#1a3a5c', margin: '0 0 6px' }}>{assessor.price_range}</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Prices may vary. Always confirm directly.</p>
                </div>
              )}

              <div style={{ position: 'sticky', top: '1rem' }}>
                <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>Contact {firstName}</h2>
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
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Last updated: {updatedAt}</p>
          </div>
        )}
        <a href="#contact-form" style={{ background: '#1a3a5c', color: '#fff', fontSize: '14px', fontWeight: 500, padding: '11px 20px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
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