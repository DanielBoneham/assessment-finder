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
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            Join Assessment Finder and connect with people actively searching for ADHD, autism and dyslexia assessments. Early members get priority visibility at no cost.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 16px' }}>
            <span style={{ color: '#4ade80', fontSize: '14px' }}>✓</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
              All profiles reviewed before publication to ensure quality and professional standards.
            </span>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.25rem', textAlign: 'center' }}>
            What you get
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '2.5rem' }}>
            {[
              {
                icon: '🔝',
                title: 'Priority visibility',
                body: 'Early members appear at the top of search results in their area, ahead of later listings.',
              },
              {
                icon: '📅',
                title: 'Availability highlighting',
                body: 'Your availability is shown prominently on every card and profile so clients can see at a glance if you can help them.',
              },
              {
                icon: '📍',
                title: 'Increased local discovery',
                body: 'Your profile appears on dedicated location pages like "ADHD assessment London" — exactly where people are searching.',
              },
              {
                icon: '✉️',
                title: 'Direct client contact',
                body: 'Clients can message you directly through your profile. No middlemen, no delays.',
              },
            ].map((benefit) => (
              <div key={benefit.title} style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
                <div style={{ fontSize: '22px', marginBottom: '0.75rem' }}>{benefit.icon}</div>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>{benefit.title}</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{benefit.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1.25rem', textAlign: 'center' }}>
              How your profile appears
            </p>
            <div style={{ maxWidth: '320px', margin: '0 auto', background: '#fff', borderRadius: '12px', border: '2px solid #4ade80', padding: '1.25rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
              <div style={{ background: '#dcfce7', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#166534', margin: 0 }}>Available within 2 weeks</p>
                </div>
                <p style={{ fontSize: '11px', color: '#166534', margin: '0 0 0 16px', opacity: 0.75 }}>Updated today</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#e8f0fa', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  👤
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>Dr Jane Smith</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>Clinical Psychologist</p>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 10px' }}>London</p>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                <span style={{ background: '#e8f0fa', color: '#1a3a5c', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>ADHD</span>
                <span style={{ background: '#e8f0fa', color: '#1a3a5c', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>Adults</span>
              </div>
              <div style={{ background: '#f0f4f8', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', fontSize: '13px', fontWeight: 500, color: '#1a3a5c' }}>
                View profile
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '2rem' }}>
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

      <Section style={{ paddingTop: 0 }}>
        <Container style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>
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