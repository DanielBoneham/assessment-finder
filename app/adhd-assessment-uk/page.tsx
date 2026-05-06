import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ADHD Assessment UK — Waiting Times, Costs and Availability | Assessment Finder',
  description: 'A complete guide to ADHD assessments in the UK. Compare NHS and private waiting times, understand costs, and find assessors with current availability.',
}

const LOCATIONS = [
  { city: 'London', href: '/adhd-assessment-london' },
  { city: 'Manchester', href: '/adhd-assessment-manchester' },
  { city: 'Birmingham', href: '/adhd-assessment-birmingham' },
  { city: 'Bristol', href: '/adhd-assessment-bristol' },
  { city: 'Leeds', href: '/adhd-assessment-leeds' },
  { city: 'Edinburgh', href: '/adhd-assessment-edinburgh' },
  { city: 'Glasgow', href: '/adhd-assessment-glasgow' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does an ADHD assessment take in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An ADHD assessment in the UK typically takes between one and three appointments. Each appointment may last one to two hours. The process usually includes a clinical interview, structured questionnaires, and a written report.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a private ADHD assessment cost in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private ADHD assessments in the UK typically cost between £500 and £1,500, depending on the provider, location, and scope of the assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is the NHS waiting time for an ADHD assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of 2026, NHS ADHD assessment waiting times in many areas of the UK exceed 12 to 18 months. In some regions, waiting times may be longer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I get a private ADHD assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private ADHD assessments in the UK can often be accessed within 2 to 8 weeks, depending on provider availability and location.',
      },
    },
  ],
}

export default function ADHDAssessmentUKPage() {
  return (
    <PageLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container>
          <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to all assessors
          </a>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 500, margin: '0 0 10px', lineHeight: 1.3 }}>
            ADHD Assessment in the UK
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '580px', margin: '0 0 1.5rem', lineHeight: 1.7 }}>
            A guide to ADHD assessments in the UK, including waiting times, costs, and how to find a qualified assessor near you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { label: 'NHS wait (2026)', value: '12–18+ months' },
              { label: 'Private wait', value: '2–8 weeks' },
              { label: 'Typical cost', value: '£500–£1,500' },
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

              <Card title="What is an ADHD assessment?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  An ADHD assessment is a clinical evaluation used to determine whether a person meets the diagnostic criteria for Attention Deficit Hyperactivity Disorder (ADHD). In the UK, assessments are conducted by qualified professionals including clinical psychologists, consultant psychiatrists, and specialist nurses.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  A standard ADHD assessment typically involves a structured clinical interview, validated rating scales such as the Conners or DIVA-5, and a written diagnostic report. Some assessments also include cognitive testing or interviews with family members.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Assessors are typically registered with a recognised UK professional body such as the Health and Care Professions Council (HCPC), the British Psychological Society (BPS), or the General Medical Council (GMC).
                </p>
              </Card>

              <Card title="NHS vs private ADHD assessments in the UK">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  ADHD assessments in the UK are available through the NHS or through private providers. As of 2026, NHS ADHD assessment waiting times in many areas exceed 12 to 18 months, and in some regions waiting times may be considerably longer.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  Private ADHD assessments are typically available significantly sooner. Based on providers currently listed on Assessment Finder, private appointments are often available within 2 to 8 weeks, depending on location and provider availability at the time of enquiry.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Private ADHD assessments in the UK typically cost between £500 and £1,500. The cost varies depending on the assessor's qualifications, the depth of the assessment, and whether it covers co-occurring conditions such as anxiety or autism.
                </p>
              </Card>

              <Card title="How long does an ADHD assessment take?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  An ADHD assessment in the UK typically takes place over one to three appointments. Each appointment may last between one and two hours. The full process, from initial appointment to receiving a written report, usually takes two to four weeks.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  The assessment process generally includes a clinical interview, completion of standardised questionnaires, and a written report confirming or ruling out a diagnosis. Some providers also offer follow-up consultations to discuss the results and next steps.
                </p>
              </Card>

              <Card title="Who can carry out an ADHD assessment in the UK?">
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                  In the UK, ADHD assessments may be carried out by clinical psychologists registered with the HCPC or BPS, consultant psychiatrists registered with the GMC, or specialist nurses with appropriate training and registration.
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                  Assessment Finder only lists providers registered with a recognised UK professional body. All profiles are reviewed before publication to ensure professional standards are met.
                </p>
              </Card>

              <Card title="Related questions">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { q: 'How long is the NHS ADHD waiting time?', href: '/articles/adhd-assessment-waiting-times-uk' },
                    { q: 'What happens during an ADHD assessment?', href: '/articles/what-happens-during-an-autism-assessment' },
                    { q: 'What is the difference between NHS and private assessments?', href: '/articles/nhs-vs-private-assessment-uk' },
                    { q: 'How much does a private ADHD assessment cost?', href: '/articles/adhd-assessment-waiting-times-uk' },
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
                      ADHD assessment {loc.city}
                      <span style={{ color: '#9ca3af' }}>→</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '0.5px solid #86efac', padding: '1.25rem' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#166534', margin: '0 0 6px' }}>Quick facts</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'NHS wait: 12–18+ months (2026)',
                    'Private wait: 2–8 weeks typical',
                    'Cost: £500–£1,500',
                    'Regulated by HCPC, BPS or GMC',
                    'Adults and children assessed',
                  ].map((fact, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, fontSize: '13px' }}>✓</span>
                      <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: '0 0 8px' }}>Find an ADHD assessor</p>
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