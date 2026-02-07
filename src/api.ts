/**
 * API client for module content and other backend endpoints.
 */

import { getAccessToken } from './auth'
import type { ModuleData } from './data/sampleModule'

const API_BASE =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? '/api' : 'http://127.0.0.1:8000')

/** Response shape from GET /content-loading/{module_id} */
export type ContentLoadingResponse = {
  id: string
  title: string
  content: string
  created_at?: string
}

/** Normalize content: ensure escaped \\n in JSON become real newlines for markdown. */
function normalizeContent(raw: string): string {
  if (typeof raw !== 'string') return ''
  return raw.replace(/\\n/g, '\n')
}

/** Fetch module content by id. GET /content-loading/{module_id} */
export async function fetchModuleContent(moduleId: string): Promise<ModuleData> {
  const token = getAccessToken()
  const res = await fetch(`${API_BASE}/content-loading/${moduleId}`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    let message = 'Failed to load module content.'
    try {
      const json = JSON.parse(text) as { detail?: string }
      if (typeof json.detail === 'string') message = json.detail
    } catch {
      // use default
    }
    throw new Error(message)
  }
  const data = (await res.json()) as ContentLoadingResponse
  return {
    module_id: data.id,
    title: data.title ?? '',
    content_md: normalizeContent(data.content ?? ''),
  }
}
