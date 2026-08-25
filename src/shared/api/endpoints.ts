const ENCYCLOPEDIA_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://vortex.worldofwarships.eu/api/encyclopedia/en'

export const ENDPOINTS = {
  vehicles: `${ENCYCLOPEDIA_BASE_URL}/vehicles/`,
  nations: `${ENCYCLOPEDIA_BASE_URL}/nations/`,
  vehicleTypes: `${ENCYCLOPEDIA_BASE_URL}/vehicle_types_common/`,
  mediaPath: `${ENCYCLOPEDIA_BASE_URL}/media_path/`,
} as const

export const FALLBACK_MEDIA_PATH = 'https://wows-gloss-icons.wgcdn.co/icons/'
