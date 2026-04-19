import { getAssessors, AssessorWithAvailability } from '@/lib/api'
import { PageLayout, Container, Section } from '@/components/Layout'
import { AssessorGrid } from '@/components/AssessorGrid'
import { HeroSearch } from '@/components/HeroSearch'

export default async function HomePage() {
  let assessors: AssessorWithAvailability[] = []
  let error = false

  try {
    assessors = await getAssessors()
  } catch (e) {
    error = true
  }

  return (
    <PageLayout>

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '3rem 0 4rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 500, lineHeight: 1.35, maxWidth: '560px', margin: '0 auto 0.75rem' }}>
            Find ADHD, Autism &amp; Dyslexia Assessments with Real Availability
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            See which professionals can assess you in the next few weeks — no more guessing or long waiting lists.
          </p>
          <HeroSearch />
        </Container>
      </div>

      {/* Assessor listing with filtering */}
      <Section>
        <Container>
          {error && (
            <p style={{ color: '#991b1b', fontSize: '14px', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
              Could not load assessors. Please check your Supabase connection.
            </p>
          )}
          {!error && <AssessorGrid assessors={assessors} />}
        </Container>
      </Section>

      {/* SEO section */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '0.75rem' }}>
              Finding the right assessment in the UK
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              ADHD, autism and dyslexia assessments in the UK can have long waiting times, often several months or more.
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              Assessment Finder helps you quickly identify professionals with shorter availability, so you can access support sooner.
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, margin: 0 }}>
              You can search by location, compare assessors, and see who is available in the next few weeks.
            </p>
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}