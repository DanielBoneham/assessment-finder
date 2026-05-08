import { PageLayout, Container, Section } from "@/components/Layout";
import MethodologyBlock from "@/components/MethodologyBlock";
import EditorialAttribution from "@/components/EditorialAttribution";
import WhatThisMeans from "@/components/WhatThisMeans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADHD Assessment UK | Private ADHD Diagnosis | Assessment Finder",
  description:
    "Find private ADHD assessment providers across the UK. Compare waiting times, prices and assessment types. In-person and remote assessments available.",
};

export default function ADHDAssessmentUKPage() {
  return (
    <PageLayout>
      <Container>
        <Section>
          <div className="max-w-4xl mx-auto py-10">

            {/* Answer Block */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Private ADHD Assessment in the UK
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Private ADHD assessments in the UK are typically carried out by chartered
                psychologists, psychiatrists or specialist ADHD clinics. A full assessment
                usually includes a structured clinical interview, standardised rating scales and,
                where appropriate, cognitive testing. Assessments are available in-person and
                remotely. Costs vary by provider, typically ranging from £500 to £1,800.
              </p>
            </div>

            {/* Quick Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>2–8 weeks</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Typical private wait time</p>
              </div>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>£500–£1,800</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Typical assessment cost</p>
              </div>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>In-person & remote</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Assessment formats available</p>
              </div>
            </div>

            {/* Availability Insights */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Availability Insights</h2>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '12px' }}>
              ADHD assessment availability across the UK has improved slightly in recent months,
              with a growing number of providers offering remote assessments that extend access
              beyond major cities. Waiting times remain variable between providers, with some
              offering appointments within days and others quoting several weeks.
            </p>
            <WhatThisMeans>
              People looking for faster ADHD assessments may benefit from comparing providers
              across nearby cities or considering remote assessments, which often have shorter
              waiting times than in-person appointments.
            </WhatThisMeans>
            <MethodologyBlock condition="ADHD" />

            {/* Comparison Section */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '2rem 0 12px' }}>
              Private vs NHS ADHD Assessment
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
                    <td style={{ padding: '12px 16px', color: '#374151' }}>2–8 weeks (typical)</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>12–36+ months (varies by area)</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb', background: '#f9fafb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Cost</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>£500–£1,800</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Free at point of use</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Remote option</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Often available</td>
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
              Remote ADHD Assessments
            </h2>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '12px' }}>
              Many private ADHD assessment providers in the UK now offer fully remote assessments
              conducted via video call. Remote assessments follow the same clinical process as
              in-person appointments and result in the same diagnostic report. They are
              particularly useful for people in areas with limited local provision or those
              who prefer to be assessed at home.
            </p>
            <WhatThisMeans>
              If no local providers have immediate availability, filtering for remote assessments
              significantly widens your options and may reduce your waiting time.
            </WhatThisMeans>

            {/* Find a Provider CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', borderRadius: '12px', padding: '1.75rem', textAlign: 'center', margin: '2rem 0' }}>
              <p style={{ color: '#fff', fontSize: '17px', fontWeight: 500, margin: '0 0 8px' }}>Find an ADHD assessor near you</p>
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
                  q: "What does a private ADHD assessment involve?",
                  a: "A private ADHD assessment typically includes a structured clinical interview covering your history and current difficulties, standardised rating scales completed by you and sometimes a third party, and in some cases cognitive or neuropsychological testing. The assessment results in a written report and, where appropriate, a formal diagnosis.",
                },
                {
                  q: "Is a private ADHD diagnosis accepted by employers and educational institutions?",
                  a: "Yes. A diagnosis from a registered professional — such as a chartered psychologist or psychiatrist — is generally accepted by employers, universities and other institutions for the purposes of reasonable adjustments and support.",
                },
                {
                  q: "Can I get medication after a private ADHD assessment?",
                  a: "Yes. If medication is recommended, your assessing clinician may prescribe directly or produce a report supporting your GP to prescribe under a shared-care agreement. Arrangements vary by provider.",
                },
                {
                  q: "How long does a private ADHD assessment take?",
                  a: "Most assessments take between two and four hours, sometimes split across more than one appointment. Preparation time for the report is additional.",
                },
                {
                  q: "Are remote ADHD assessments as valid as in-person ones?",
                  a: "Yes. Remote ADHD assessments conducted by registered professionals follow the same clinical standards as in-person assessments and carry the same diagnostic validity.",
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
                  { q: 'How do I get a private autism assessment in the UK?', href: '/autism-assessment-uk' },
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