/**
 * Form submission for the sales pages. When VITE_FORMS_ENDPOINT is
 * configured the payload is POSTed there as JSON; otherwise we fall back to
 * opening a prefilled mailto: to the sales inbox so submissions are never
 * silently lost.
 */

const ENDPOINT = import.meta.env.VITE_FORMS_ENDPOINT as string | undefined
const FALLBACK_EMAIL = 'info@stablezact.com'

export type SubmitResult = 'sent' | 'mailto'

export async function submitForm(
  form: string,
  subject: string,
  data: Record<string, string>,
): Promise<SubmitResult> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form, submittedAt: new Date().toISOString(), ...data }),
    })
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
    return 'sent'
  }

  const body = Object.entries(data)
    .filter(([, value]) => value.trim() !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  const href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = href
  return 'mailto'
}

/** Reads a form element's fields into a plain record, minus the honeypot. */
export function readFormData(formEl: HTMLFormElement): {
  data: Record<string, string>
  isSpam: boolean
} {
  const fd = new FormData(formEl)
  const data: Record<string, string> = {}
  let isSpam = false
  fd.forEach((value, key) => {
    if (typeof value !== 'string') return
    if (key === 'company_fax') {
      if (value.trim() !== '') isSpam = true
      return
    }
    data[key] = value
  })
  return { data, isSpam }
}
