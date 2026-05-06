import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dyslexia Assessment UK — Waiting Times, Costs and Availability | Assessment Finder',
  description: 'A complete guide to dyslexia assessments in the UK. Compare NHS and private waiting times, understand costs, and find assessors with current availability.',
}

const LOCATIONS = [
  { city: 'London', href: '/dyslexia-assessment-london' },
  { city: 'Manchester', href: '/dyslexia-assessment-manchester' },
  { city: 'Birmingham', href: '/dyslexia-assessment-birmingham' },
  { city: 'Bristol', href: '/dyslexia-assessment-bristol' },
  { city: 'Leeds', href: '/dyslexia-assessment-leeds' },
  { city: 'Edinburgh', href: '/dyslexia-assessment-edinburgh' },
  { city: 'Glasgow', href: '/dyslexia-assessment-glasgow' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a dyslexia assessment take in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A dyslexia assessment in the UK typically takes two to four hours and is usually completed in a single session. A written report is usually provided within one to two weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a private dyslexia assessment cost in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private dyslexia assessments in the UK typically cost between £400 and £800 for adults, and may cost more for children depending on the scope of the assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can adults get a dyslexia assessment in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Adult dyslexia assessments are available in the UK through private providers. Many adults seek assessment to understand learning difficulties or to access workplace accommodations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who can assess for dyslexia in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the UK, dyslexia assessments may be carried out by educational psychologists or specialist teachers with an Assessment Practising Certificate (APC). Providers are typically registered with the HCPC or the British Dyslexia Association.',
      },
    },
  ],
}

export default function DyslexiaAssessmentUKPage() {
  return (
    <PageLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 500, margin: '0 0 10px', lineHeight: 1.3 }}>
            Dyslexia Assessment in the UK
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '580px', margin: '0 0 1.5rem', lineHeight: 1.7 }}>
            A guide to dyslexia assessments in the UK, including waiting times, costs, and how to find a qualified assessor near you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { label: 'Typical duration', value: '2–4 hours' },
              { label: 'Private wait', value: '1–4 weeks' },
              { label: 'Typical cost', value: '£400–£800' },
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

              <Card title="What is a dyslexia assessment?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  A dyslexia assessment is a structured evaluation used to identify whether a person has dyslexia or other specific learning differences. In the UK, assessments are carried out by educational psychologists or specialist teachers holding an Assessment Practising Certificate (APC).
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  A standard dyslexia assessment typically includes standardised tests of reading, spelling, writing, and cognitive processing, along with a written report. The assessment usually takes two to four hours and is completed in a single session.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  A formal dyslexia assessment report can be used to access support in education or the workplace, including exam accommodations or reasonable adjustments under the Equality Act 2010.
                </p>
              </Card>

              <Card title="NHS vs private dyslexia assessments in the UK">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Unlike ADHD and autism assessments, dyslexia assessments are not routinely provided by the NHS. In practice, most people access dyslexia assessments through private providers, schools, or local authorities.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Private dyslexia assessments in the UK are typically available within one to four weeks. Based on providers listed on Assessment Finder, appointments are often available relatively quickly compared to ADHD or autism assessments.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Private dyslexia assessments in the UK typically cost between £400 and £800 for adults. Assessments for children may cost more depending on the depth of the evaluation and the assessor's qualifications.
                </p>
              </Card>

              <Card title="Dyslexia assessments for adults in the UK">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Adult dyslexia assessments are widely available in the UK through private providers. Many adults seek assessment to access workplace accommodations, support in higher education, or simply to better understand their learning profile.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  A formal adult dyslexia assessment report from a qualified assessor may be accepted by employers and higher education institutions as evidence for reasonable adjustments. Assessment Finder lists private assessors offering adult dyslexia assessments across the UK.
                </p>
              </Card>

              <Card title="Who can assess for dyslexia in the UK?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  In the UK, dyslexia assessments may be conducted by educational psychologists registered with the HCPC, or by specialist teachers holding a current Assessment Practising Certificate (APC) recognised by the British Dyslexia Association (BDA) or SASC.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Assessment Finder only lists providers registered with a recognised UK professional body. All profiles are reviewed before publication to ensure professional standards are met.
                </p>
              </Card>

              <Card title="Related questions">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { q: 'What is involved in a dyslexia assessment?', href: '/articles/dyslexia-assessment-uk-guide' },
                    { q: 'What is the difference between NHS and private assessments?', href: '/articles/nhs-vs-private-assessment-uk' },
                    { q: 'How much does a private dyslexia assessment cost?', href: '/articles/dyslexia-assessment-uk-guide' },
                    { q: 'Can I get a dyslexia assessment as an adult?', href: '/articles/dyslexia-assessment-uk-guide' },
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
                      Dyslexia assessment {loc.city}
                      <span style={{ color: '#9ca3af' }}>→</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '0.5px solid #86efac', padding: '1.25rem' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#166534', margin: '0 0 6px' }}>Quick facts</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Duration: 2–4 hours typical',
                    'Private wait: 1–4 weeks typical',
                    'Cost: £400–£800',
                    'Regulated by HCPC or BDA/SASC',
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
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: '0 0 8px' }}>Find a dyslexia assessor</p>
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