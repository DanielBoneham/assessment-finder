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
      <div style={{ background: '#1a3a5c', padding: '3rem 0 4rem' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 500, lineHeight: 1.3, maxWidth: '560px', margin: '0 auto 1rem' }}>
            Get more clients by showing your availability
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Join Assessment Finder and help people find you when you are available to take on new assessments.
          </p>
        </Container>
      </div>

      {/* Benefits */}
      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '2.5rem' }}>
            {[
              {
                icon: '🔍',
                title: 'Be discovered',
                body: 'Be discovered by people actively searching for assessments in your area and specialism.',
              },
              {
                icon: '📅',
                title: 'Show your availability',
                body: 'Show your availability and reduce unnecessary enquiries from people you cannot see yet.',
              },
              {
                icon: '✉️',
                title: 'Get direct contact',
                body: 'Get direct contact from potential clients who are ready to book.',
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

      {/* Form */}
      <Section style={{ paddingTop: 0 }}>
        <Container style={{ maxWidth: '680px' }}>
          <OnboardingForm />
        </Container>
      </Section>

    </PageLayout>
  )
}