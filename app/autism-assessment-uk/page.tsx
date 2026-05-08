import { PageLayout, Container, Section } from "@/components/Layout";
import MethodologyBlock from "@/components/MethodologyBlock";
import EditorialAttribution from "@/components/EditorialAttribution";
import WhatThisMeans from "@/components/WhatThisMeans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autism Assessment UK | Private Autism Diagnosis | Assessment Finder",
  description:
    "Find private autism assessment providers across the UK. Compare waiting times, prices and assessment types for adults and children.",
};

export default function AutismAssessmentUKPage() {
  return (
    <PageLayout>
      <Container>
        <Section>
          <div className="max-w-4xl mx-auto py-10">

            {/* Answer Block */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Private Autism Assessment in the UK
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Private autism assessments in the UK are typically conducted by chartered
                psychologists or specialist multidisciplinary teams. Assessment for adults usually
                involves a detailed developmental history interview, structured clinical observation
                and standardised assessment tools such as the ADOS-2 or ADI-R. Costs vary
                significantly by provider and assessment complexity, typically ranging from
                £800 to £2,500.
              </p>
            </div>

            {/* Quick Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>4–12 weeks</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Typical private wait time</p>
              </div>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>£800–£2,500</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Typical assessment cost</p>
              </div>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>Adults & children</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Assessments available</p>
              </div>
            </div>

            {/* Availability Insights */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Availability Insights</h2>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '12px' }}>
              Private autism assessment availability varies considerably across the UK.
              Adult autism assessments have seen growing demand in recent years, and waiting
              times can be longer than for ADHD assessments. Some providers offer remote
              or hybrid assessment pathways, which can improve access for those outside
              major cities.
            </p>
            <WhatThisMeans>
              If you are waiting for an NHS autism assessment, a private assessment can provide
              an earlier diagnosis and access to support. Comparing providers across regions
              and considering remote options may help reduce your waiting time.
            </WhatThisMeans>
            <MethodologyBlock condition="autism" />

            {/* Comparison Section */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '2rem 0 12px' }}>
              Private vs NHS Autism Assessment
            </h2>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', border: '0.5px solid #d1dce8', borderRadius: '12px', overflow: 'hidden' }}>
                <thead style={{ background: '#f0f4f8' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#374151' }}></th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#374151' }}>Private</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#374151' }}>NHS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Waiting time</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>4–12 weeks (typical)</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Often 2–5+ years</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb', background: '#f9fafb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Cost</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>£800–£2,500</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Free at point of use</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Assessment tools</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>ADOS-2, ADI-R, clinical interview</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Varies by trust</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb', background: '#f9fafb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Report provided</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Yes</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Usually yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Remote Assessments */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '2rem 0 12px' }}>
              Remote Autism Assessments
            </h2>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '12px' }}>
              Some private autism assessment providers offer remote or hybrid pathways,
              typically involving a video-based interview and remote completion of standardised
              questionnaires. Not all providers offer fully remote autism assessments, as some
              assessments benefit from in-person observation. Where remote assessments are
              available, they can significantly improve access for individuals in areas with
              limited local provision.
            </p>
            <WhatThisMeans>
              Remote autism assessments are not available from all providers. Check each
              provider profile to confirm whether remote options are offered before making contact.
            </WhatThisMeans>

            {/* Find a Provider CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', borderRadius: '12px', padding: '1.75rem', textAlign: 'center', margin: '2rem 0' }}>
              <p style={{ color: '#fff', fontSize: '17px', fontWeight: 500, margin: '0 0 8px' }}>Find an autism assessor near you</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 0 1.25rem' }}>
                Search by location and compare providers with current availability.
              </p>
              <a href="/" style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '14px', fontWeight: 600, padding: '10px 24px', borderRadius: '8px', textDecoration: 'none' }}>
                Search assessors
              </a>
            </div>

            {/* FAQ */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '2rem 0 12px' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  q: "What does a private autism assessment involve?",
                  a: "A private autism assessment typically includes a detailed developmental history interview (often with a parent or close family member for context), structured clinical observation and standardised tools such as the ADOS-2. The process results in a written report and, where criteria are met, a formal diagnosis.",
                },
                {
                  q: "Is a private autism diagnosis accepted by schools and employers?",
                  a: "Yes. A diagnosis from a registered professional is generally accepted for the purposes of support, reasonable adjustments and access to services. Some local authorities may require additional documentation for education, health and care (EHC) plan applications.",
                },
                {
                  q: "Can adults get a private autism assessment?",
                  a: "Yes. Assessment Finder lists providers offering autism assessments for adults. Adult autism assessment has specific considerations compared to child assessments, and providers experienced in adult assessment are identified in their profiles.",
                },
                {
                  q: "How long does a private autism assessment take?",
                  a: "Autism assessments are typically more involved than ADHD assessments and may take place across more than one session. The full process, including report preparation, may take several weeks from initial appointment to receiving your report.",
                },
              ].map(({ q, a }) => (
                <div key={q} style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>{q}</h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.75, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>

            {/* Related Questions */}
            <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', margin: '1.5rem 0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 12px' }}>Related Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { q: 'How do I get a private ADHD assessment in the UK?', href: '/adhd-assessment-uk' },
                  { q: 'What does a private dyslexia assessment involve?', href: '/dyslexia-assessment-uk' },
                  { q: 'What should I look for when choosing an assessor?', href: '/articles' },
                ].map((item, i, arr) => (
                  <a key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '0.5px solid #f3f4f6' : 'none', textDecoration: 'none' }}>
                    <span style={{ fontSize: '14px', color: '#1a3a5c', fontWeight: 500 }}>{item.q}</span>
                    <span style={{ color: '#9ca3af', flexShrink: 0 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            <EditorialAttribution lastUpdated="7 May 2025" />

          </div>
        </Section>
      </Container>
    </PageLayout>
  );
}