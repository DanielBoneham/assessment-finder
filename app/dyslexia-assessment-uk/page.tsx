import { PageLayout, Container, Section } from "@/components/Layout";
import MethodologyBlock from "@/components/MethodologyBlock";
import EditorialAttribution from "@/components/EditorialAttribution";
import WhatThisMeans from "@/components/WhatThisMeans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dyslexia Assessment UK | Private Dyslexia Testing | Assessment Finder",
  description:
    "Find private dyslexia assessment providers across the UK. Compare waiting times, prices and assessment types for adults and children.",
};

export default function DyslexiaAssessmentUKPage() {
  return (
    <PageLayout>
      <Container>
        <Section>
          <div className="max-w-4xl mx-auto py-10">

            {/* Answer Block */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Private Dyslexia Assessment in the UK
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Private dyslexia assessments in the UK are carried out by specialist assessors,
                typically chartered psychologists or specialist teachers holding an Assessment
                Practising Certificate (APC). A full assessment involves standardised literacy,
                phonological and cognitive tests and results in a detailed diagnostic report.
                Costs typically range from £400 to £900.
              </p>
            </div>

            {/* Quick Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>1–4 weeks</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Typical private wait time</p>
              </div>
              <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1a3a5c', margin: '0 0 4px' }}>£400–£900</p>
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
              Private dyslexia assessments are generally more readily available than ADHD or
              autism assessments, with shorter waiting times across most regions. Availability
              varies between providers and is subject to change. Remote dyslexia assessments
              are available from some providers, broadening access for those in areas with
              limited local provision.
            </p>
            <WhatThisMeans>
              Dyslexia assessments tend to have shorter waiting times than other assessment
              types. If you need an assessment for workplace or educational purposes, starting
              with a provider who offers remote assessments may give you the quickest access.
            </WhatThisMeans>
            <MethodologyBlock condition="dyslexia" />

            {/* Comparison Section */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '2rem 0 12px' }}>
              Who Can Assess for Dyslexia?
            </h2>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', border: '0.5px solid #d1dce8', borderRadius: '12px', overflow: 'hidden' }}>
                <thead style={{ background: '#f0f4f8' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#374151' }}>Assessor type</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#374151' }}>Can diagnose?</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, color: '#374151' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Chartered Psychologist</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Yes</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Full diagnostic report</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb', background: '#f9fafb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Specialist Teacher (APC)</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Yes</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Accepted for most educational and employment purposes</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 500 }}>Educational Psychologist</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Yes</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>Often required for EHC plan assessments</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Remote Assessments */}
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '2rem 0 12px' }}>
              Remote Dyslexia Assessments
            </h2>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '12px' }}>
              Remote dyslexia assessments are available from a growing number of providers.
              These assessments are typically conducted via video call using digital versions
              of standardised tests. Remote assessments are suitable for most adults seeking
              a dyslexia assessment for workplace or higher education purposes.
            </p>
            <WhatThisMeans>
              Remote dyslexia assessments are widely accepted by universities and employers
              for reasonable adjustments. Confirm with your provider that their remote
              assessment meets the requirements of your specific institution or employer.
            </WhatThisMeans>

            {/* Find a Provider CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', borderRadius: '12px', padding: '1.75rem', textAlign: 'center', margin: '2rem 0' }}>
              <p style={{ color: '#fff', fontSize: '17px', fontWeight: 500, margin: '0 0 8px' }}>Find a dyslexia assessor near you</p>
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
                  q: "What does a private dyslexia assessment involve?",
                  a: "A dyslexia assessment involves standardised tests of reading, writing, spelling, phonological processing and cognitive ability. The assessor will also take a background history. The process typically takes two to three hours and results in a written diagnostic report.",
                },
                {
                  q: "Is a private dyslexia assessment accepted by universities?",
                  a: "Yes. Most UK universities accept a dyslexia diagnosis from a chartered psychologist or a specialist teacher with an Assessment Practising Certificate (APC) for the purposes of Disabled Students' Allowance (DSA) and reasonable adjustments.",
                },
                {
                  q: "Do I need a dyslexia assessment for workplace support?",
                  a: "A formal assessment and report is the most reliable way to access workplace reasonable adjustments under the Equality Act 2010. Some employers may accept an existing report if it is recent enough.",
                },
                {
                  q: "Can children get a private dyslexia assessment?",
                  a: "Yes. Many providers on Assessment Finder offer dyslexia assessments for children. Assessment approaches differ for children and adults, and providers experienced in child assessment are identified in their profiles.",
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
                  { q: 'How do I get a private autism assessment in the UK?', href: '/autism-assessment-uk' },
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