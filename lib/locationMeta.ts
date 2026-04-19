// Generates page-level SEO copy for each condition + city combination.
// Add more cities or conditions here as the directory grows.

export type Condition = 'adhd' | 'autism' | 'dyslexia'

export interface LocationPageMeta {
  condition: Condition
  conditionLabel: string        // "ADHD"
  city: string                  // "London" (display)
  pageTitle: string             // <title> tag
  metaDescription: string       // <meta description>
  h1: string
  intro: string                 // paragraph below the summary bar
  seoBody: string               // longer SEO block at bottom
}

export function buildLocationMeta(
  conditionSlug: string,
  citySlug: string
): LocationPageMeta | null {
  const condition = conditionSlug as Condition
  const city = slugToTitle(citySlug)

  if (!['adhd', 'autism', 'dyslexia'].includes(condition)) return null

  const conditionLabel = CONDITION_LABELS[condition]

  return {
    condition,
    conditionLabel,
    city,
    pageTitle: `${conditionLabel} Assessment ${city} | Assessment Finder`,
    metaDescription: `Find private ${conditionLabel} assessors in ${city}. Compare availability, price, and credentials. Book faster than the NHS.`,
    h1: `${conditionLabel} Assessment in ${city}`,
    intro: `Private ${conditionLabel} assessors in ${city}, with real availability. All practitioners are registered with a recognised governing body.`,
    seoBody: SEO_BODY[condition](city),
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CONDITION_LABELS: Record<Condition, string> = {
  adhd:     'ADHD',
  autism:   'Autism',
  dyslexia: 'Dyslexia',
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ─── SEO copy per condition ───────────────────────────────────────────────────

const SEO_BODY: Record<Condition, (city: string) => string> = {
  adhd: (city) => `
Getting an ADHD assessment in ${city} through the NHS typically involves a long wait — often 18 months to 3 years depending on your local trust. Private assessors in ${city} can significantly reduce this, with many offering appointments within weeks.

A private ADHD assessment in the UK usually involves a clinical interview, validated rating scales such as the Conners or DIVA, and a written report confirming or ruling out a diagnosis. Most assessors listed here are clinical psychologists, consultant psychiatrists, or specialist nurses registered with the BPS, GMC, or NMC.

Prices for a private ADHD assessment in ${city} typically range from £500 to £1,500 depending on the assessor's qualifications, the depth of the assessment, and whether it covers co-occurring conditions such as anxiety or autism. Assessment Finder shows real availability so you can find someone who can see you quickly.
  `.trim(),

  autism: (city) => `
Autism assessments in ${city} are available privately for both adults and children. NHS waiting lists for autism diagnosis in England can exceed 3 years in some areas. Private assessors can often offer appointments within weeks or months.

A private autism assessment in the UK involves a structured clinical interview (such as the ADOS-2 or ADI-R), observation, and a detailed report. Most assessors work with both children and adults, though some specialise in one group — check the tags on each profile.

Costs for a private autism assessment in ${city} generally range from £800 to £2,000. Assessment Finder shows verified practitioners with current availability so you can make an informed choice.
  `.trim(),

  dyslexia: (city) => `
A dyslexia assessment in ${city} identifies specific learning differences that affect reading, writing, and processing. Assessments are carried out by educational psychologists or specialist teachers with an Assessment Practising Certificate (APC).

Private dyslexia assessments are commonly sought for school-age children, university students applying for DSA support, and adults in the workplace. A full diagnostic assessment results in a written report that can be used to access accommodations such as extra time in exams.

Prices in ${city} typically range from £400 to £900. Assessment Finder lists qualified assessors with real availability so you can book without a long wait.
  `.trim(),
}
