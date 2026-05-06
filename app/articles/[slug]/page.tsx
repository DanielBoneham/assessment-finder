import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticleBySlug, ARTICLES, formatDate, renderParagraph } from '@/lib/articles'
import { PageLayout, Container, Section } from '@/components/Layout'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | Assessment Finder`,
    description: article.metaDescription,
  }
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const relatedQuestions = [
    { q: 'How long does an ADHD assessment take?', href: '/articles/what-happens-during-an-autism-assessment' },
    { q: 'What is the difference between NHS and private assessments?', href: '/articles/nhs-vs-private-assessment-uk' },
    { q: 'How much does a private ADHD assessment cost?', href: '/articles/adhd-assessment-waiting-times-uk' },
    { q: 'Can I get a dyslexia assessment as an adult?', href: '/articles/dyslexia-assessment-uk-guide' },
    { q: 'Where can I find an assessor near me?', href: '/' },
  ].filter((q) => q.href !== `/articles/${slug}`)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: relatedQuestions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Find out more on Assessment Finder, the UK directory for ADHD, autism and dyslexia assessors.',
      },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Assessment Finder',
      url: 'https://www.assessmentfinder.co.uk',
    },
  }

  return (
    <PageLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', padding: '2.5rem 0 3rem' }}>
        <Container style={{ maxWidth: '720px' }}>
          <a href="/articles" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            Back to articles
          </a>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 12px', lineHeight: 1.35 }}>
            {article.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>
            {formatDate(article.publishedDate)}
          </p>
        </Container>
      </div>

      <Section>
        <Container style={{ maxWidth: '720px' }}>

          {/* Article content */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '2rem', marginBottom: '1.25rem' }}>
            {article.content.map((para, i) => {
              const rendered = renderParagraph(para)
              return (
                <p key={i} style={{ fontSize: '16px', color: '#374151', lineHeight: 1.85, marginBottom: i < article.content.length - 1 ? '1.25rem' : 0 }}>
                  {'text' in rendered ? (
                    rendered.text
                  ) : (
                    <>
                      {rendered.before}
                      <a href={rendered.href} style={{ color: '#1a3a5c', fontWeight: 500, textDecoration: 'underline' }}>
                        {rendered.anchor}
                      </a>
                      {rendered.after}
                    </>
                  )}
                </p>
              )
            })}
          </div>

          {/* Related questions */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
              Related questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {relatedQuestions.map((item, i) => (
                <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < relatedQuestions.length - 1 ? '0.5px solid #f3f4f6' : 'none', textDecoration: 'none', gap: '12px' }}>
                  <p style={{ fontSize: '14px', color: '#1a3a5c', margin: 0, fontWeight: 500 }}>{item.q}</p>
                  <span style={{ color: '#9ca3af', flexShrink: 0 }}>→</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <a href="/articles" style={{ fontSize: '14px', color: '#1a3a5c', textDecoration: 'none', fontWeight: 500 }}>
              Back to all articles
            </a>
          </div>

          {/* Find assessor CTA */}
          <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e4a72 100%)', borderRadius: '12px', padding: '1.75rem', textAlign: 'center', marginBottom: '1.25rem' }}>
            <p style={{ color: '#fff', fontSize: '17px', fontWeight: 500, margin: '0 0 8px' }}>
              Find an assessor near you
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 0 1.25rem' }}>
              Search by location and see who has availability in the next few weeks.
            </p>
            <a href="/" style={{ display: 'inline-block', background: '#4ade80', color: '#1a3a5c', fontSize: '14px', fontWeight: 600, padding: '10px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              Search assessors
            </a>
          </div>

          {/* For assessors CTA */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem' }}>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>
              Are you an assessor?
            </p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px' }}>
              List your practice for free and get discovered by people searching for assessments near them.
            </p>
            <a href="/list-your-practice" style={{ display: 'inline-block', background: '#1a3a5c', color: '#fff', fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '8px', textDecoration: 'none' }}>
              List your practice
            </a>
          </div>

        </Container>
      </Section>

    </PageLayout>
  )
}