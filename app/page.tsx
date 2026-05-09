import { getAssessors, AssessorWithAvailability, fastestAvailability } from '@/lib/api'
import { PageLayout, Container } from '@/components/Layout'
import { AssessorGrid } from '@/components/AssessorGrid'
import { HeroSearch } from '@/components/HeroSearch'

const AVAILABILITY_ORDER: Record<string, number> = {
  'within-2-weeks': 0,
  '2-4-weeks':      1,
  '1-3-months':     2,
  '3-plus-months':  3,
}

function sortByAvailability(assessors: AssessorWithAvailability[]): AssessorWithAvailability[] {
  return [...assessors].sort((a, b) => {
    const aO = AVAILABILITY_ORDER[a.availability?.availability_range ?? '3-plus-months'] ?? 3
    const bO = AVAILABILITY_ORDER[b.availability?.availability_range ?? '3-plus-months'] ?? 3
    return aO - bO
  })
}

function formatUpdatedAt(timestamp?: string | null): string {
  if (!timestamp) return 'recently'
  const diff = Date.now() - new Date(timestamp).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export default async function HomePage() {
  let assessors: AssessorWithAvailability[] = []
  let error = false

  try {
    assessors = await getAssessors()
  } catch (e) {
    error = true
  }

  const sorted = sortByAvailability(assessors)
  const fastest = assessors.length > 0 ? fastestAvailability(assessors) : null
  const featured = sorted.filter((a) => a.is_verified).slice(0, 3)
  const recentlyUpdated = [...assessors]
    .filter((a) => a.availability?.last_updated)
    .sort((a, b) => new Date(b.availability!.last_updated).getTime() - new Date(a.availability!.last_updated).getTime())
    .slice(0, 3)

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 60%, #1a3a5c 100%)', padding: '2.75rem 0 3rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 500, lineHeight: 1.3, maxWidth: '600px', margin: '0 auto 0.75rem', letterSpacing: '-0.3px' }}>
            Find Private ADHD, Autism and Dyslexia Assessors Near You
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '460px', margin: '0 auto 1.75rem', lineHeight: 1.65 }}>
            Compare assessors, check availability and contact providers directly.
          </p>
          <HeroSearch />

          {fastest && (
            <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(74,222,128,0.12)', border: '0.5px solid rgba(74,222,128,0.35)', borderRadius: '10px', padding: '9px 18px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: 0 }}>
                Fastest current UK availability: <span style={{ color: '#4ade80' }}>{fastest}</span>
              </p>
            </div>
          )}
        </Container>
      </div>

      {/* ── Trust strip ── */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', padding: '13px 0' }}>
            {[
              '✓ Profiles reviewed before publication',
              '✓ Registered with BPS, HCPC or GMC',
              '✓ Real availability shown',
              '✓ Contact assessors directly',
            ].map((item) => (
              <span key={item} style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{item}</span>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Featured assessors ── */}
      {featured.length > 0 && (
        <div style={{ background: '#f8fafc', padding: '2.5rem 0' }}>
          <Container>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <SectionLabel>Featured assessors</SectionLabel>
              <a href="#all-assessors" style={{ fontSize: '13px', color: '#1a3a5c', textDecoration: 'none', fontWeight: 500 }}>View all →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {featured.map((assessor) => (
                <AssessorCard key={assessor.id} assessor={assessor} />
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* ── Recently updated availability ── */}
      {recentlyUpdated.length > 0 && (
        <div style={{ background: '#f0f4f8', padding: '2.5rem 0' }}>
          <Container>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <SectionLabel>Recently updated availability</SectionLabel>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Updated by providers directly</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {recentlyUpdated.map((assessor) => (
                <AssessorCard key={assessor.id} assessor={assessor} />
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* ── Compact how it works strip ── */}
      <div style={{ background: '#fff', borderTop: '0.5px solid #e5e7eb', borderBottom: '0.5px solid #e5e7eb' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0', padding: '1.25rem 0' }}>
            {[
              { icon: '🔍', text: 'Search by location and condition' },
              { icon: '📅', text: 'Compare availability and credentials' },
              { icon: '✉️', text: 'Contact providers directly' },
            ].map((item, i, arr) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 28px', borderRight: i < arr.length - 1 ? '0.5px solid #e5e7eb' : 'none' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── All assessors ── */}
      <div id="all-assessors" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f0f4f8 100%)', padding: '2.5rem 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <SectionLabel>All assessors — sorted by fastest availability</SectionLabel>
          </div>
          {error && (
            <p style={{ color: '#991b1b', fontSize: '14px', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
              Could not load assessors. Please check your Supabase connection.
            </p>
          )}
          {!error && <AssessorGrid assessors={sorted} />}
        </Container>
      </div>

      {/* ── Popular searches ── */}
      <div style={{ background: '#f0f4f8', padding: '2.5rem 0' }}>
        <Container>
          <SectionLabel>Popular searches</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            {[
              { label: 'ADHD assessment London', href: '/adhd-assessment-london' },
              { label: 'ADHD assessment Manchester', href: '/adhd-assessment-manchester' },
              { label: 'ADHD assessment Birmingham', href: '/adhd-assessment-birmingham' },
              { label: 'Autism assessment London', href: '/autism-assessment-london' },
              { label: 'Autism assessment Manchester', href: '/autism-assessment-manchester' },
              { label: 'Dyslexia assessment London', href: '/dyslexia-assessment-london' },
              { label: 'Dyslexia assessment Bristol', href: '/dyslexia-assessment-bristol' },
              { label: 'ADHD assessment Leeds', href: '/adhd-assessment-leeds' },
              { label: 'Autism assessment Birmingham', href: '/autism-assessment-birmingham' },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: '10px', border: '0.5px solid #e5e7eb', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', margin: 0 }}>{link.label}</p>
                  <span style={{ color: '#9ca3af', fontSize: '14px', flexShrink: 0 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* ── For assessors CTA ── */}
      <div style={{ background: '#f0f4f8', padding: '0 0 2.5rem' }}>
        <Container>
          <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', borderRadius: '16px', padding: '2.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', boxShadow: '0 4px 24px rgba(26,58,92,0.2)' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '19px', fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.2px' }}>Are you an assessor?</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
                List your practice and get discovered by people searching for assessments near them.
              </p>
            </div>
            <a href="/list-your-practice" style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '14px', fontWeight: 600, padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(74,222,128,0.3)' }}>
              List your practice
            </a>
          </div>
        </Container>
      </div>

      {/* ── SEO / GEO block ── */}
      <div style={{ background: '#f0f4f8', padding: '0 0 3rem' }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '14px', border: '0.5px solid #e5e7eb', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 500, margin: '0 0 1rem', color: '#111827', letterSpacing: '-0.2px' }}>
              ADHD, autism and dyslexia assessments in the UK
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              NHS waiting times for ADHD, autism and dyslexia assessments can exceed 12 months in many areas. Private assessments are typically faster, with availability ranging from a few weeks to a few months depending on the provider.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
              Assessment Finder helps you identify providers with current availability across the UK, so you can access support sooner. All profiles are reviewed before publication.{' '}
              <a href="/editorial-standards" style={{ color: '#1a3a5c', fontWeight: 500 }}>Editorial standards →</a>
            </p>
          </div>
        </Container>
      </div>

    </PageLayout>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>
      {children}
    </p>
  )
}

function AssessorCard({ assessor }: { assessor: AssessorWithAvailability }) {
  const av = assessor.availability
  const avKey = av?.availability_range ?? '3-plus-months'
  const isGreen = avKey === 'within-2-weeks' || avKey === '2-4-weeks'
  const bg = isGreen ? '#dcfce7' : avKey === '1-3-months' ? '#fef3c7' : '#fee2e2'
  const text = isGreen ? '#166534' : avKey === '1-3-months' ? '#92400e' : '#991b1b'
  const dot = isGreen ? '#22c55e' : avKey === '1-3-months' ? '#f59e0b' : '#ef4444'
  const labels: Record<string, string> = {
    'within-2-weeks': 'Within 2 weeks',
    '2-4-weeks': '2 to 4 weeks',
    '1-3-months': '1 to 3 months',
    '3-plus-months': '3 or more months',
  }

  function idToSeed(id: string): number {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i)
      hash |= 0
    }
    return Math.abs(hash) % 70 + 1
  }

  const seed = idToSeed(assessor.id)
  const gender = seed % 2 === 0 ? 'women' : 'men'
  const photoUrl = assessor.photo_url || `https://randomuser.me/api/portraits/${gender}/${seed}.jpg`

  return (
    <div style={{ background: '#fff', borderRadius: '14px', border: '0.5px solid #e5e7eb', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ background: bg, borderRadius: '8px', padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
          <p style={{ fontSize: '13px', fontWeight: 700, color: text, margin: 0 }}>{labels[avKey]}</p>
        </div>
        <p style={{ fontSize: '11px', color: text, margin: '0 0 0 15px', opacity: 0.75 }}>
          Updated {formatUpdatedAt(av?.last_updated)}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={photoUrl} alt={assessor.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '0.5px solid #e5e7eb' }} />
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{assessor.name}</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>{assessor.professional_title}</p>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{assessor.location_city}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {assessor.conditions.map((c) => (
          <span key={c} style={{ background: '#e8f0fa', color: '#1a3a5c', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 500 }}>{c}</span>
        ))}
      </div>
      <a href={`/assessor/${assessor.id}`} style={{ display: 'block', textAlign: 'center', background: '#f0f4f8', color: '#1a3a5c', fontSize: '13px', fontWeight: 500, padding: '9px', borderRadius: '8px', textDecoration: 'none', border: '0.5px solid #e5e7eb', marginTop: 'auto' }}>
        View profile
      </a>
    </div>
  )
}