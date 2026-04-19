import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Practice | Assessment Finder',
  description: 'Join Assessment Finder and get discovered by people searching for ADHD, autism and dyslexia assessments near them.',
}

export default function ListYourPracticePage() {
  return (
    <PageLayout>

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '3rem 0 4rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 500, lineHeight: 1.3, maxWidth: '560px', margin: '0 auto 1rem' }}>
            Get more clients for your assessment practice
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join Assessment Finder and be discovered by people actively searching for ADHD, autism and dyslexia assessments near them.
          </p>
          
            href="#apply"
            style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '15px', fontWeight: 500, padding: '12px 28px', borderRadius: '8px', textDecoration: 'none' }}
          >
            Create your profile
          </a>
        </Container>
      </div>

      {/* Benefits */}
      <Section>
        <Container>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.5rem', textAlign: 'center' }}>
            Why list on Assessment Finder
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: '👥',
                title: 'Get more clients',
                body: 'Reach people who are actively searching for an assessor in your area. Every listing is indexed by location and condition.',
              },
              {
                icon: '📅',
                title: 'Show your availability',
                body: 'Display your current availability so potential clients can see at a glance whether you can see them soon.',
              },
              {
                icon: '🔍',
                title: 'Be discovered in search',
                body: 'Your profile appears on location pages like "ADHD assessment London" — exactly where people are looking.',
              },
              {
                icon: '✓',
                title: 'Build trust with a verified badge',
                body: 'Verified assessors get a badge on their profile, helping clients feel confident in choosing you.',
              },
            ].map((benefit) => (
              <div key={benefit.title} style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.75rem' }}>{benefit.icon}</div>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>{benefit.title}</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{benefit.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
              How it works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: '1', title: 'Submit your details', body: 'Fill in the short form below with your name, location, conditions, and availability.' },
                { step: '2', title: 'We review your profile', body: 'We check your credentials and verify your registration with a governing body.' },
                { step: '3', title: 'Go live on the directory', body: 'Your profile goes live and starts appearing in search results for your area and specialisms.' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e8f0fa', color: '#1a3a5c', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.step}
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 4px' }}>{item.title}</p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Application form */}
      <Section style={{ paddingTop: 0 }} >
        <Container>
          <div id="apply" style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', margin: '0 0 0.5rem' }}>
              Create your profile
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 1.5rem' }}>
              Fill in your details and we will be in touch within 2 working days.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input placeholder="Dr Jane Smith" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" placeholder="jane@example.com" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Location / city</label>
                  <input placeholder="London" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Professional title</label>
                  <input placeholder="Clinical Psychologist" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Conditions you assess for</label>
                <input placeholder="e.g. ADHD, Autism, Dyslexia" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Current availability</label>
                <select style={inputStyle}>
                  <option value="">Select availability</option>
                  <option>Within 2 weeks</option>
                  <option>2 to 4 weeks</option>
                  <option>1 to 3 months</option>
                  <option>3 or more months</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Governing body and registration number</label>
                <input placeholder="e.g. BPS / 123456" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Brief bio (optional)</label>
                <textarea placeholder="Tell potential clients about your experience and approach..." rows={4} style={{ ...inputStyle, height: 'auto', resize: 'vertical' }} />
              </div>

              <button
                style={{ height: '46px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Submit your profile
              </button>

              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
                We will review your details and be in touch within 2 working days.
              </p>
            </div>
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '42px',
  border: '0.5px solid #d1d5db',
  borderRadius: '8px',
  padding: '0 12px',
  fontSize: '14px',
  fontFamily: 'inherit',
  background: '#fff',
  color: '#111827',
  boxSizing: 'border-box',
}