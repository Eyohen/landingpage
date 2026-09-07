/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_ID?: string
  readonly VITE_CLARITY_ID?: string
  readonly VITE_CMS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
