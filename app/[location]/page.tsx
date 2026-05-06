import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { searchAssessors, fastestAvailability, AssessorWithAvailability } from '@/lib/api'
import { buildLocationMeta } from '@/lib/locationMeta'
import { PageLayout, Container, Section } from '@/components/Layout'
import { ProfileCard } from '@/components/ProfileCard'

interface Props {
  params: Promise<{ location: string }>
}

const AVAILABILITY_ORDER: Record<string, number> = {
  'within-2-weeks': 0,
  '2-4-weeks':      1,
  '1-3-months':     2,
  '3-plus-months':  3,
}

const AVAILABILITY_LABELS: Record<string, string> = {
  'within-2-weeks': 'Within 2 weeks',
  '2-4-weeks':      '2 to 4 weeks',
  '1-3-months':     '1 to 3 months',
  '3-plus-months':  '3 or more months',
}

function sortByAvailability(assessors: AssessorWithAvailability[]): AssessorWithAvailability[] {
  return [...assessors].sort((a, b) => {
    const aO = AVAILABILITY_ORDER[a.availability?.availability_range ?? '3-plus-months'] ?? 3
    const bO = AVAILABILITY_ORDER[b.availability?.availability_range ?? '3-plus-months'] ?? 3
    return aO - bO
  })
}

function parseSlug(slug: string): { condition: string; city: string } | null {
  const BLOCKED = ['assessor', 'articles', 'dashboard', 'login', 'locations', 'list-your-practice', 'update-password', 'adhd-assessment-uk', 'autism-assessment-uk', 'dyslexia-assessment-uk']
  if (BLOCKED.some((b) => slug.startsWith(b))) return null
  const parts = slug.split('-assessment-')
  if (parts.length !== 2) return null
  return { condition: parts[0], city: parts[1] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params
  const parsed = parseSlug(location)
  if (!parsed) return {}
  const meta = buildLocationMeta(parsed.condition, parsed.city)
  if (!meta) return {}
  return {
    title: meta.pageTitle,
    description: meta.metaDescription,
  }
}

function formatUpdatedAt(timestamp?: string | null): string {
  if (!timestamp) return 'recently'
  const diff = Date.now() - new Date(timestamp).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

function getAverageAvailability(assessors: AssessorWithAvailability[]): string {
  if (assessors.length === 0) return 'unknown'
  const order = ['within-2-weeks', '2-4-weeks', '1-3-months', '3-plus-months']
  const counts: Record<string, number> = {}
  assessors.forEach((a) => {
    const key = a.availability?.availability_range ?? '3-plus-months'
    counts[key] = (counts[key] || 0) + 1
  })
  const dominant = order.find((o) => counts[o] && counts[o] >= assessors.length / 2)
  if (dominant === 'within-2-weeks') return '2 to 4 weeks'
  if (dominant === '2-4-weeks') return '2 to 6 weeks'
  if (dominant === '1-3-months') return '4 to 12 weeks'
  return '8 to 16 weeks'
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params

  if (location.startsWith('assessor')) {
    redirect(`/assessor/${location.replace('assessor/', '').replace('assessor', '')}`)
  }

  const parsed = parseSlug(location)
  if (!parsed) notFound()

  const meta = buildLocationMeta(parsed.condition, parsed.city)
  if (!meta) notFound()

  let assessors: AssessorWithAvailability[] = []
  try {
    assessors = await searchAssessors(meta.city, meta.conditionLabel)
  } catch {
    // show page with empty state rather than crashing
  }

  const sorted = sortByAvailability(assessors)
  const fastest = assessors.length > 0 ? fastestAvailability(assessors) : null
  const average = getAverageAvailability(assessors)
  const count = assessors.length
  const topAssessors = sorted.slice(0, 5)
  const pageUpdated = sorted[0]?.availability?.last_updated ?? null
  const condLower = parsed.condition.toLowerCase()
  const ukPage = `/${condLower}-assessment-uk`

  const relatedQuestions = [
    { q: `How long does a ${meta.conditionLabel} assessment take?`, href: '/articles/what-happens-during-an-autism-assessment' },
    { q: `Can I get a ${meta.conditionLabel} assessment privately in ${meta.city}?`, href: `/${condLower}-assessment-${parsed.city.toLowerCase()}` },
    { q: 'What is the difference between NHS and private assessments?', href: '/articles/nhs-vs-private-assessment-uk' },
    { q: 'How much does a private assessment cost?', href: '/articles/adhd-assessment-waiting-times-uk' },
    { q: `What is the fastest way to get a ${meta.conditionLabel} assessment?`, href: '/' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `${meta.conditionLabel} Assessment ${meta.city}`,
    description: meta.metaDescription,
    areaServed: meta.city,
    serviceType: `${meta.conditionLabel} Assessment`,
    url: `https://www.assessmentfinder.co.uk/${condLower}-assessment-${parsed.city.toLowerCase()}`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: relatedQuestions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Find out more about ${meta.conditionLabel} assessments in ${meta.city} on Assessment Finder.`,
      },
    })),
  }

  return (
    <PageLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 10px', lineHeight: 1.3 }}>
            {meta.h1}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', maxWidth: '560px', margin: '0 0 1.5rem' }}>
            {meta.intro}
          </p>
          {fastest && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(74,222,128,0.15)', border: '0.5px solid rgba(74,222,128,0.4)', borderRadius: '10px', padding: '10px 18px', marginBottom: '1.25rem' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: 0 }}>
                Fastest {meta.conditionLabel} assessment availability in {meta.city}: <span style={{ color: '#4ade80' }}>{fastest}</span>
              </p>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <SummaryPill label="Assessors listed" value={count > 0 ? String(count) : 'None yet'} />
            {fastest && <SummaryPill label="Fastest availability" value={fastest} highlight />}
            <SummaryPill label="Location" value={meta.city} />
            <SummaryPill label="Condition" value={meta.conditionLabel} />
            {pageUpdated && <SummaryPill label="Last updated" value={formatUpdatedAt(pageUpdated)} />}
          </div>
        </Container>
      </div>

      {/* Answer block */}
      <div style={{ background: '#f0fdf4', borderBottom: '0.5px solid #86efac' }}>
        <Container>
          <div style={{ padding: '1.5rem 0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#166534', margin: '0 0 8px' }}>
              How quickly can I get {meta.conditionLabel === 'ADHD' ? 'an' : 'a'} {meta.conditionLabel} assessment in {meta.city}?
            </h2>
            <p style={{ fontSize: '14px', color: '#166534', margin: 0, lineHeight: 1.7, opacity: 0.9 }}>
              {fastest
                ? `As of 2026, some private assessors in ${meta.city} currently have availability ${fastest.toLowerCase()}. Across listed providers, average waiting times are currently around ${average}. Waiting times vary between providers and change regularly. Assessment Finder shows real-time availability so you can find the shortest current wait.`
                : `Private assessors in ${meta.city} typically offer shorter waiting times than the NHS. As of 2026, NHS waiting times in many areas exceed 12 months, while private providers often have appointments available within weeks. Assessment Finder lists current availability so you can compare options.`}
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <SectionHeading>Available {meta.conditionLabel} assessors in {meta.city}</SectionHeading>
          <p style={{ fontSize: '15px', color: '#374151', marginBottom: '1.5rem' }}>
            {count === 0
              ? `No assessors are currently listed in ${meta.city} for ${meta.conditionLabel}.`
              : `There ${count === 1 ? 'is' : 'are'} ${count} ${meta.conditionLabel} assessor${count === 1 ? '' : 's'} listed in ${meta.city}. Sorted by fastest availability first. All providers are registered with a recognised UK governing body such as the HCPC, BPS or GMC.`}
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
              {sorted.map((assessor) => (
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

      {/* Aggregated insights */}
      {count > 0 && (
        <Section style={{ paddingTop: 0 }}>
          <Container>
            <div style={{ background: '#f0f8ff', borderRadius: '12px', border: '0.5px solid #bfdbfe', padding: '1.75rem' }}>
              <SectionHeading>Availability insights for {meta.conditionLabel} assessments in {meta.city}</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Assessors listed', value: String(count) },
                  { label: 'Fastest current availability', value: fastest ?? 'Not available' },
                  { label: 'Average availability', value: average },
                  { label: 'Data last updated', value: formatUpdatedAt(pageUpdated) },
                ].map((item) => (
                  <div key={item.label} style={{ background: '#fff', borderRadius: '8px', padding: '12px 14px', border: '0.5px solid #bfdbfe' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 4px', fontWeight: 500 }}>{item.label}</p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#1e3a5f', margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.7 }}>
                As of 2026, the average waiting time for a private {meta.conditionLabel} assessment in {meta.city} is currently around {average}, based on providers listed on Assessment Finder. The fastest available appointments are currently {fastest ? fastest.toLowerCase() : 'subject to provider availability'}. Waiting times are updated regularly by assessors and may change. NHS {meta.conditionLabel} assessment waiting times in many UK areas currently exceed 12 to 18 months.
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* Fastest assessors */}
      {topAssessors.length > 0 && (
        <Section style={{ paddingTop: 0 }}>
          <Container>
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
              <SectionHeading>Fastest available {meta.conditionLabel} assessors in {meta.city}</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {topAssessors.map((assessor, i) => {
                  const avKey = assessor.availability?.availability_range ?? '3-plus-months'
                  const isGreen = avKey === 'within-2-weeks' || avKey === '2-4-weeks'
                  const dotColor = isGreen ? '#22c55e' : avKey === '1-3-months' ? '#f59e0b' : '#ef4444'
                  return (
                    <div key={assessor.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < topAssessors.length - 1 ? '0.5px solid #f3f4f6' : 'none', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{assessor.name}</p>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>{assessor.professional_title}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 500, color: isGreen ? '#166534' : '#92400e', margin: 0, whiteSpace: 'nowrap' }}>
                          {AVAILABILITY_LABELS[avKey]}
                        </p>
                        <a href={`/assessor/${assessor.id}`} style={{ fontSize: '12px', color: '#1a3a5c', textDecoration: 'none', fontWeight: 500, background: '#e8f0fa', padding: '4px 10px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                          View →
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* SEO content */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <SectionHeading>What to expect from {meta.conditionLabel === 'ADHD' ? 'an' : 'a'} {meta.conditionLabel} assessment in {meta.city}</SectionHeading>
            {meta.seoBody.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>{para}</p>
            ))}
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: '0.75rem 0 0' }}>
              Private {meta.conditionLabel} assessments in {meta.city} may be provided by clinical psychologists, consultant psychiatrists, or specialist nurses. Providers are typically regulated by bodies such as the HCPC, BPS, or GMC. Assessment Finder only lists providers registered with a recognised UK professional body.
            </p>
          </div>
        </Container>
      </Section>

      {/* NHS vs Private */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <SectionHeading>NHS vs private {meta.conditionLabel} assessments</SectionHeading>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              In the UK, {meta.conditionLabel} assessments are available through the NHS or through private providers. As of 2026, NHS waiting times in many areas exceed 12 to 18 months due to high demand and limited specialist capacity.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              Private {meta.conditionLabel} assessments in {meta.city} are typically available significantly sooner. Many providers currently offer appointments within 2 to 12 weeks, depending on availability and demand at the time of enquiry.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              Private assessments involve a fee, which varies between providers. Prices for a private {meta.conditionLabel} assessment in the UK typically range from £500 to £1,500 depending on the assessor's qualifications and the scope of the assessment.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
              Assessment Finder allows you to compare private assessors in {meta.city} and view real availability, helping you make a more informed decision about your options.
            </p>
          </div>
        </Container>
      </Section>

      {/* UK page link */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#f8fafc', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: '0 0 3px' }}>
                {meta.conditionLabel} assessments across the UK
              </p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                View national waiting times, cost guidance, and assessor availability across the UK.
              </p>
            </div>
            <a href={ukPage} style={{ fontSize: '13px', color: '#1a3a5c', fontWeight: 600, textDecoration: 'none', background: '#e8f0fa', padding: '8px 16px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
              View UK overview →
            </a>
          </div>
        </Container>
      </Section>

      {/* Related questions */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <SectionHeading>Related questions</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {relatedQuestions.map((item, i) => (
                <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < relatedQuestions.length - 1 ? '0.5px solid #f3f4f6' : 'none', textDecoration: 'none', gap: '12px' }}>
                  <p style={{ fontSize: '14px', color: '#1a3a5c', margin: 0, fontWeight: 500 }}>{item.q}</p>
                  <span style={{ color: '#9ca3af', flexShrink: 0 }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* For assessors CTA */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500, margin: '0 0 4px' }}>Are you an assessor in {meta.city}?</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>List your practice for free and appear on this page.</p>
            </div>
            <a href="/list-your-practice" style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '13px', fontWeight: 600, padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              List your practice
            </a>
          </div>
        </Container>
      </Section>

      {/* Related searches */}
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
      <p style={{ fontSize: '11px', color: highlight ? '#4ade80' : 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 3px', fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: '15px', fontWeight: 500, color: highlight ? '#4ade80' : '#fff', margin: 0 }}>{value}</p>
    </div>
  )
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
    links.push({ label: `${condition} assessment ${c}`, href: `/${condition.toLowerCase()}-assessment-${c.toLowerCase()}` })
  })
  OTHER_CONDITIONS[condition]?.forEach((cond) => {
    links.push({ label: `${cond} assessment ${city}`, href: `/${cond.toLowerCase()}-assessment-${city.toLowerCase()}` })
  })
  return links
}