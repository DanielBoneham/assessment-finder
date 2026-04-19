import { supabase } from './supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvailabilityRange =
  | 'within-2-weeks'
  | '2-4-weeks'
  | '1-3-months'
  | '3-plus-months'

export interface Assessor {
  id: string
  name: string
  email: string
  location_city: string
  professional_title: string
  governing_body: string | null
  registration_number: string | null
  bio: string | null
  price_range: string | null
  conditions: string[]
  assessment_types: string[]
  tier: 'free' | 'featured'
  is_verified: boolean
  created_at: string
}

export interface Availability {
  id: string
  assessor_id: string
  availability_range: AvailabilityRange
  next_available_date: string | null
  last_updated: string
}

export interface AssessorWithAvailability extends Assessor {
  availability: Availability | null
}

export interface Lead {
  assessor_id: string
  name: string
  email: string
  message?: string
  condition?: string
}

// ─── Availability helpers ─────────────────────────────────────────────────────

export const AVAILABILITY_LABELS: Record<AvailabilityRange, string> = {
  'within-2-weeks': 'Within 2 weeks',
  '2-4-weeks':      '2–4 weeks',
  '1-3-months':     '1–3 months',
  '3-plus-months':  '3+ months',
}

const AVAILABILITY_ORDER: AvailabilityRange[] = [
  'within-2-weeks',
  '2-4-weeks',
  '1-3-months',
  '3-plus-months',
]

/** Returns the human-readable label for the fastest availability in a list. */
export function fastestAvailability(assessors: AssessorWithAvailability[]): string {
  const ranges = assessors
    .map((a) => a.availability?.availability_range)
    .filter(Boolean) as AvailabilityRange[]
  const fastest = AVAILABILITY_ORDER.find((r) => ranges.includes(r))
  return fastest ? AVAILABILITY_LABELS[fastest] : 'unknown'
}

// ─── Assessors ────────────────────────────────────────────────────────────────

/** Fetch all assessors joined with their availability. */
export async function getAssessors(): Promise<AssessorWithAvailability[]> {
  const { data, error } = await supabase
    .from('assessors')
    .select(`*, availability(*)`)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map((row) => ({
    ...row,
    availability: Array.isArray(row.availability) ? row.availability[0] ?? null : null,
  }))
}

/** Fetch assessors filtered by city and/or condition. */
export async function searchAssessors(
  city?: string,
  condition?: string
): Promise<AssessorWithAvailability[]> {
  let query = supabase.from('assessors').select(`*, availability(*)`)

  if (city) {
    query = query.ilike('location_city', `%${city}%`)
  }

  if (condition) {
    query = query.contains('conditions', [condition])
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error

  return (data ?? []).map((row) => ({
    ...row,
    availability: Array.isArray(row.availability) ? row.availability[0] ?? null : null,
  }))
}

/** Fetch a single assessor by ID. */
export async function getAssessorById(
  id: string
): Promise<AssessorWithAvailability | null> {
  const { data, error } = await supabase
    .from('assessors')
    .select(`*, availability(*)`)
    .eq('id', id)
    .single()

  if (error) return null

  return {
    ...data,
    availability: Array.isArray(data.availability) ? data.availability[0] ?? null : null,
  }
}

// ─── Leads ────────────────────────────────────────────────────────────────────

/** Submit a contact form lead. */
export async function submitLead(lead: Lead): Promise<void> {
  const { error } = await supabase.from('leads').insert(lead)
  if (error) throw error
}
