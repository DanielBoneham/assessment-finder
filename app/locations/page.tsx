import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assessment Locations | Assessment Finder',
  description: 'Find private ADHD, autism and dyslexia assessors across the UK. Browse by city and condition.',
}

const LINKS = [
  { label: 'ADHD assessment London', href: '/adhd-assessment-london' },
  { label: 'Autism assessment London', href: '/autism-assessment-london' },
  { label: 'Dyslexia assessment London', href: '/dyslexia-assessment-london' },
  { label: 'ADHD assessment Manchester', href: '/adhd-assessment-manchester' },
  { label: 'Autism assessment Manchester', href: '/autism-assessment-manchester' },
  { label: 'Dyslexia assessment Manchester', href: '/dyslexia-assessment-manchester' },
  { label: 'ADHD assessment Birmingham', href: '/adhd-assessment-birmingham' },
  { label: 'Autism assessment Birmingham', href: '/autism-assessment-birmingham' },
  { label: 'Dyslexia assessment Birmingham', href: '/dyslexia-assessment-birmingham' },
  { label: 'ADHD assessment Bristol', href: '/adhd-assessment-bristol' },
  { label: 'Autism assessment Bristol', href: '/autism-assessment-bristol' },
  { label: 'Dyslexia assessment Bristol', href: '/dyslexia-assessment-bristol' },
  { label: 'ADHD assessment Leeds', href: '/adhd-assessment-leeds' },
  { label: 'Autism assessment Leeds', href: '/autism-assessment-leeds' },
  { label: 'Dyslexia assessment Leeds', href: '/dyslexia-assessment-leeds' },
  { label: 'ADHD assessment Edinburgh', href: '/adhd-assessment-edinburgh' },
  { label: 'Autism assessment Edinburgh', href: '/autism-assessment-edinburgh' },
  { label: 'Dyslexia assessment Edinburgh', href: '/dyslexia-assessment-edinburgh' },
  { label: 'ADHD assessment Glasgow', href: '/adhd-assessment-glasgow' },
  { label: 'Autism assessment Glasgow', href: '/autism-assessment-glasgow' },
  { label: 'Dyslexia assessment Glasgow', href: '/dyslexia-assessment-glasgow' },
]

const CITIES = ['London', 'Manchester', 'Birmingham', 'Bristol', 'Leeds', 'Edinburgh', 'Glasgow']

function LocationLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#1a3a5c', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', background: '#f0f4f8', fontWeight: 500 }}>
      {label}
      <span style={{ color: '#9ca3af' }}>→</span>
    </a>
  )
}

export default function LocationsPage() {
  return (
    <PageLayout>

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 10px' }}>
            Assessment locations across the UK
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', maxWidth: '560px', margin: 0 }}>
            Browse private ADHD, autism and dyslexia assessors by city. All assessors show real availability.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {CITIES.map((city) => (
              <div key={city} style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: '0 0 1rem' }}>{city}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {LINKS.filter((l) => l.label.includes(city)).map((link) => (
                    <LocationLink key={link.href} label={link.label} href={link.href} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}