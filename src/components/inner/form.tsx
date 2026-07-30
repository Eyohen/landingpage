import { Link } from 'react-router-dom'

/**
 * Form primitives for the sales pages — Figma "Label - Inputs" style:
 * minimal underline inputs, labelled selects with a light border, and the
 * privacy-consent checkbox row.
 */

const UNDERLINE =
  'w-full border-0 border-b border-[#e0e0e0] bg-transparent pb-3 pt-1 text-[18px] tracking-[-0.02em] text-[#0a0a0a] outline-none transition-colors placeholder:text-[#999] focus:border-[var(--color-purple)]'

export function UnderlineInput({
  name,
  label,
  type = 'text',
  required = false,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="flex w-full flex-col">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={label + (required ? ' *' : '')}
        className={UNDERLINE}
      />
    </label>
  )
}

export function LabeledSelect({
  name,
  label,
  placeholder,
  options,
  required = false,
}: {
  name: string
  label: string
  placeholder: string
  options: string[]
  required?: boolean
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-[14px] font-medium tracking-[-0.02em] text-[#0a0a0a]">
        {label}
        {required ? ' *' : ''}
      </span>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="w-full appearance-none rounded-[10px] border border-[#e0e0e0] bg-white px-3 py-3 text-[15px] tracking-[-0.02em] text-[#0a0a0a] outline-none transition-colors invalid:text-[#9b9b9b] focus:border-[var(--color-purple)]"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  )
}

export function LabeledTextarea({
  name,
  label,
  placeholder,
  required = false,
}: {
  name: string
  label: string
  placeholder: string
  required?: boolean
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-[14px] font-medium tracking-[-0.02em] text-[#0a0a0a]">
        {label}
        {required ? ' *' : ''}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-[10px] border border-[#e0e0e0] bg-white px-3 py-3 text-[15px] leading-[1.5] tracking-[-0.02em] text-[#0a0a0a] outline-none transition-colors placeholder:text-[#9b9b9b] focus:border-[var(--color-purple)]"
      />
    </label>
  )
}

export function ConsentCheckbox({ name = 'consent' }: { name?: string }) {
  return (
    <label className="flex items-start gap-2.5 text-[13px] leading-[1.5] tracking-[-0.01em] text-[#6c6c6c]">
      <input
        type="checkbox"
        name={name}
        required
        className="mt-0.5 size-4 shrink-0 accent-[var(--color-purple)]"
      />
      <span>
        I agree that Stablezact may use the information provided to contact me
        about this enquiry. I have read the{' '}
        <Link to="/privacy" className="text-[var(--color-purple)] underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  )
}

/** Invisible spam trap — bots that fill every field reveal themselves. */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
