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

      <div style={{ background: '#1a3a5c', padding: '3.5rem 0 4.5rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 500, lineHeight: 1.3, maxWidth: '600px', margin: '0 auto 1rem' }}>
            Find Private ADHD, Autism and Dyslexia Assessors Near You
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            See who has availability in the next few weeks. Compare assessors, check credentials, and get in touch directly.
          </p>
          <HeroSearch />
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '28px', marginTop: '2rem' }}>
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
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            How it works
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { step: '1', title: 'Search by location', body: 'Enter your city and select the type of assessment you need.' },
              { step: '2', title: 'Compare availability', body: 'See which assessors have appointments coming up and how soon.' },
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

      <Section style={{ paddingTop: 0 }}>
        <Container>
          {error && (
            <p style={{ color: '#991b1b', fontSize: '14px', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
              Could not load assessors. Please check your Supabase connection.
            </p>
          )}
          {!error && <AssessorGrid assessors={assessors} />}
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: '0 0 6px' }}>
                Are you an assessor?
              </p>
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