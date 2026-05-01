'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const AVAILABILITY_OPTIONS = [
  { value: 'within-2-weeks', label: 'Within 2 weeks' },
  { value: '2-4-weeks', label: '2 to 4 weeks' },
  { value: '1-3-months', label: '1 to 3 months' },
  { value: '3-plus-months', label: '3 or more months' },
]

const AVAILABILITY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'within-2-weeks': { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  '2-4-weeks':      { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  '1-3-months':     { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  '3-plus-months':  { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
}

interface Assessor {
  id: string
  name: string
  email: string
  professional_title: string
  location_city: string
  bio: string | null
  price_range: string | null
  conditions: string[]
  assessment_types: string[]
  governing_body: string | null
  registration_number: string | null
  is_verified: boolean
  photo_url: string | null
  availability: {
    id?: string
    availability_range: string
    next_available_date: string | null
    last_updated: string
  } | null
}

export function DashboardClient({ assessor: initial }: { assessor: Assessor }) {
  const [assessor, setAssessor] = useState(initial)
  const [activeTab, setActiveTab] = useState<'availability' | 'profile'>('availability')
  const [avSaving, setAvSaving] = useState(false)
  const [avSaved, setAvSaved] = useState(false)
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [photoUploading, setPhotoUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [av, setAv] = useState({
    availability_range: assessor.availability?.availability_range ?? '',
    next_available_date: assessor.availability?.next_available_date ?? '',
    notes: '',
  })

  const [profile, setProfile] = useState({
    bio: assessor.bio ?? '',
    price_range: assessor.price_range ?? '',
    conditions: assessor.conditions ?? [],
    assessment_types: assessor.assessment_types ?? [],
    governing_body: assessor.governing_body ?? '',
    registration_number: assessor.registration_number ?? '',
  })

  async function saveAvailability() {
    setAvSaving(true)
    const avData = {
      assessor_id: assessor.id,
      availability_range: av.availability_range,
      next_available_date: av.next_available_date || null,
      last_updated: new Date().toISOString(),
    }

    if (assessor.availability?.id) {
      await supabase.from('availability').update(avData).eq('id', assessor.availability.id)
    } else {
      await supabase.from('availability').insert(avData)
    }

    setAssessor((prev) => ({
      ...prev,
      availability: { ...avData, id: prev.availability?.id },
    }))
    setAvSaving(false)
    setAvSaved(true)
    setTimeout(() => setAvSaved(false), 3000)
  }

  async function saveProfile() {
    setProfileSaving(true)
    await supabase.from('assessors').update({
      bio: profile.bio || null,
      price_range: profile.price_range || null,
      conditions: profile.conditions,
      assessment_types: profile.assessment_types,
      governing_body: profile.governing_body || null,
      registration_number: profile.registration_number || null,
    }).eq('id', assessor.id)

    setAssessor((prev) => ({ ...prev, ...profile }))
    setProfileSaving(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${assessor.id}-${Date.now()}.${fileExt}`

    const { error } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)
      await supabase.from('assessors').update({ photo_url: data.publicUrl }).eq('id', assessor.id)
      setAssessor((prev) => ({ ...prev, photo_url: data.publicUrl }))
    }
    setPhotoUploading(false)
  }

  function toggleCondition(c: string) {
    setProfile((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(c)
        ? prev.conditions.filter((x) => x !== c)
        : [...prev.conditions, c],
    }))
  }

  function toggleType(t: string) {
    setProfile((prev) => ({
      ...prev,
      assessment_types: prev.assessment_types.includes(t)
        ? prev.assessment_types.filter((x) => x !== t)
        : [...prev.assessment_types, t],
    }))
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const avColor = AVAILABILITY_COLORS[assessor.availability?.availability_range ?? '3-plus-months']
  const lastUpdated = assessor.availability?.last_updated
    ? new Date(assessor.availability.last_updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not yet set'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Profile overview card */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            {assessor.photo_url ? (
              <img src={assessor.photo_url} alt={assessor.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d1dce8' }} />
            ) : (
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e8f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '2px solid #d1dce8' }}>👤</div>
            )}
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 500, color: '#111827', margin: '0 0 2px' }}>{assessor.name}</p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 6px' }}>{assessor.professional_title} · {assessor.location_city}</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {assessor.is_verified && (
                <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '20px', fontWeight: 500 }}>✓ Verified</span>
              )}
              {assessor.availability?.availability_range && (
                <span style={{ fontSize: '11px', background: avColor.bg, color: avColor.text, padding: '2px 8px', borderRadius: '20px', fontWeight: 500 }}>
                  {AVAILABILITY_OPTIONS.find((o) => o.value === assessor.availability?.availability_range)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Updated: {lastUpdated}</p>
          <button onClick={handleSignOut} style={{ fontSize: '13px', color: '#6b7280', background: 'none', border: '0.5px solid #d1d5db', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Sign out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', background: '#fff', borderRadius: '10px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
        {(['availability', 'profile'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ flex: 1, height: '44px', background: activeTab === tab ? '#1a3a5c' : '#fff', color: activeTab === tab ? '#fff' : '#6b7280', border: 'none', fontSize: '14px', fontWeight: activeTab === tab ? 500 : 400, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}
          >
            {tab === 'availability' ? '📅 Availability' : '👤 Profile'}
          </button>
        ))}
      </div>

      {/* Availability tab */}
      {activeTab === 'availability' && (
        <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', overflow: 'hidden' }}>
          <div style={{ background: '#1a3a5c', padding: '1.25rem 1.5rem' }}>
            <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500, margin: '0 0 4px' }}>Update availability</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', margin: 0 }}>Keep this updated regularly so clients know when you can help them.</p>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={labelStyle}>Current availability <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {AVAILABILITY_OPTIONS.map((opt) => {
                  const selected = av.availability_range === opt.value
                  const color = AVAILABILITY_COLORS[opt.value]
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAv((prev) => ({ ...prev, availability_range: opt.value }))}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '8px', border: selected ? `2px solid ${color.dot}` : '0.5px solid #d1d5db', background: selected ? color.bg : '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                    >
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', fontWeight: selected ? 500 : 400, color: selected ? color.text : '#374151' }}>{opt.label}</span>
                      {selected && <span style={{ marginLeft: 'auto', fontSize: '12px', color: color.text, fontWeight: 500 }}>Selected</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Next available date <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></label>
              <input
                type="date"
                value={av.next_available_date}
                onChange={(e) => setAv((prev) => ({ ...prev, next_available_date: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <button
              onClick={saveAvailability}
              disabled={avSaving || !av.availability_range}
              style={{ height: '48px', background: avSaved ? '#22c55e' : '#1a3a5c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: avSaving || !av.availability_range ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: !av.availability_range ? 0.6 : 1, transition: 'background 0.2s' }}
            >
              {avSaving ? 'Saving...' : avSaved ? '✓ Saved' : 'Save availability'}
            </button>

          </div>
        </div>
      )}

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <div style={{ background: '#fff', borderRadius: '12px', border: '0.5px solid #d1dce8', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Photo */}
          <div>
            <label style={labelStyle}>Profile photo</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              {assessor.photo_url ? (
                <img src={assessor.photo_url} alt={assessor.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d1dce8', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f0f4f8', border: '2px dashed #d1dce8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>👤</div>
              )}
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={photoUploading} style={{ height: '36px', padding: '0 14px', background: '#fff', border: '0.5px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {photoUploading ? 'Uploading...' : assessor.photo_url ? 'Change photo' : 'Upload photo'}
                </button>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '6px 0 0' }}>JPG or PNG. Max 5MB.</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </div>
          </div>

          <Divider />

          {/* Bio */}
          <div>
            <label style={labelStyle}>Bio</label>
            <textarea value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} rows={4} placeholder="Tell potential clients about your experience..." style={{ ...inputStyle, height: 'auto', resize: 'vertical', padding: '10px 12px' }} />
          </div>

          {/* Price */}
          <div>
            <label style={labelStyle}>Price range</label>
            <input value={profile.price_range} onChange={(e) => setProfile((p) => ({ ...p, price_range: e.target.value }))} placeholder="e.g. £800 to £1,200" style={inputStyle} />
          </div>

          <Divider />

          {/* Conditions */}
          <div>
            <label style={labelStyle}>Conditions offered</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {['ADHD', 'Autism', 'Dyslexia'].map((c) => (
                <button key={c} type="button" onClick={() => toggleCondition(c)} style={pillStyle(profile.conditions.includes(c))}>
                  {profile.conditions.includes(c) ? '✓ ' : ''}{c}
                </button>
              ))}
            </div>
          </div>

          {/* Assessment types */}
          <div>
            <label style={labelStyle}>Assessment types</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {['Adults', 'Children', 'Remote'].map((t) => (
                <button key={t} type="button" onClick={() => toggleType(t)} style={pillStyle(profile.assessment_types.includes(t))}>
                  {profile.assessment_types.includes(t) ? '✓ ' : ''}{t}
                </button>
              ))}
            </div>
          </div>

          <Divider />

          {/* Credentials */}
          <div>
            <label style={labelStyle}>Governing body</label>
            <input value={profile.governing_body} onChange={(e) => setProfile((p) => ({ ...p, governing_body: e.target.value }))} placeholder="e.g. BPS, HCPC, GMC" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Registration number</label>
            <input value={profile.registration_number} onChange={(e) => setProfile((p) => ({ ...p, registration_number: e.target.value }))} placeholder="e.g. 123456" style={inputStyle} />
          </div>

          <button
            onClick={saveProfile}
            disabled={profileSaving}
            style={{ height: '48px', background: profileSaved ? '#22c55e' : '#1a3a5c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: profileSaving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
          >
            {profileSaving ? 'Saving...' : profileSaved ? '✓ Saved' : 'Save profile'}
          </button>

        </div>
      )}

    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: '0.5px solid #e5e7eb', margin: '0' }} />
}

function pillStyle(selected: boolean): React.CSSProperties {
  return {
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: selected ? 500 : 400,
    cursor: 'pointer',
    border: selected ? '1.5px solid #1a3a5c' : '0.5px solid #d1d5db',
    background: selected ? '#e8f0fa' : '#fff',
    color: selected ? '#1a3a5c' : '#374151',
    fontFamily: 'inherit',
  }
}

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  color: '#374151',
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
  marginTop: '6px',
}