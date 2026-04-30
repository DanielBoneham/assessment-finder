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

      <div style={{ background: '#1a3a5c', padding: '3.5rem 0 4.5rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 500, lineHeight: 1.3, maxWidth: '600px', margin: '0 auto 1rem' }}>
            Find Private ADHD, Autism and Dyslexia Assessors Near You
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            See who has availability in the next few weeks. Compare assessors, check credentials, and get in touch directly.
          </p>
          <HeroSearch />

          {fastest && (
            <div style={{ marginTop: '1.75rem', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(74,222,128,0.15)', border: '0.5px solid rgba(74,222,128,0.4)', borderRadius: '10px', padding: '10px 20px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 500, margin: 0 }}>
                Fastest current UK availability: <span style={{ color: '#4ade80' }}>{fastest}</span>
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '28px', marginTop: '1.5rem' }}>
            {[
              { value: '10+', label: 'Assessors listed' },
              { value: 'Verified', label: 'Profiles reviewed before publication' },
              { value: 'Free', label: 'To search and contact' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ color: '#4ade80', fontSize: '20px', fontWeight: 500, margin: '0 0 2px' }}>{stat.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div style={{ background: '#fff', borderBottom: '0.5px solid #e5e7eb' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', padding: '14px 0' }}>
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

      <Section>
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { step: '1', title: 'Search by location', body: 'Enter your city and select the type of assessment you need.' },
              { step: '2', title: 'Compare availability', body: 'Assessors are sorted by fastest availability so you can see who can help you soonest.' },
              { step: '3', title: 'Contact directly', body: 'Send a message to the assessor and arrange your appointment.' },
            ].map((item) => (
              <div key={item.step} style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e8f0fa', color: '#1a3a5c', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  {item.step}
                </div>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>{item.title}</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {featured.length > 0 && (
        <Section style={{ paddingTop: 0 }}>
          <Container>
            <SectionLabel>Featured assessors</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {featured.map((assessor) => (
                <AssessorCard key={assessor.id} assessor={assessor} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {recentlyUpdated.length > 0 && (
        <Section style={{ paddingTop: 0 }}>
          <Container>
            <SectionLabel>Recently updated availability</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {recentlyUpdated.map((assessor) => (
                <AssessorCard key={assessor.id} assessor={assessor} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section style={{ paddingTop: 0 }}>
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
                <div style={{ background: '#fff', borderRadius: '10px', border: '0.5px solid #d1dce8', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', margin: 0 }}>{link.label}</p>
                  <span style={{ color: '#9ca3af', fontSize: '14px', flexShrink: 0 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
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

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: '0 0 6px' }}>Are you an assessor?</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
                List your practice for free and get discovered by people searching for assessments near them.
              </p>
            </div>
            <a href="/list-your-practice" style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '14px', fontWeight: 600, padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              List your practice
            </a>
          </div>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 500, margin: '0 0 1rem', color: '#111827' }}>
              ADHD, autism and dyslexia assessments in the UK
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              ADHD assessment waiting times in the UK can vary significantly depending on whether you go through the NHS or a private provider.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              NHS waiting times can often exceed 6 to 12 months in many areas. Private assessments are typically much faster, with availability ranging from a few weeks to a few months.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              Because availability differs between providers, many people choose to compare assessors to find those with shorter waiting times.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
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
    <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.25rem' }}>
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
  const photoUrl = `https://randomuser.me/api/portraits/${gender}/${seed}.jpg`

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
        <img src={photoUrl} alt={assessor.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '0.5px solid #d1dce8' }} />
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{assessor.name}</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>{assessor.professional_title}</p>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{assessor.location_city}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {assessor.conditions.map((c) => (
          <span key={c} style={{ background: '#e8f0fa', color: '#1a3a5c', fontSize: '11px', padding: '2px 8px', borderRadius: '20px' }}>{c}</span>
        ))}
      </div>
      <a href={`/assessor/${assessor.id}`} style={{ display: 'block', textAlign: 'center', background: '#f0f4f8', color: '#1a3a5c', fontSize: '13px', fontWeight: 500, padding: '8px', borderRadius: '8px', textDecoration: 'none', border: '0.5px solid #d1dce8' }}>
        View profile
      </a>
    </div>
  )
}