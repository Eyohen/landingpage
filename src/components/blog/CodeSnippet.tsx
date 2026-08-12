import { useMemo } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github-dark.css'

/**
 * A syntax-highlighted snippet from a post's code block.
 *
 * Only the languages the CMS offers are registered — highlight.js ships nearly
 * two hundred, and importing the bundle would dwarf the page it appears on.
 * This module lands in the lazily loaded article chunk, so readers who never
 * open a post never download it.
 */

const LANGUAGES = { javascript, typescript, json, bash, python }

for (const [name, definition] of Object.entries(LANGUAGES)) {
  hljs.registerLanguage(name, definition)
}

const LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  json: 'JSON',
  bash: 'Shell',
  python: 'Python',
  plaintext: 'Text',
}

export function CodeSnippet({ code, language }: { code: string; language?: string }) {
  const lang = language && language in LANGUAGES ? language : 'plaintext'

  // Set as HTML below, which is safe here specifically because highlight.js
  // escapes the source it is given: `<script>` in a snippet comes back as
  // escaped text wrapped in <span> tags, never as live markup. The only HTML
  // in this string is highlight.js's own span structure. Do not swap this for
  // a highlighter that passes input through unescaped.
  const html = useMemo(() => {
    if (lang === 'plaintext') return null
    try {
      return hljs.highlight(code, { language: lang }).value
    } catch {
      // An unparseable snippet should still render as plain text rather than
      // taking the whole article down.
      return null
    }
  }, [code, lang])

  return (
    <figure className="relative overflow-hidden border border-[#e5e5e5] bg-[#0a0a0b]">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-white/50">
        {LABELS[lang] ?? lang}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[14px] leading-[1.6]">
        <code
          className="font-mono text-[#e6e6e6]"
          {...(html ? { dangerouslySetInnerHTML: { __html: html } } : { children: code })}
        />
      </pre>
    </figure>
  )
}
