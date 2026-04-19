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
      <div style={{ background: '#1a3a5c', padding: '3.5rem 0 4.5rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 500, lineHeight: 1.3, maxWidth: '600px', margin: '0 auto 1rem' }}>
            Find Private ADHD, Autism &amp; Dyslexia Assessors Near You
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            See who has availability in the next few weeks. Compare assessors, check credentials, and get in touch directly.
          </p>
          <HeroSearch />

          {/* Proof bar */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '28px', marginTop: '2rem' }}>
            {[
              { value: '10+', label: 'Assessors listed' },
              { value: 'Weekly', label: 'Availability updates' },
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

      {/* How it works */}
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

      {/* Assessor listing */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          {error && (
            <p style={{ color: '#991b1b', fontSize: '14px', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.25re