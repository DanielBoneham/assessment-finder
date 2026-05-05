'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DashboardClient } from '@/components/DashboardClient'

type Mode = 'login' | 'reset'
type Status = 'idle' | 'loading' | 'error' | 'reset-sent'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [assessor, setAssessor] = useState<any>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.session) {
      setErrorMessage('Incorrect email or password. Please try again.')
      setStatus('error')
      return
    }

    const { data: assessorData } = await supabase
      .from('assessors')
      .select('*, availability(*)')
      .eq('auth_user_id', data.session.user.id)
      .single()

    if (!assessorData) {
      setErrorMessage('No assessor profile found for this account.')
      setStatus('error')
      return
    }

    const availability = Array.isArray(assessorData.availability)
      ? assessorData.availability[0] ?? null
      : assessorData.availability ?? null

    setAssessor({ ...assessorData, availability })
    setStatus('idle')
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) {
      setErrorMessage('Could not send reset email. Please try again.')
      setStatus('error')
      return
    }
    setStatus('reset-sent')
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setAssessor(null)
    setEmail('')
    setPassword('')
  }

  if (assessor) {
    return (
      <div style={{ background: '#f0f4f8', minHeight: '100vh' }}>
        <nav style={{ background: '#1a3a5c', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '17px', fontWeight: 500, color: '#fff' }}>Assessment<span style={{ color: '#4ade80' }}>Finder</span></span>
          </a>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href={`/assessor/${assessor.id}`} target="_blank" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', border: '0.5px solid rgba(255,255,255,0.3)', padding: '6px 12px', borderRadius: '8px' }}>
              View profile →
            </a>
            <button onClick={handleSignOut} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', background: 'none', border: '0.5px solid rgba(255,255,255,0.3)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
              Sign out
            </button>
          </div>
        </nav>
        <div style={{ background: '#1a3a5c', padding: '1.5rem 2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 4px' }}>Assessor dashboard</p>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 500, margin: 0 }}>
            Welcome back, {assessor.name.split(' ')[0]}
          </h1>
        </div>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <DashboardClient assessor={assessor} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ background: '#1a3a5c', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '17px', fontWeight: 500, color: '#fff' }}>Assessment<span style={{ color: '#4ade80' }}>Finder</span></span>
        </a>
        <a href="/" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
          Back to directory
        </a>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>

        {/* Left panel */}
        <div style={{ flex: 1, background: '#1a3a5c', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(74,222,128,0.15)', border: '0.5px solid rgba(74,222,128,0.4)', borderRadius: '20px', padding: '4px 12px', marginBottom: '1.5rem' }}>
              <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 500 }}>Assessor portal</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 500, lineHeight: 1.35, margin: '0 0 1rem' }}>
              Manage your profile and stay visible to new clients
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.7, margin: '0 0 2rem' }}>
              Log in to update your availability, manage your profile, and connect with people actively searching for assessments.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📅', title: 'Update availability instantly', body: 'Keep your availability current so clients can find you when you have space.' },
                { icon: '📍', title: 'Improve your visibility', body: 'Active profiles with updated availability appear more prominently in search results.' },
                { icon: '👤', title: 'Manage your profile easily', body: 'Update your bio, credentials, pricing, and photo from one simple dashboard.' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, margin: '0 0 2px' }}>{item.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '0 0 8px' }}>Not yet listed?</p>
              <a href="/list-your-practice" style={{ color: '#4ade80', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                Create your free profile →
              </a>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div style={{ width: '420px', flexShrink: 0, background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ width: '100%', maxWidth: '360px' }}>

            {mode === 'login' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
                <div style={{ padding: '1.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', margin: '0 0 4px' }}>Sign in</h2>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Enter your email and password below.</p>
                </div>
                <form onSubmit={handleLogin} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Email address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" style={inputStyle} />
                  </div>
                  {status === 'error' && (
                    <div style={{ background: '#fee2e2', border: '0.5px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991b1b' }}>{errorMessage}</div>
                  )}
                  <button type="submit" disabled={status === 'loading'} style={{ height: '46px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Signing in...' : 'Sign in'}
                  </button>
                  <button type="button" onClick={() => { setMode('reset'); setErrorMessage(''); setStatus('idle') }} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit', padding: 0, textAlign: 'center' }}>
                    Forgot your password?
                  </button>
                </form>
              </div>
            )}

            {mode === 'reset' && status !== 'reset-sent' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
                <div style={{ padding: '1.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', margin: '0 0 4px' }}>Reset password</h2>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Enter your email and we will send a reset link.</p>
                </div>
                <form onSubmit={handleReset} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Email address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" style={inputStyle} />
                  </div>
                  {status === 'error' && (
                    <div style={{ background: '#fee2e2', border: '0.5px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991b1b' }}>{errorMessage}</div>
                  )}
                  <button type="submit" disabled={status === 'loading'} style={{ height: '46px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {status === 'loading' ? 'Sending...' : 'Send reset link'}
                  </button>
                  <button type="button" onClick={() => setMode('login')} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit', padding: 0, textAlign: 'center' }}>
                    Back to login
                  </button>
                </form>
              </div>
            )}

            {status === 'reset-sent' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '20px' }}>✓</div>
                <p style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>Check your email</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 1.25rem' }}>We have sent a reset link to <strong>{email}</strong>.</p>
                <button onClick={() => { setMode('login'); setStatus('idle') }} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#1a3a5c', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Back to login</button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '44px',
  border: '0.5px solid #d1d5db',
  borderRadius: '8px',
  padding: '0 12px',
  fontSize: '14px',
  fontFamily: 'inherit',
  background: '#fff',
  color: '#111827',
  boxSizing: 'border-box',
}