'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const TOTAL_STEPS = 6

export function OnboardingForm() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function next() { setStep((s) => Math.min(s + 1, TOTAL_STEPS)) }
  function back() { setStep((s) => Math.max(s - 1, 1)) }

  async function handleSubmit() {
    setStatus('submitting')
    setErrorMessage('')

    try {
      let photoUrl: string | null = null

      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, photoFile)

        if (uploadError) {
          setErrorMessage(uploadError.message)
          setStatus('error')
          return
        }

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName)

        photoUrl = urlData.publicUrl
      }

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
          ...(photoUrl ? { photo_url: photoUrl } : {}),
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
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '22px' }}>✓</div>
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
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Welcome to Assessment Finder.</p>
      </div>
    )
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>

      <div style={{ background: '#f0f4f8', height: '4px' }}>
        <div style={{ background: '#1a3a5c', height: '4px', width: `${progress}%`, transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '0.5px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#9ca3af', margin: 0 }}>Step {step} of {TOTAL_STEPS}</p>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a5c', margin: 0 }}>{STEP_TITLES[step - 1]}</p>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{Math.round(progress)}% complete</p>
      </div>

      <div style={{ padding: '1.75rem 1.5rem' }}>

        {step === 1 && (
          <StepWrapper title="Basic details" subtitle="Tell us the basics about you and your practice.">
            <Field label="Full name" required>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Dr Jane Smith" style={inputStyle} />
            </Field>
            <Field label="Email address" required hint="We will use this to get in touch with you">
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" style={inputStyle} />
            </Field>
            <Field label="City or location" required hint="Where is your practice based?">
              <input name="location_city" required value={form.location_city} onChange={handleChange} placeholder="e.g. London" style={inputStyle} />
            </Field>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper title="Professional credentials" subtitle="Your credentials help us verify your profile and build trust with clients.">
            <Field label="Professional title" required hint="e.g. Clinical Psychologist, Consultant Psychiatrist">
              <input name="professional_title" required value={form.professional_title} onChange={handleChange} placeholder="e.g. Clinical Psychologist" style={inputStyle} />
            </Field>
            <Field label="Governing body" hint="e.g. BPS, HCPC, GMC, NMC">
              <input name="governing_body" value={form.governing_body} onChange={handleChange} placeholder="e.g. BPS" style={inputStyle} />
            </Field>
            <Field label="Registration number" hint="We use this to verify your credentials">
              <input name="registration_number" value={form.registration_number} onChange={handleChange} placeholder="e.g. 123456" style={inputStyle} />
            </Field>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper title="Services offered" subtitle="Select the conditions you assess for and the types of clients you work with.">
            <div>
              <p style={fieldLabelStyle}>Conditions you assess for</p>
              <p style={hintStyle}>Select all that apply</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {['ADHD', 'Autism', 'Dyslexia'].map((c) => (
                  <label key={c} style={pillStyle(form.conditions.includes(c))}>
                    <input type="checkbox" checked={form.conditions.includes(c)} onChange={() => handleCheckbox('conditions', c)} style={{ display: 'none' }} />
                    {form.conditions.includes(c) ? '✓ ' : ''}{c}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p style={fieldLabelStyle}>Assessment types</p>
              <p style={hintStyle}>Select all that apply</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {['Adults', 'Children', 'Remote'].map((t) => (
                  <label key={t} style={pillStyle(form.assessment_types.includes(t))}>
                    <input type="checkbox" checked={form.assessment_types.includes(t)} onChange={() => handleCheckbox('assessment_types', t)} style={{ display: 'none' }} />
                    {form.assessment_types.includes(t) ? '✓ ' : ''}{t}
                  </label>
                ))}
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 4 && (
          <StepWrapper title="Current availability" subtitle="This is shown prominently on your profile so clients can see if you can help them soon.">
            <Field label="How soon can you take on new clients?" required>
              <select name="availability_range" required value={form.availability_range} onChange={handleChange} style={inputStyle}>
                <option value="">Select availability</option>
                <option value="within-2-weeks">Within 2 weeks</option>
                <option value="2-4-weeks">2 to 4 weeks</option>
                <option value="1-3-months">1 to 3 months</option>
                <option value="3-plus-months">3 or more months</option>
              </select>
            </Field>
            <div style={{ background: '#f0fdf4', borderRadius: '8px', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#166534', fontSize: '14px', flexShrink: 0 }}>✓</span>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
                Your availability is shown prominently at the top of your profile card, helping clients quickly identify if you can help them soon.
              </p>
            </div>
          </StepWrapper>
        )}

        {step === 5 && (
          <StepWrapper title="Profile details" subtitle="Help potential clients understand your experience and approach.">

            {/* Photo upload */}
            <div>
              <p style={fieldLabelStyle}>Profile photo</p>
              <p style={hintStyle}>Profiles with photos build more trust and may perform better.</p>
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d1dce8', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f0f4f8', border: '2px dashed #d1dce8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                    👤
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ height: '38px', padding: '0 16px', background: '#fff', border: '0.5px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {photoPreview ? 'Change photo' : 'Upload photo'}
                  </button>
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => { setPhotoFile(null); setPhotoPreview(null) }}
                      style={{ height: '38px', padding: '0 16px', background: 'none', border: 'none', fontSize: '13px', color: '#9ca3af', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                    >
                      Remove
                    </button>
                  )}
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>JPG or PNG. Max 5MB.</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

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
          </StepWrapper>
        )}

        {step === 6 && (
          <StepWrapper title="Review and submit" subtitle="Check your details before submitting. We will review your profile before it goes live.">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
              {photoPreview ? (
                <img src={photoPreview} alt="Your photo" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d1dce8', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f0f4f8', border: '2px dashed #d1dce8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>👤</div>
              )}
              <div>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 2px' }}>{form.name || 'Your name'}</p>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{form.professional_title || 'Your title'} · {form.location_city || 'Your city'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Email', value: form.email },
                { label: 'Governing body', value: form.governing_body || 'Not provided' },
                { label: 'Registration', value: form.registration_number || 'Not provided' },
                { label: 'Conditions', value: form.conditions.join(', ') || 'None selected' },
                { label: 'Assessment types', value: form.assessment_types.join(', ') || 'None selected' },
                { label: 'Availability', value: AVAILABILITY_LABELS[form.availability_range] || 'Not selected' },
                { label: 'Price range', value: form.price_range || 'Not provided' },
                { label: 'Photo', value: photoFile ? photoFile.name : 'No photo uploaded' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '0.5px solid #f3f4f6', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#9ca3af', flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827', textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
            </div>
            {form.bio && (
              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 4px' }}>Bio</p>
                <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.6 }}>{form.bio}</p>
              </div>
            )}
            {status === 'error' && (
              <div style={{ fontSize: '13px', color: '#991b1b', background: '#fee2e2', padding: '12px 14px', borderRadius: '8px', marginTop: '8px' }}>
                <strong>Error:</strong> {errorMessage || 'Something went wrong. Please try again.'}
              </div>
            )}
          </StepWrapper>
        )}

      </div>

      <div style={{ padding: '1.25rem 1.5rem', borderTop: '0.5px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        {step > 1 ? (
          <button type="button" onClick={back} style={backBtnStyle}>← Back</button>
        ) : (
          <div />
        )}
        {step < TOTAL_STEPS ? (
          <button type="button" onClick={next} style={nextBtnStyle}>Continue →</button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            style={{ ...nextBtnStyle, opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit profile'}
          </button>
        )}
      </div>

    </div>
  )
}

const STEP_TITLES = ['Basic details', 'Credentials', 'Services', 'Availability', 'Profile', 'Review']

const AVAILABILITY_LABELS: Record<string, string> = {
  'within-2-weeks': 'Within 2 weeks',
  '2-4-weeks':      '2 to 4 weeks',
  '1-3-months':     '1 to 3 months',
  '3-plus-months':  '3 or more months',
}

function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111827', margin: '0 0 6px' }}>{title}</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>{subtitle}</p>
      </div>
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

function pillStyle(selected: boolean): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '9px 18px',
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

const nextBtnStyle: React.CSSProperties = {
  height: '44px',
  padding: '0 24px',
  background: '#1a3a5c',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const backBtnStyle: React.CSSProperties = {
  height: '44px',
  padding: '0 20px',
  background: 'none',
  color: '#6b7280',
  border: '0.5px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
  fontFamily: 'inherit',
}