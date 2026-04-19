import { getAssessors } from '@/lib/api'
import { AssessorWithAvailability } from '@/lib/api'
import { PageLayout, Container, Section } from '@/components/Layout'
import { AssessorGrid } from '@/components/AssessorGrid'

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
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '2rem' }}>
            See who can assess you in the next few weeks
          </p>
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
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>
              Getting assessed for ADHD, autism, or dyslexia can involve long NHS wait times — often 2–3 years. Private assessors can dramatically reduce this, with many offering appointments within weeks. Assessment Finder lists verified professionals across the UK and shows real availability, so you can make an informed choice quickly. All assessors are registered with a recognised governing body such as the BPS, HCPC, or GMC.
            </p>
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}
