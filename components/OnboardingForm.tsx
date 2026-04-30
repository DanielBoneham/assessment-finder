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
      const { data: assessor, error: assessorError } = await supabase
        .from('assessors')
        .insert({
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
        })
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
      <div style={{ background: '#fff', border: '0.5px solid #d1dce8', borderRadius: '12px', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '22px' }}>
          ✓
        </div>
        <p style={{ fontSize: '20px', fontWeight: 500, color: '#111827', margin: '0 0 1rem' }}>
          Thanks — your profile has been submitted for review.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', background: '#f8fafc', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          {[
            'Our team will review your information before publishing to ensure quality and professional standards.',
            'Early adopters currently receive premium visibility benefits for free.',
            'We will be in touch within 2 working days.',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#dcfce7', color: '#166534', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>✓</span>
              <p style={{ fontSize: '14px', color: '#374151', margin: 0, lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
          Welcome to Assessment Finder.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <FormSection title="Basic information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <Field label="Full name" required>
            <input name="name" required value={form.name} onChange={handleChange} placeholder="Dr Jane Smith" style={inputStyle} />
          </Field>
          <Field label="Email address" required>
            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" style={inputStyle} />
          </Field>
        </div>
        <Field label="City or location" required hint="This is where your practice is based">
          <input name="location_city" required value={form.location_city} onChange={handleChange} placeholder="e.g. London" style={inputStyle} />
        </Field>
      </FormSection>

      <FormSection title="Professional credentials">
        <Field label="Professional title" required hint="e.g. Clinical Psychologist, Consultant Psychiatrist">
          <input name="professional_title" required value={form.professional_title} onChange={handleChange} placeholder="e.g. Clinical Psychologist" style={inputStyle} />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <Field label="Governing body" hint="e.g. BPS, HCPC, GMC">
            <input name="governing_body" value={form.governing_body} onChange={handleChange} placeholder="e.g. BPS" style={inputStyle} />
          </Field>
          <Field label="Registration number">
            <input name="registration_number" value={form.registration_number} onChange={handleChange} placeholder="e.g. 123456" style={inputStyle} />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Services">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <p style={fieldLabelStyle}>Conditions you assess for</p>
            <p style={hintStyle}>Select all that apply</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['ADHD', 'Autism', 'Dyslexia'].map((c) => (
                <label key={c} style={checkboxLabel(form.conditions.includes(c))}>
                  <input type="checkbox" checked={form.conditions.includes(c)} onChange={() => handleCheckbox('conditions', c)} style={{ display: 'none' }} />
                  {form.conditions.includes(c) ? '✓ ' : ''}{c}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p style={fieldLabelStyle}>Assessment types</p>
            <p style={hintStyle}>Select all that apply</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['Adults', 'Children', 'Remote'].map((t) => (
                <label key={t} style={checkboxLabel(form.assessment_types.includes(t))}>
                  <input type="checkbox" checked={form.assessment_types.includes(t)} onChange={() => handleCheckbox('assessment_types', t)} style={{ display: 'none' }} />
                  {form.assessment_types.includes(t) ? '✓ ' : ''}{t}
                </label>
              ))}
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Current availability">
        <Field label="How soon can you take on new clients?" required>
          <select name="availability_range" required value={form.availability_range} onChange={handleChange} style={inputStyle}>
            <option value="">Select availability</option>
            <option value="within-2-weeks">Within 2 weeks</option>
            <option value="2-4-weeks">2 to 4 weeks</option>
            <option value="1-3-months">1 to 3 months</option>
            <option value="3-plus-months">3 or more months</option>
          </select>
        </Field>
      </FormSection>

      <FormSection title="Profile details">
        <Field label="Short bio" hint="Tell potential clients about your experience and approach">
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="e.g. Specialist in adult ADHD and autism assessments with 10 years of clinical experience..."
            rows={4}
            style={{ ...inputStyle, height: 'auto', resize: 'vertical', padding: '10px 12px' }}
          />
        </Field>
        <Field label="Price range" hint="e.g. £800 to £1,200">
          <input name="price_range" value={form.price_range} onChange={handleChange} placeholder="e.g. £800 to £1,200" style={inputStyle} />
        </Field>
      </FormSection>

      {status === 'error' && (
        <div style={{ fontSize: '13px', color: '#991b1b', background: '#fee2e2', padding: '12px 14px', borderRadius: '8px' }}>
          <strong>Error:</strong> {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{ width: '100%', height: '50px', background: '#1a3a5c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: status === 'submitting' ? 0.7 : 1, letterSpacing: '-0.2px' }}
      >
        {status === 'submitting' ? 'Submitting...' : 'Create your free profile'}
      </button>

      <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
        We will review your details and be in touch within 2 working days. No payment required.
      </p>

    </form>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a3a5c', margin: 0, paddingBottom: '0.75rem', borderBottom: '0.5px solid #e5e7eb', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={fieldLabelStyle}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
      </label>
      {hint && <p style={hintStyle}>{hint}</p>}
      {children}
    </div>
  )
}

function checkboxLabel(selected: boolean): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: selected ? 500 : 400,
    cursor: 'pointer',
    border: selected ? '1.5px solid #1a3a5c' : '0.5px solid #d1d5db',
    background: selected ? '#e8f0fa' : '#fff',
    color: selected ? '#1a3a5c' : '#374151',
    userSelect: 'none',
  }
}

const fieldLabelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
  margin: 0,
}

const hintStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: 0,
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