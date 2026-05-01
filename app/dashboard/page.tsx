import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { PageLayout, Container, Section } from '@/components/Layout'
import { DashboardClient } from '@/components/DashboardClient'

export default async function DashboardPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: assessor } = await supabase
    .from('assessors')
    .select('*, availability(*)')
    .eq('auth_user_id', user.id)
    .single()

  if (!assessor) redirect('/login')

  const availability = Array.isArray(assessor.availability)
    ? assessor.availability[0] ?? null
    : assessor.availability ?? null

  return (
    <PageLayout>
      <div style={{ background: '#1a3a5c', padding: '2rem 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 4px' }}>Assessor dashboard</p>
              <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 500, margin: 0 }}>
                Welcome back, {assessor.name.split(' ')[0]}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={`/assessor/${assessor.id}`} target="_blank" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', border: '0.5px solid rgba(255,255,255,0.3)', padding: '7px 14px', borderRadius: '8px' }}>
                View public profile →
              </a>
            </div>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <DashboardClient assessor={{ ...assessor, availability }} />
        </Container>
      </Section>
    </PageLayout>
  )
}