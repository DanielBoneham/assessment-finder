'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Mode = 'login' | 'reset'
type Status = 'idle' | 'loading' | 'error' | 'reset-sent' | 'success'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = '/dashboard'
    })
  }, [])

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
    setStatus('success')
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) {
      setErrorMessage('Could not send reset email. Please check the address and try again.')
      setStatus('error')
      return
    }
    setStatus('reset-sent')
  }

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ background: '#1a3a5c', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '17px', fontWeight: 500, color: '#fff' }}>Assessment<span style={{ color: '#4ade80' }}>Finder</span></span>
        </a>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {status === 'success' && (
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '20px' }}>✓</div>
              <p style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>Signed in successfully</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 1.5rem' }}>Click below to go to your dashboard.</p>
              <a href="/dashboard" style={{ display: 'block', height: '46px', lineHeight: '46px', background: '#1a3a5c', color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>Go to dashboard</a>
            </div>
          )}

          {status !== 'success' && mode === 'login' && (
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
              <div style={{ background: '#1a3a5c', padding: '1.75rem' }}>
                <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 500, margin: '0 0 4px' }}>Assessor login</h1>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', margin: 0 }}>Sign in to manage your profile and availability.</p>
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
              <div style={{ borderTop: '0.5px solid #e5e7eb', padding: '1.25rem 1.75rem', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  Not yet listed?{' '}
                  <a href="/list-your-practice" style={{ color: '#1a3a5c', fontWeight: 500, textDecoration: 'none' }}>Create your free profile</a>
                </p>
              </div>
            </div>
          )}

          {status !== 'success' && mode === 'reset' && status !== 'reset-sent' && (
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
              <div style={{ background: '#1a3a5c', padding: '1.75rem' }}>
                <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 500, margin: '0 0 4px' }}>Reset your password</h1>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', margin: 0 }}>Enter your email and we will send you a reset link.</p>
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
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 1.25rem' }}>We have sent a password reset link to <strong>{email}</strong>.</p>
              <button onClick={() => { setMode('login'); setStatus('idle') }} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#1a3a5c', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Back to login</button>
            </div>
          )}

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