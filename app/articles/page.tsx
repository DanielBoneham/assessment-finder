import { ARTICLES, formatDate } from '@/lib/articles'
import { PageLayout, Container, Section } from '@/components/Layout'

export const metadata = {
  title: 'Articles | Assessment Finder',
  description: 'Guides and information about ADHD, autism and dyslexia assessments in the UK.',
}

export default function ArticlesPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '2.5rem 0 3rem' }}>
        <Container>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, margin: '0 0 8px' }}>
            Articles
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: 0 }}>
            Guides and information about assessments in the UK.
          </p>
        </Container>
      </div>

      {/* Article list */}
      <Section>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {ARTICLES.map((article) => (
              
                key={article.slug}
                href={`/articles/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem', transition: 'border-color 0.15s' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {formatDate(article.publishedDate)}
                  </p>
                  <h2 style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>
                    {article.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.6 }}>
                    {article.metaDescription}
                  </p>
                  <span style={{ fontSize: '13px', color: '#1a3a5c', fontWeight: 500 }}>
                    Read article →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

    </PageLayout>
  )
}