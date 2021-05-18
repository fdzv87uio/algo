import { TelemetryClient } from './TelemetryClient'

const APPINSIGHTS_INSTRUMENTATIONKEY =
  process.env.APPINSIGHTS_INSTRUMENTATIONKEY || ''
const STYLECARD_API_URL = process.env.STYLECARD_API_URL || ''
const STYLECARD_API_KEY = process.env.STYLECARD_API_KEY || ''

//All numbers are cm, default to 3,3
export class CoreApiMeasurementsPayload {
  userId: string
  vscan: boolean
  predictDims: boolean
  bridge: boolean
  garmentType: string
  height: number
  preferences: {
    chest: number[]
    waist: number[]
    hips: number[]
  }

  constructor() {
    // Default values for development
    this.vscan = true
    this.predictDims = true
    this.bridge = true
    this.garmentType = 'shirt'
    this.preferences = {
      chest: [],
      waist: [],
      hips: [],
    }
    this.preferences.chest = [3, 3]
    this.preferences.waist = [3, 3]
    this.preferences.hips = [3, 3]
  }
}

export class CoreApiClient {
  correlationId: string
  telemetryClient: TelemetryClient

  constructor(correlationId?: string) {
    this.correlationId = correlationId ?? ''
    this.telemetryClient = new TelemetryClient(
      APPINSIGHTS_INSTRUMENTATIONKEY,
      this.correlationId
    )
  }

  apiFetch = async (
    url: string,
    requestInit?: RequestInit
  ): Promise<Response> => {
    const properties = {
      RequestUrl: url,
      RequestInit: JSON.stringify(requestInit),
    }

    this.telemetryClient.logTrace('CoreApiClient Request', properties)
    return fetch(url, requestInit)
  }

  postMeasurements = async (
    payload: CoreApiMeasurementsPayload
  ): Promise<Response> => {
    return this.apiFetch(`${STYLECARD_API_URL}/core/invoke`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': STYLECARD_API_KEY,
      },
      body: JSON.stringify(payload),
    })
  }
}
