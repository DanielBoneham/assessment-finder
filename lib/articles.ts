export interface Article {
  slug: string
  title: string
  metaDescription: string
  publishedDate: string
  content: ArticleParagraph[]
}

export interface ArticleParagraph {
  text: string
  links?: { anchor: string; href: string }[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'adhd-assessment-waiting-times-uk',
    title: 'ADHD Assessment Waiting Times in the UK',
    metaDescription: 'How long does an ADHD assessment take in the UK? We explain NHS and private waiting times and how to find faster availability.',
    publishedDate: '2026-04-01',
    content: [
      { text: 'ADHD assessment waiting times in the UK can vary significantly depending on whether you go through the NHS or a private provider.' },
      { text: 'NHS waiting times can often exceed 6 to 12 months in many areas due to high demand and limited specialist capacity. In some regions, waiting lists may be even longer.' },
      { text: 'Private ADHD assessments are typically much faster. Many providers offer availability within a few weeks to a few months, depending on demand and location.', links: [{ anchor: 'Private ADHD assessments', href: '/adhd-assessment-london' }] },
      { text: 'The assessment process itself is usually completed over one to three appointments. This may include an initial consultation, structured questionnaires, and a detailed clinical evaluation.' },
      { text: 'Because availability differs between providers, many people choose to compare assessors to find those with shorter waiting times.', links: [{ anchor: 'compare assessors', href: '/' }] },
      { text: 'Assessment Finder helps you identify ADHD assessors with current availability, so you can access support sooner.', links: [{ anchor: 'ADHD assessors', href: '/' }] },
    ],
  },
  {
    slug: 'what-happens-during-an-autism-assessment',
    title: 'What Happens During an Autism Assessment?',
    metaDescription: 'Find out what to expect during a private autism assessment in the UK, including the process, timing, and how to find an assessor.',
    publishedDate: '2026-04-05',
    content: [
      { text: 'An autism assessment is designed to understand how a person communicates, interacts, and experiences the world.' },
      { text: 'The process usually involves a detailed consultation, structured questionnaires, and sometimes input from family members or carers. Clinicians may explore developmental history, behaviour patterns, and communication style.' },
      { text: 'Assessments can take place over one or more sessions and may be conducted in person or remotely, depending on the provider.', links: [{ anchor: 'conducted in person or remotely', href: '/autism-assessment-london' }] },
      { text: 'The exact process can vary, but most assessments aim to build a comprehensive picture rather than relying on a single test.' },
      { text: 'Waiting times vary significantly depending on demand. Some providers may have availability within a few weeks, while others may have longer waiting lists.', links: [{ anchor: 'availability within a few weeks', href: '/' }] },
      { text: 'Using a directory that shows availability can help you find an assessor who can see you sooner and reduce delays in accessing support.', links: [{ anchor: 'find an assessor', href: '/' }] },
    ],
  },
  {
    slug: 'nhs-vs-private-assessment-uk',
    title: 'NHS vs Private Assessment: What\'s the Difference?',
    metaDescription: 'Comparing NHS and private ADHD, autism and dyslexia assessments in the UK — costs, waiting times, and how to decide.',
    publishedDate: '2026-04-10',
    content: [
      { text: 'There are two main routes to getting an ADHD, autism, or dyslexia assessment in the UK: through the NHS or through a private provider.' },
      { text: 'NHS assessments are typically free at the point of access, but waiting times are often long due to high demand. In many areas, people may wait several months or longer for an appointment.' },
      { text: 'Private assessments involve paying for the service, but they usually offer significantly shorter waiting times. Many providers can offer appointments within weeks rather than months.', links: [{ anchor: 'Private assessments', href: '/adhd-assessment-london' }] },
      { text: 'Private assessments may also provide more flexibility in scheduling and choice of clinician, including remote options.', links: [{ anchor: 'remote options', href: '/autism-assessment-london' }] },
      { text: 'For many people, the decision comes down to urgency, budget, and availability.' },
      { text: 'Assessment Finder allows you to compare private assessors and see who is currently available, helping you make a more informed decision.', links: [{ anchor: 'compare private assessors', href: '/' }] },
    ],
  },
  {
    slug: 'dyslexia-assessment-uk-guide',
    title: 'A Guide to Dyslexia Assessments in the UK',
    metaDescription: 'Everything you need to know about getting a dyslexia assessment in the UK — who carries them out, what to expect, and how to find an assessor.',
    publishedDate: '2026-04-15',
    content: [
      { text: 'A dyslexia assessment identifies specific learning differences that affect reading, writing, spelling, and information processing.' },
      { text: 'Assessments are carried out by educational psychologists or specialist teachers who hold an Assessment Practising Certificate (APC). Both are qualified to produce a diagnostic report.' },
      { text: 'The assessment typically involves a range of tasks and tests covering reading accuracy, reading speed, spelling, phonological awareness, and working memory. The process usually takes two to three hours.' },
      { text: 'A formal diagnostic report is produced following the assessment. This report can be used to access support at school, university, or in the workplace — including exam accommodations such as extra time.' },
      { text: 'Private dyslexia assessments are commonly sought for school-age children, university students applying for Disabled Students Allowance (DSA), and adults who want formal confirmation of their difficulties.', links: [{ anchor: 'Private dyslexia assessments', href: '/dyslexia-assessment-london' }] },
      { text: 'Assessment Finder lists qualified assessors with real availability so you can find someone who can see you soon.', links: [{ anchor: 'Assessment Finder lists qualified assessors', href: '/' }] },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function renderParagraph(para: ArticleParagraph): { before: string; anchor: string; href: string; after: string } | { text: string } {
  if (!para.links || para.links.length === 0) return { text: para.text }
  const link = para.links[0]
  const index = para.text.indexOf(link.anchor)
  if (index === -1) return { text: para.text }
  return {
    before: para.text.slice(0, index),
    anchor: link.anchor,
    href: link.href,
    after: para.text.slice(index + link.anchor.length),
  }
}