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
            <h2 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '1rem' }}>
              ADHD assessment waiting times in the UK
            </h2>
            {[
              'ADHD assessment waiting times in the UK can vary significantly depending on whether you go through the NHS or a private provider.',
              'NHS waiting times can often exceed 6–12 months in many areas. Private assessments are typically much faster, with availability ranging from a few weeks to a few months.',
              'The time it takes to complete an assessment also varies, but most private ADHD assessments are completed within one to three appointments.',
              'Because availability differs between providers, many people choose to compare assessors to find those with shorter waiting times.',
              'Assessment Finder helps you identify ADHD assessors with current availability, so you can access support sooner.',
            ].map((para, i, arr) => (
              <p key={i} style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, marginBottom: i < arr.length - 1 ? '0.75rem' : 0 }}>
                {para}
              </p>
            ))}
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}