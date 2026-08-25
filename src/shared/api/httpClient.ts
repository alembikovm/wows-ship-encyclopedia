const REQUEST_TIMEOUT_MS = 15_000

export class HttpError extends Error {
  constructor(
    readonly statusCode: number,
    readonly url: string,
  ) {
    super(`Request to ${url} failed with status ${statusCode}`)
    this.name = 'HttpError'
  }
}

export async function fetchJson<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) throw new HttpError(response.status, url)

  return response.json() as Promise<TResponse>
}
