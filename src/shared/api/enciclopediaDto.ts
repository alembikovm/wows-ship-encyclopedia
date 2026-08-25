type LocalizedText = Record<string, string>

export interface VehicleDto {
  level: number
  name: string
  nation: string
  tags: string[]
  icons: Record<string, string>
  localization: {
    mark: LocalizedText
    shortmark: LocalizedText
    description: LocalizedText
  }
}

export interface NationDto {
  id: number
  name: string
  color: number
  tags: string[]
  icons: Record<string, string>
  localization: { mark: LocalizedText }
}

export interface VehicleTypeDto {
  sort_order: number
  icons: Record<string, string>
  localization: { mark: LocalizedText }
}

export interface VehiclesResponse {
  status: string
  data: Record<string, VehicleDto>
}
export interface NationsResponse {
  status: string
  data: NationDto[]
}
export interface VehicleTypesResponse {
  status: string
  data: Record<string, VehicleTypeDto>
}
export interface MediaPathResponse {
  status: string
  data: string
}
