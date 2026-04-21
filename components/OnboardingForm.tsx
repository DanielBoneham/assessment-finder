'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function OnboardingForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    location_city: '',
    professional_title: '',
    governing_body: '',
    registration_number: '',
    conditions: [] as string[],
    assessment_types: [] as string[],
    availability_range: '',
    bio: '',
    price_range: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleCheckbox(field: 'conditions' | 'assessment_types', value: string) {
    setForm((prev) => {
      const current = prev[field]
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const insertData = {
        name: form.name,
        email: form.email,
        location_city: form.location_city,
        professional_title: form.professional_title,
        governing_body: form.governing_body || null,
        registration_number: form.registration_number || null,
        bio: form.bio || null,
        price_range: form.price_range || null,
        conditions: form.conditions,
        assessment_types: form.assessment_types,
        is_verified: false,
        tier: 'free',
      }

      const { data: assessor, error: assessorError } = await supabase
        .from('assessors')
        .insert(insertData)
        .select()
        .single()

      if (assessorError) {
        setErrorMessage(assessorError.message)
        setStatus('error')
        return
      }

      if (form.availability_range && assessor) {
        const { error: avError } = await supabase
          .from('availability')
          .insert({
            assessor_id: assessor.id,
            availability_range: form.availability_range,
            last_updated: new Date().toISOString(),
          })
        if (avError) {
          setErrorMessage(avError.message)
          setStatus('error')
          return
        }
      }

      setStatus('success')
    } catch (err: any) {
      setErrorMessage(err?.message ?? 'Unknown error')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#dcfce7', border: '0.5px solid #86efac', borderRadius: '12px', padding: '2.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '22px', marginBottom: '8px' }}>✓</p>
        <p style={{ fontSize: '18px', fontWeight: 500, color: '#166534', margin: '0 0 8px' }}>
          Thanks — your profile has been submitted for review.
        </p>
        <p style={{ fontSize: '14px', color: '#166534', margin: 0, opacity: 0.8 }}>
          We will be in touch within 2 working days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '16px' }}>
        <SectionTitle>Basic information</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field label="Full name" required>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Dr Jane Smith" style={inputStyle} />
            </Field>
            <Field label="Email address" required>
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" style={inputStyle} />
            </Field>
          </div>
          <Field label="Location (city)" required>
            <input name="location_city" required value={form.location_city} onChange={handleChange} placeholder="e.g. London" style={inputStyle} />
          </Field>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '16px' }}>
        <SectionTitle>Professional information</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Field label="Professional title" required>
            <input name="professional_title" required value={form.professional_title} onChange={handleChange} placeholder="e.g. Clinical Psychologist" style={inputStyle} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field label="Governing body">
              <input name="governing_body" value={form.governing_body} onChange={handleChange} placeholder="e.g. BPS, HCPC, GMC" style={inputStyle} />
            </Field>
            <Field label="Registration number">
              <input name="registration_number" value={form.registration_number} onChange={handleChange} placeholder="e.g. 123456" style={inputStyle} />
            </Field>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '16px' }}>
        <SectionTitle>Services</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={labelStyle}>Conditions offered</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['ADHD', 'Autism', 'Dyslexia'].map((c) => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                  <input type="checkbox" checked={form.conditions.includes(c)} onChange={() => handleCheckbox('conditions', c)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p style={labelStyle}>Assessment types</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Adults', 'Children', 'Remote'].map((t) => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                  <input type="checkbox" checked={form.assessment_types.includes(t)} onChange={() => handleCheckbox('assessment_types', t)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                  {t}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '16px' }}>
        <SectionTitle>Availability</SectionTitle>
        <Field label="Current availability" required>
          <select name="availability_range" required value={form.availability_range} onChange={handleChange} style={inputStyle}>
            <option value="">Select availability</option>
            <option value="within-2-weeks">Within 2 weeks</option>
            <option value="2-4-weeks">2 to 4 weeks</option>
            <option value="1-3-months">1 to 3 months</option>
            <option value="3-plus-months">3 or more months</option>
          </select>
        </Field>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.75rem', marginBottom: '16px' }}>
        <SectionTitle>Profile</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Field label="Short bio">
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell potential clients about your experience and approach..." rows={4} style={{ ...inputStyle, height: 'auto', resize: 'vertical' }} />
          </Field>
          <Field label="Price range">
            <input name="price_range" value={form.price_range} onChange={handleChange} placeholder="e.g. £800 to £1,200" style={inputStyle} />
          </Field>
        </div>
      </div>

      {status === 'error' && (
        <div style={{ fontSize: '13px', color: '#991b1b', background: '#fee2e2', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px' }}>
          <strong>Error:</strong> {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{ width: '100%', height: '48px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: status === 'submitting' ? 0.7 : 1 }}
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit your profile'}
      </button>

      <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '12px' }}>
        We will review your details and be in touch within 2 working days.
      </p>
    </form>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#111827', margin: '0 0 1rem', paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb' }}>
      {children}
    </h2>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
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