'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/api'
import { Button } from '@/components/Button'

interface ContactFormProps {
  assessorId: string
  assessorName: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ assessorId, assessorName }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    condition: '',
    message: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitLead({
        assessor_id: assessorId,
        name: form.name,
        email: form.email,
        condition: form.condition || undefined,
        message: form.message || undefined,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#dcfce7', border: '0.5px solid #86efac', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: 500, color: '#166534', marginBottom: '6px' }}>Message sent</p>
        <p style={{ fontSize: '14px', color: '#166534' }}>
          {assessorName} will be in touch with you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Your name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email address</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Assessment needed for</label>
        <select name="condition" value={form.condition} onChange={handleChange} style={inputStyle}>
          <option value="">Select a condition</option>
          <option value="ADHD">ADHD</option>
          <option value="Autism">Autism</option>
          <option value="Dyslexia">Dyslexia</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Message (optional)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any additional context about what you're looking for..."
          rows={4}
          style={{ ...inputStyle, height: 'auto', resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '13px', color: '#991b1b', background: '#fee2e2', padding: '10px 12px', borderRadius: '8px' }}>
          Something went wrong. Please try again.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>

      <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
        Your details are only shared with {assessorName}.
      </p>
    </form>
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
  height: '42px',
  border: '0.5px solid #d1d5db',
  borderRadius: '8px',
  padding: '0 12px',
  fontSize: '14px',
  fontFamily: 'inherit',
  background: '#fff',
  color: '#111827',
  boxSizing: 'border-box',
}
