'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PageLayout, Container, Section } from '@/components/Layout'
import { DashboardClient } from '@/components/DashboardClient'

export default function DashboardPage() {
  const [assessor, setAssessor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = '/login'
        return
      }

      const { data } = await supabase
        .from('assessors')
        .select('*, availability(*)')
        .eq('auth_user_id', user.id)
        .single()

      if (!data) {
        window.location.href = '/login'
        return
      }

      const availability = Array.isArray(data.availability)
        ? data.availability[0] ?? null
        : data.availability ?? null

      setAssessor({ ...data, availability })
      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return (
      <div style={{ background: '#f0f4f8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading your dashboard...</p>
      </div>
    )
  }

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
            <a href={`/assessor/${assessor.id}`} target="_blank" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', border: '0.5px solid rgba(255,255,255,0.3)', padding: '7px 14px', borderRadius: '8px' }}>
              View public profile →
            </a>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <DashboardClient assessor={assessor} />
        </Container>
      </Section>
    </PageLayout>
  )
}