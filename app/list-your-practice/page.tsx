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
      <div style={{ background: '#1a3a5c', padding: '3.5rem 0 4rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 500, lineHeight: 1.3, maxWidth: '560px', margin: '0 auto 1rem' }}>
            Get more clients by showing your real availability
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            Join Assessment Finder and help people find you when you are available to take on new assessments.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(74,222,128,0.12)', border: '0.5px solid rgba(74,222,128,0.3)', borderRadius: '8px', padding: '10px 16px' }}>
            <span style={{ color: '#4ade80', fontSize: '14px' }}>✓</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
              We review all profiles before publishing to ensure quality and professional standards.
            </span>
          </div>
        </Container>
      </div>

      {/* Benefits */}
      <Section>
        <Container>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.25rem', textAlign: 'center' }}>
            Why list on Assessment Finder
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '2.5rem' }}>
            {[
              {
                icon: '🔍',
                title: 'Be discovered',
                body: 'Be found by people actively searching for assessments in your area and specialism.',
              },
              {
                icon: '📅',
                title: 'Show availability',
                body: 'Display your current availability and reduce unnecessary back-and-forth with enquiries.',
              },
              {
                icon: '📍',
                title: 'Improve local visibility',
                body: 'Your profile appears on location pages like "ADHD assessment London" — where people are already looking.',
              },
            ].map((benefit) => (
              <div key={benefit.title} style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <div style={{ fontSize: '22px', marginBottom: '0.75rem' }}>{benefit.icon}</div>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>{benefit.title}</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{benefit.body}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 1.25rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
              How it works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: '1', title: 'Submit your details', body: 'Fill in the form below with your name, location, conditions, and availability.' },
                { step: '2', title: 'We review your profile', body: 'We check your credentials and verify your registration before publishing.' },
                { step: '3', title: 'Go live on the directory', body: 'Your profile goes live and starts appearing in search results for your area.' },
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

      {/* Form */}
      <Section style={{ paddingTop: 0 }}>
        <Container style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>
              Create your free profile
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Takes around 5 minutes. We will be in touch within 2 working days.
            </p>
          </div>
          <OnboardingForm />
        </Container>
      </Section>

    </PageLayout>
  )
}