import { PageLayout, Container, Section } from '@/components/Layout'
import type { Metadata } from 'next'
import { OnboardingForm } from '@/components/OnboardingForm'

export const metadata: Metadata = {
  title: 'For Assessors | Assessment Finder',
  description: 'Join Assessment Finder and get discovered by people searching for ADHD, autism and dyslexia assessments near them.',
}

export default function ListYourPracticePage() {
  return (
    <PageLayout>

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '3.5rem 0 4.5rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(74,222,128,0.15)', border: '0.5px solid rgba(74,222,128,0.4)', borderRadius: '20px', padding: '5px 14px', marginBottom: '1.25rem' }}>
            <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: 500 }}>
              ✦ Join early for free premium access
            </span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 500, lineHeight: 1.3, maxWidth: '580px', margin: '0 auto 1rem' }}>
            Get more assessment enquiries by showing your real availability
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join Assessment Finder and connect with people actively searching for ADHD, autism and dyslexia assessments. Early members get priority visibility at no cost.
          </p>

          {/* Primary CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            
              href="#create-profile"
              style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '16px', fontWeight: 700, padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', letterSpacing: '-0.2px' }}
            >
              Create your free profile
            </a>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', margin: 0 }}>
              Join early for free premium visibility · No payment required
            </p>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 16px', marginTop: '1.5rem' }}>
            <span style={{ color: '#4ade80', fontSize: '14px' }}>✓</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
              All profiles reviewed before publication to ensure quality and professional standards.
            </span>
          </div>
        </Container>
      </div>

      {/* Benefits */}
      <Section>
        <Container>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.25rem', textAlign: 'center' }}>
            What you get
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '2.5rem' }}>
            {[
              { icon: '🔍', title: 'Be discovered', body: 'Be found by people actively searching for ADHD, autism and dyslexia assessments in your area.' },
              { icon: '📅', title: 'Highlight your availability', body: 'Show your current availability prominently so clients can see at a glance whether you can help them soon.' },
              { icon: '📍', title: 'Improve local visibility', body: 'Your profile appears on location pages like "ADHD assessment London" — exactly where people are already looking.' },
              { icon: '✅', title: 'Reduce unnecessary admin', body: 'Fewer back-and-forth enquiries. Clients can see your availability before they contact you.' },
              { icon: '🏅', title: 'Build trust with verified credentials', body: 'Display your governing body registration and earn a verified badge that helps clients feel confident choosing you.' },
              { icon: '🔝', title: 'Free premium placement for early adopters', body: 'Assessors who join now receive priority placement in search results at no cost — for as long as they remain listed.' },
            ].map((benefit) => (
              <div key={benefit.title} style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <div style={{ fontSize: '22px', marginBottom: '0.75rem' }}>{benefit.icon}</div>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>{benefit.title}</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{benefit.body}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 1.25rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
              How it works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: '1', title: 'Submit your details', body: 'Fill in the form below with your name, location, conditions, and availability.' },
                { step: '2', title: 'We review your profile', body: 'We check your credentials and verify your registration before publishing.' },
                { step: '3', title: 'Go live and get discovered', body: 'Your profile goes live on location pages and starts attracting enquiries.' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#e8f0fa', color: '#1a3a5c', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.step}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: '0 0 3px' }}>{item.title}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </Container>
      </Section>

      {/* Profile preview */}
      <Section style={{ paddingTop: 0 }}>
        <Container style={{ maxWidth: '720px' }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem', textAlign: 'center' }}>
            Example profile
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', margin: '0 0 1.5rem' }}>
            This is what your public profile could look like on Assessment Finder.
          </p>
          <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.75rem', marginBottom: '14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e8f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>👤</div>
                <div>
                  <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: '0 0 3px' }}>Dr Sarah Mitchell</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '0 0 8px' }}>Clinical Psychologist · London</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(74,222,128,0.2)', color: '#4ade80', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid rgba(74,222,128,0.4)' }}>✓ Verified practitioner</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>✓ Profile reviewed</span>
                  </div>
                </div>
              </div>
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 16px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 6px', opacity: 0.7 }}>Current availability</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#166534', margin: 0 }}>Available within 2 weeks</p>
                </div>
                <p style={{ fontSize: '11px', color: '#166534', margin: 0, opacity: 0.65 }}>Updated today</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.25rem' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 10px', paddingBottom: '8px', borderBottom: '0.5px solid #e5e7eb' }}>Quick summary</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Conditions', value: 'ADHD, Autism' },
                  { label: 'Location', value: 'London' },
                  { label: 'Availability', value: 'Within 2 weeks' },
                  { label: 'Types', value: 'Adults, Remote' },
                  { label: 'Price range', value: '£900 – £1,200' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#111827', textAlign: 'right' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.25rem' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.7px', margin: '0 0 10px', paddingBottom: '8px', borderBottom: '0.5px solid #e5e7eb' }}>About</p>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Specialist in adult ADHD and autism assessments with over 12 years of clinical experience. Registered with the BPS and HCPC. Offering both in-person and remote assessments across London.
              </p>
            </div>
          </div>
          <div style={{ background: '#f0fdf4', borderRadius: '10px', border: '1px solid #86efac', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>✓</div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#166534', margin: '0 0 2px' }}>Verified practitioner</p>
              <p style={{ fontSize: '12px', color: '#166534', margin: 0, opacity: 0.8 }}>Identity and credentials checked by Assessment Finder. Registered with BPS — No. 123456.</p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '10px', marginBottom: 0 }}>
            Example only — your profile will reflect your own details and credentials.
          </p>
        </Container>
      </Section>

      {/* Trust section */}
      <Section style={{ paddingTop: '1.5rem' }}>
        <Container style={{ maxWidth: '640px' }}>
          <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', padding: '1.75rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 1rem' }}>
              Our commitment to quality
            </p>
            <p style={{ fontSize: '15px', fontWeight: 500, color: '#166534', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
              All profiles are reviewed before publication to ensure quality and professional standards.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Verified profiles', body: 'We check governing body registration before approving any listing.' },
                { title: 'Professional standards', body: 'Only qualified assessors registered with BPS, HCPC, GMC or equivalent bodies are listed.' },
                { title: 'Increased user trust', body: 'Clients see verified badges on approved profiles, making them more likely to get in touch.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#dcfce7', color: '#166534', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#166534', margin: '0 0 2px' }}>{item.title}</p>
                    <p style={{ fontSize: '13px', color: '#166534', margin: 0, opacity: 0.8, lineHeight: 1.5 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section style={{ paddingTop: 0 }} >
        <Container style={{ maxWidth: '640px' }}>
          <div id="create-profile" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>
              Create your free profile
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 6px' }}>
              Takes around 5 minutes. We will be in touch within 2 working days.
            </p>
            <p style={{ fontSize: '13px', color: '#4ade80', fontWeight: 500, margin: 0, background: '#1a3a5c', display: 'inline-block', padding: '4px 14px', borderRadius: '20px' }}>
              Join early for free premium visibility
            </p>
          </div>
          <OnboardingForm />
        </Container>
      </Section>

    </PageLayout>
  )
}