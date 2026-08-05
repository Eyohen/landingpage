import { useEffect, useRef } from 'react'

/**
 * Inline Calendly scheduling widget. Loads Calendly's widget.js once and
 * initializes the embed manually — the script's automatic DOM scan only runs
 * on its own load, which never fires again during SPA navigation.
 */

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

export function CalendlyEmbed({ url, minHeight = 700 }: { url: string; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = ref.current
    if (!parent) return

    const init = () => {
      if (!parent.isConnected || parent.childElementCount > 0) return
      window.Calendly?.initInlineWidget({ url, parentElement: parent })
    }

    if (window.Calendly) {
      init()
      return () => {
        parent.replaceChildren()
      }
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', init)
    return () => {
      script.removeEventListener('load', init)
      parent.replaceChildren()
    }
  }, [url])

  return (
    <div
      ref={ref}
      style={{ minWidth: 0, width: '100%', height: minHeight }}
      aria-label="Scheduling calendar"
    />
  )
}
