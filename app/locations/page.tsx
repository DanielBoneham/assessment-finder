import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assessment Locations | Assessment Finder',
  description: 'Find ADHD, autism and dyslexia assessors across the UK. Browse by city and condition.',
}

const CITIES = ['London','Manchester','Birmingham','Bristol','Leeds','Edinburgh','Cardiff','Glasgow','Nottingham']

const CONDITIONS = [
  { label: 'ADHD', slug: 'adhd' },
  { label: 'Autism', slug: 'autism' },
  { label: 'Dyslexia', slug: 'dyslexia' },
]

export default function LocationsPage() {
  return (
    <PageLayout>
      <div style={{ background: '#1a3a5c', padding: '2.5rem 0 3rem' }}>
        <Container>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 8px' }}>
            Assessment locations across the UK
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: 0 }}>
            Browse assessors by city and condition.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          {CONDITIONS.map((condition) => (
            <div key={condition.slug} style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1rem' }}>
                {condition.label} assessments
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {CITIES.map((city) => (
                  <a key={city} href={`/${condition.slug}-assessment-${city.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: '10px', border: '0.5px solid #d1dce8', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{city}</p>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>{condition.label} assessors</p>
                      </div>
                      <span style={{ color: '#1a3a5c', fontSize: '16px' }}>→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 500, margin: '0 0 1rem', color: '#111827' }}>
              Finding an assessor near you
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              Assessment Finder lists private ADHD, autism and dyslexia assessors across the UK, with real availability so you can see who can see you soonest.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
              Browse by city and condition to find assessors in your area. Each page shows current availability, credentials, and pricing so you can make an informed choice.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
              All assessors are registered with a recognised governing body such as the BPS, HCPC, or GMC.
            </p>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}