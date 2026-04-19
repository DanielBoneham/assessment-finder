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
            ← Back to all assessors
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

      {/* Assessor list */}
      <Section>
        <Container>
          <p style={{ fontSize: '15px', color: '#374151', marginBottom: '1.5rem' }}>
            {count === 0
              ? `No assessors are listed in ${meta.city} for ${meta.conditionLabel} yet.`
              : `There ${count === 1 ? 'is' : 'are'} ${count} ${meta.conditionLabel} assessor${count === 1 ? '' : 's'} in ${meta.city}.${fastest ? ` The fastest availability is ${fastest.toLowerCase()}.` : ''}`
            }
          </p>

          {count === 0 ? (
            <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1rem' }}>
                We don't have any {meta.conditionLabel} assessors listed in {meta.city} yet.
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

      {/* Condition-specific SEO */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 500, margin: '0 0 1re