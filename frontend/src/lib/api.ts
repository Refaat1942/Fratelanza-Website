const API_BASE = import.meta.env.VITE_API_URL || '/api'

export type ApiResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}

export async function submitForm<T>(
  endpoint: string,
  data: FormData | Record<string, unknown>,
  honeypot?: string,
): Promise<ApiResponse<T>> {
  const isFormData = data instanceof FormData

  if (isFormData) {
    if (honeypot) data.append('website', honeypot)
  } else if (honeypot) {
    ;(data as Record<string, unknown>).website = honeypot
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data),
  })

  const result = (await response.json()) as ApiResponse<T>

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong. Please try again.')
  }

  return result
}
