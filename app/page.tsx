import { getAssessors, AssessorWithAvailability, fastestAvailability } from '@/lib/api'
import { PageLayout, Container, Section } from '@/components/Layout'
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

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 60%, #1a3a5c 100%)', padding: '4rem 0 5rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '34px', fontWeight: 500, lineHeight: 1.3, maxWidth: '620px', margin: '0 auto 1rem', letterSpacing: '-0.3px' }}>
            Find Private ADHD, Autism and Dyslexia Assessors Near You
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', maxWidth: '500px', margin: '0 auto 2.25rem', lineHeight: 1.75 }}>
            See who has availability in the next few weeks. Compare assessors, check credentials, and get in touch directly.
          </p>
          <HeroSearch />

          {fastest && (
            <div style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(74,222,128,0.12)', border: '0.5px solid rgba(74,222,128,0.35)', borderRadius: '10px', padding: '10px 20px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 500, margin: 0 }}>
                Fastest current UK availability: <span style={{ color: '#4ade80' }}>{fastest}</span>
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px', marginTop: '2rem' }}>
            {[
              { value: '10+', label: 'Assessors listed' },
              { value: 'Verified', label: 'Profiles reviewed' },
              { value: 'Free', label: 'To search and contact' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ color: '#4ade80', fontSize: '22px', fontWeight: 600, margin: '0 0 3px' }}>{stat.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Trust bar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px', padding: '16px 0' }}>
            {[
              '✓ All profiles reviewed before publication',
              '✓ Registered with BPS, HCPC or GMC',
              '✓ Real availability shown',
              '✓ Contact assessors directly',
            ].map((item) => (
              <span key={item} style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{item}</span>
            ))}
          </div>
        </Container>
      </div>

      {/* How it works */}
      <Section style={{ background: 'linear-gradient(180deg, #f0f4f8 0%, #f8fafc 100%)', padding: '3.5rem 0' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 10px' }}>How it works</p>
            <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111827', margin: 0, letterSpacing: '-0.2px' }}>Find an assessor in three steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { step: '1', icon: '🔍', title: 'Search', body: 'Enter your location and choose the type of assessment you need.' },
              { step: '2', icon: '📅', title: 'Compare', body: 'See assessors sorted by fastest availability and compare credentials.' },
              { step: '3', icon: '✉️', title: 'Contact', body: 'Send a message directly to the assessor and arrange your appointment.' },
            ].map((item) => (
              <div key={item.step} style={{ background: '#fff', borderRadius: '14px', border: '0.5px solid #e5e7eb', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e8f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 2px' }}>Step {item.step}</p>
                    <p style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: 0 }}>{item.title}</p>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured assessors */}
      {featured.length > 0 && (
        <Section style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f0f4f8 100%)', padding: '3rem 0' }}>
          <Container>
            <SectionLabel>Featured assessors</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {featured.map((assessor) => (
                <AssessorCard key={assessor.id} assessor={assessor} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Recently updated */}
      {recentlyUpdated.length > 0 && (
        <Section style={{ background: 'linear-gradient(180deg, #f0f4f8 0%, #f8fafc 100%)', padding: '3rem 0' }}>
          <Container>
            <SectionLabel>Recently updated availability</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {recentlyUpdated.map((assessor) => (
                <AssessorCard key={assessor.id} assessor={assessor} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Popular searches */}
      <Section style={{ background: '#f8fafc', padding: '3rem 0' }}>
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
      </Section>

      {/* All assessors */}
      <Section style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f0f4f8 100%)', padding: '3rem 0' }}>
        <Container>
          <SectionLabel>All assessors — sorted by fastest availability</SectionLabel>
          {error && (
            <p style={{ color: '#991b1b', fontSize: '14px', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
              Could not load assessors. Please check your Supabase connection.
            </p>
          )}
          {!error && <AssessorGrid assessors={sorted} />}
        </Container>
      </Section>

      {/* For Assessors CTA */}
      <Section style={{ background: '#f0f4f8', padding: '3rem 0' }}>
        <Container>
          <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', borderRadius: '16px', padding: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', boxShadow: '0 4px 24px rgba(26,58,92,0.2)' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '20px', fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.2px' }}>Are you an assessor?</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: 0, lineHeight: 1.6 }}>
                List your practice for free and get discovered by people searching for assessments near them.
              </p>
            </div>
            <a href="/list-your-practice" style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(74,222,128,0.3)' }}>
              List your practice
            </a>
          </div>
        </Container>
      </Section>

      {/* SEO block */}
      <Section style={{ background: '#f0f4f8', paddingTop: 0, padding: '0 0 3rem' }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '14px', border: '0.5px solid #e5e7eb', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 1.25rem', color: '#111827', letterSpacing: '-0.2px' }}>
              ADHD, autism and dyslexia assessments in the UK
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.85, marginBottom: '0.85rem' }}>
              ADHD assessment waiting times in the UK can vary significantly depending on whether you go through the NHS or a private provider.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.85, marginBottom: '0.85rem' }}>
              NHS waiting times can often exceed 6 to 12 months in many areas. Private assessments are typically much faster, with availability ranging from a few weeks to a few months.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.85, marginBottom: '0.85rem' }}>
              Because availability differs between providers, many people choose to compare assessors to find those with shorter waiting times.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.85, margin: 0 }}>
              Assessment Finder helps you identify assessors with current availability, so you can access support sooner.
            </p>
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '1.5rem' }}>
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