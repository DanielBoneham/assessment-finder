import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { searchAssessors, fastestAvailability, AssessorWithAvailability } from '@/lib/api'
import { buildLocationMeta } from '@/lib/locationMeta'
import { PageLayout, Container, Section } from '@/components/Layout'
import { ProfileCard } from '@/components/ProfileCard'

interface Props {
  params: Promise<{ slug: string }>
}

function parseSlug(slug: string): { condition: string; city: string } | null {
  const parts = slug.split('-assessment-')
  if (parts.length !== 2) return null
  return { condition: parts[0], city: parts[1] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseSlug(slug)
  if (!parsed) return {}
  const meta = buildLocationMeta(parsed.condition, parsed.city)
  if (!meta) return {}
  return {
    title: meta.pageTitle,
    description: meta.metaDescription,
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const parsed = parseSlug(slug)
  if (!parsed) notFound()

  const meta = buildLocationMeta(parsed.condition, parsed.city)
  if (!meta) notFound()

  let assessors: AssessorWithAvailability[] = []
  try {
    assessors = await searchAssessors(meta.city, meta.conditionLabel)
  } catch {
    // show page with empty state rather than crashing
  }

  const fastest = assessors.length > 0 ? fastestAvailability(assessors) : null
  const count = assessors.length

  return (
    <PageLayout>

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 10px', lineHeight: 1.3 }}>
            {meta.h1}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', maxWidth: '560px', margin: 0 }}>
            {meta.intro}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '1.75rem' }}>
            <SummaryPill label="Assessors listed" value={count > 0 ? String(count) : 'None yet'} />
            {fastest && <SummaryPill label="Fastest availability" value={fastest} highlight />}
            <SummaryPill label="Location" value={meta.city} />
            <SummaryPill label="Condition" value={meta.conditionLabel} />
          </div>
        </Container>
      </div>

      {/* Assessor listing */}
      <Section>
        <Container>
          <SectionHeading>
            Available {meta.conditionLabel} assessors in {meta.city}
          </SectionHeading>
          <p style={{ fontSize: '15px', color: '#374151', marginBottom: '1.5rem' }}>
            {count === 0
              ? `No assessors are listed in ${meta.city} for ${meta.conditionLabel} yet.`
              : `There ${count === 1 ? 'is' : 'are'} ${count} ${meta.conditionLabel} assessor${count === 1 ? '' : 's'} in ${meta.city}.${fastest ? ` The fastest availability is ${fastest.toLowerCase()}.` : ''}`
            }
          </p>

          {count === 0 ? (
            <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1rem' }}>
                We do not have any {meta.conditionLabel} assessors listed in {meta.city} yet.
              </p>
              <a href="/list-your-practice" style={{ display: 'inline-block', background: '#1a3a5c', color: '#fff', fontSize: '14px', fontWeight: 500, padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
                List your practice
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {assessors.map((assessor) => (
                <ProfileCard
                  key={assessor.id}
                  id={assessor.id}
                  name={assessor.name}
                  title={assessor.professional_title}
                  location={assessor.location_city}
                  conditions={assessor.conditions}
                  availability={assessor.availability?.availability_range ?? '3-plus-months'}
                  updatedAt={formatUpdatedAt(assessor.availability?.last_updated)}
                  href={`/assessor/${assessor.id}`}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* What to expect */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <SectionHeading>
              What to expect from {meta.conditionLabel === 'ADHD' ? 'an' : 'a'} {meta.conditionLabel} assessment
            </SectionHeading>
            {meta.seoBody.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                {para}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* ADHD only extra section */}
      {meta.seoExtra && (
        <Section style={{ paddingTop: 0 }}>
          <Container>
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
              <SectionHeading>How to find an ADHD assessment near you</SectionHeading>
              {meta.seoExtra.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  {para}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Private vs NHS */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <SectionHeading>Private vs NHS assessments</SectionHeading>
            {[
              'There are two main routes to getting an ADHD, autism, or dyslexia assessment in the UK: through the NHS or through a private provider.',
              'NHS assessments are typically free at the point of access, but waiting times are often long due to high demand. In many areas, people may wait several months or longer for an appointment.',
              'Private assessments involve paying for the service, but they usually offer significantly shorter waiting times. Many providers can offer appointments within weeks rather than months.',
              'Private assessments may also provide more flexibility in scheduling and choice of clinician, including remote options.',
              'For many people, the decision comes down to urgency, budget, and availability.',
              'Assessment Finder allows you to compare private assessors and see who is currently available, helping you make a more informed decision.',
            ].map((para, i, arr) => (
              <p key={i} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: i < arr.length - 1 ? '0.75rem' : 0 }}>
                {para}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related links */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1rem' }}>
            Related searches
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {relatedLinks(meta.conditionLabel, meta.city).map((link) => (
              <a key={link.href} href={link.href} style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '20px', padding: '6px 14px', fontSize: '13px', color: '#1a3a5c', textDecoration: 'none' }}>
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
      {children}
    </h2>
  )
}

function SummaryPill({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ background: highlight ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.08)', border: `0.5px solid ${highlight ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.15)'}`, borderRadius: '10px', padding: '10px 16px' }}>
      <p style={{ fontSize: '11px', color: highlight ? '#4ade80' : 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 3px', fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ fontSize: '15px', fontWeight: 500, color: highlight ? '#4ade80' : '#fff', margin: 0 }}>
        {value}
      </p>
    </div>
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

const OTHER_CONDITIONS: Record<string, string[]> = {
  ADHD: ['Autism', 'Dyslexia'],
  Autism: ['ADHD', 'Dyslexia'],
  Dyslexia: ['ADHD', 'Autism'],
}

const CITIES = ['London', 'Manchester', 'Birmingham', 'Bristol', 'Leeds', 'Edinburgh']

function relatedLinks(condition: string, city: string) {
  const links: { label: string; href: string }[] = []
  CITIES.filter((c) => c !== city).slice(0, 3).forEach((c) => {
    links