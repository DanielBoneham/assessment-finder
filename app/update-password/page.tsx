'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    if (password !== confirm) {
      setErrorMessage('Passwords do not match.')
      setStatus('error')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.')
      setStatus('error')
      return
    }

    setStatus('loading')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setErrorMessage(error.message)
      setStatus('error')
      return
    }

    setStatus('success')
    setTimeout(() => { window.location.href = '/dashboard' }, 2000)
  }

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: '#1a3a5c', padding: '0 2rem', height: '60px', display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '17px', fontWeight: 500, color: '#fff' }}>
            Assessment<span style={{ color: '#4ade80' }}>Finder</span>
          </span>
        </a>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {status === 'success' ? (
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '20px' }}>✓</div>
              <p style={{ fontSize: '17px', fontWeight: 500, color: '#111827', margin: '0 0 8px' }}>Password updated</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
              <div style={{ background: '#1a3a5c', padding: '1.75rem' }}>
                <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 500, margin: '0 0 4px' }}>Set a new password</h1>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', margin: 0 }}>Choose a strong password for your account.</p>
              </div>
              <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>New password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Confirm password</label>
                  <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat your password" style={inputStyle} />
                </div>
                {status === 'error' && (
                  <div style={{ background: '#fee2e2', border: '0.5px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#991b1b' }}>
                    {errorMessage}
                  </div>
                )}
                <button type="submit" disabled={status === 'loading'} style={{ height: '46px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Updating...' : 'Update password'}
                </button>
              </form>
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