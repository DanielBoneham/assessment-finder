import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autism Assessment UK — Waiting Times, Costs and Availability | Assessment Finder',
  description: 'A complete guide to autism assessments in the UK. Compare NHS and private waiting times, understand costs, and find assessors with current availability.',
}

const LOCATIONS = [
  { city: 'London', href: '/autism-assessment-london' },
  { city: 'Manchester', href: '/autism-assessment-manchester' },
  { city: 'Birmingham', href: '/autism-assessment-birmingham' },
  { city: 'Bristol', href: '/autism-assessment-bristol' },
  { city: 'Leeds', href: '/autism-assessment-leeds' },
  { city: 'Edinburgh', href: '/autism-assessment-edinburgh' },
  { city: 'Glasgow', href: '/autism-assessment-glasgow' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does an autism assessment take in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An autism assessment in the UK typically takes place over two to four appointments and may last several hours in total. The process includes a clinical interview, observation, and a written diagnostic report.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a private autism assessment cost in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private autism assessments in the UK typically cost between £800 and £2,500, depending on the provider, location, and depth of the assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is the NHS waiting time for an autism assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, NHS autism assessment waiting times in many areas of the UK exceed 18 to 24 months. In some regions, waiting times may be considerably longer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can adults get an autism assessment in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Adult autism assessments are available in the UK through both the NHS and private providers. Many private assessors listed on Assessment Finder offer assessments for adults.',
      },
    },
  ],
}

export default function AutismAssessmentUKPage() {
  return (
    <PageLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 500, margin: '0 0 10px', lineHeight: 1.3 }}>
            Autism Assessment in the UK
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '580px', margin: '0 0 1.5rem', lineHeight: 1.7 }}>
            A guide to autism assessments in the UK, including waiting times, costs, and how to find a qualified assessor near you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { label: 'NHS wait (2026)', value: '18–24+ months' },
              { label: 'Private wait', value: '4–12 weeks' },
              { label: 'Typical cost', value: '£800–£2,500' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 16px' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 3px', fontWeight: 500 }}>{item.label}</p>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#fff', margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '24px', alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <Card title="What is an autism assessment?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  An autism assessment is a clinical evaluation used to determine whether a person meets the diagnostic criteria for autism spectrum disorder (ASD). In the UK, assessments are conducted by multidisciplinary teams or individual specialists including clinical psychologists, psychiatrists, and speech and language therapists.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  A standard autism assessment typically involves a structured clinical interview, observation, standardised diagnostic tools such as the ADOS-2 or ADI-R, and a written diagnostic report. Assessments for adults may differ in structure from those for children.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  In the UK, autism assessors are typically registered with a recognised professional body such as the HCPC, BPS, or GMC. Assessment Finder only lists providers registered with a recognised UK professional body.
                </p>
              </Card>

              <Card title="NHS vs private autism assessments in the UK">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Autism assessments in the UK are available through the NHS or through private providers. As of 2026, NHS autism assessment waiting times in many areas exceed 18 to 24 months, with some areas reporting even longer waits.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Private autism assessments are typically available significantly sooner. Based on providers currently listed on Assessment Finder, private appointments are often available within 4 to 12 weeks, depending on location and provider availability.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Private autism assessments in the UK typically cost between £800 and £2,500. The cost depends on the assessor's qualifications, the assessment tools used, and whether the assessment covers co-occurring conditions such as ADHD or anxiety.
                </p>
              </Card>

              <Card title="Autism assessments for adults in the UK">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Adult autism assessments are available in the UK through both NHS and private routes. Many adults seek assessment after recognising traits in themselves or following the diagnosis of a family member.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Private adult autism assessments typically follow a structured format using validated tools adapted for adults. Assessment Finder lists private assessors who offer adult autism assessments across the UK.
                </p>
              </Card>

              <Card title="Who can carry out an autism assessment in the UK?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  In the UK, autism assessments may be carried out by clinical psychologists, consultant psychiatrists, or as part of a multidisciplinary team. Assessors are typically registered with the HCPC, BPS, or GMC.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Assessment Finder only lists providers registered with a recognised UK professional body. All profiles are reviewed before publication.
                </p>
              </Card>

              <Card title="Related questions">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { q: 'What happens during an autism assessment?', href: '/articles/what-happens-during-an-autism-assessment' },
                    { q: 'What is the difference between NHS and private assessments?', href: '/articles/nhs-vs-private-assessment-uk' },
                    { q: 'How much does a private autism assessment cost?', href: '/articles/adhd-assessment-waiting-times-uk' },
                    { q: 'Can I get an autism assessment as an adult?', href: '/articles/what-happens-during-an-autism-assessment' },
                  ].map((item, i, arr) => (
                    <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < arr.length - 1 ? '0.5px solid #f3f4f6' : 'none', textDecoration: 'none', gap: '12px' }}>
                      <p style={{ fontSize: '14px', color: '#1a3a5c', margin: 0, fontWeight: 500 }}>{item.q}</p>
                      <span style={{ color: '#9ca3af', flexShrink: 0 }}>→</span>
                    </a>
                  ))}
                </div>
              </Card>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '1rem' }}>

              <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
                  Find an assessor by city
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {LOCATIONS.map((loc) => (
                    <a key={loc.href} href={loc.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#1a3a5c', textDecoration: 'none', padding: '8px 10px', borderRadius: '6px', background: '#f0f4f8' }}>
                      Autism assessment {loc.city}
                      <span style={{ color: '#9ca3af' }}>→</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '0.5px solid #86efac', padding: '1.25rem' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#166534', margin: '0 0 6px' }}>Quick facts</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'NHS wait: 18–24+ months (2026)',
                    'Private wait: 4–12 weeks typical',
                    'Cost: £800–£2,500',
                    'Regulated by HCPC, BPS or GMC',
                    'Available for adults and children',
                  ].map((fact, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, fontSize: '13px' }}>✓</span>
                      <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: '0 0 8px' }}>Find an autism assessor</p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', margin: '0 0 12px' }}>Compare availability and credentials across the UK.</p>
                <a href="/" style={{ display: 'block', background: '#4ade80', color: '#1a3a5c', fontSize: '13px', fontWeight: 600, padding: '9px', borderRadius: '8px', textDecoration: 'none' }}>
                  Search assessors
                </a>
              </div>

            </div>
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}