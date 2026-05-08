import { PageLayout, Container, Section } from "@/components/Layout";
import EditorialAttribution from "@/components/EditorialAttribution";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Standards | Assessment Finder",
  description:
    "How Assessment Finder reviews, verifies and publishes information about ADHD, autism and dyslexia assessment providers in the UK.",
};

export default function EditorialStandardsPage() {
  return (
    <PageLayout>
      <Container>
        <Section>
          <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Editorial Standards</h1>
            <p className="text-gray-500 text-sm mb-8">
              How we review, verify and publish information on Assessment Finder.
            </p>

            <div className="prose prose-gray max-w-none space-y-10">

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed">
                  Assessment Finder is a directory of private ADHD, autism and dyslexia assessment
                  providers in the UK. Our goal is to provide accurate, up-to-date and factual
                  information to help individuals and families find the right assessment service.
                  We are committed to transparency about how our data is collected, reviewed and
                  presented.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Provider Profiles</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  All provider profiles on Assessment Finder are submitted directly by the assessor
                  or their practice. Profile information — including name, qualifications, governing
                  body registration, conditions assessed, assessment types offered and pricing —
                  is self-reported.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Assessment Finder reviews submitted profiles for completeness and internal
                  consistency before publishing. We do not independently verify every claim made
                  by providers, but we do check that:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-600 text-sm">
                  <li>The governing body name and registration number format appear valid</li>
                  <li>Contact information is present and correctly formatted</li>
                  <li>The profile contains sufficient information to be useful to users</li>
                  <li>No content appears misleading or in breach of our listing guidelines</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Verified profiles (shown with a verification badge) have undergone additional
                  manual review by the Assessment Finder team.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Availability Data</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Availability information — including waiting times and next available appointment
                  dates — is submitted directly by providers through their Assessment Finder
                  dashboard. This data is self-reported and reflects what the provider has entered
                  at the time of their most recent update.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Availability data is not verified in real time. Assessment Finder displays the
                  date of the most recent update alongside availability information so users can
                  judge how current it is. We encourage providers to update their availability
                  regularly and may remove or flag stale data where appropriate.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Editorial Content</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Articles, guides and informational pages on Assessment Finder are written and
                  reviewed by the Assessment Finder editorial team. This content is distinct from
                  provider-submitted profile data.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Editorial content aims to:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-600 text-sm">
                  <li>Provide factual, accessible information about the assessment process</li>
                  <li>Explain what to expect from private assessments in the UK</li>
                  <li>Help users understand the differences between assessment types and providers</li>
                  <li>Summarise availability trends based on current listed provider data</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  All editorial content displays a last-updated date and is reviewed periodically
                  for accuracy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">How Updates Are Processed</h2>
                <p className="text-gray-600 leading-relaxed">
                  Providers can update their profile and availability information at any time via
                  their Assessment Finder dashboard. Updates are reflected on the site promptly
                  after submission. Assessment Finder does not edit provider-submitted content
                  unless it appears to breach our listing guidelines, in which case we may contact
                  the provider to request changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Corrections and Complaints</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you believe information on Assessment Finder is inaccurate, outdated or
                  misleading, please contact us. We take accuracy seriously and will review any
                  concerns promptly. Corrections to editorial content are made as soon as possible
                  following verification.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Commercial Relationships</h2>
                <p className="text-gray-600 leading-relaxed">
                  Assessment Finder operates as a paid directory service. Providers may pay a
                  subscription fee to list their practice. Commercial relationships do not
                  influence editorial content or the order in which providers are displayed in
                  search results, which is based on availability data and other non-commercial
                  factors.
                </p>
              </section>

            </div>

            <div className="mt-10">
              <EditorialAttribution lastUpdated="7 May 2025" />
            </div>
          </div>
        </Section>
      </Container>
    </PageLayout>
  );
}