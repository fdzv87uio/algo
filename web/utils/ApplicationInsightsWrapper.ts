const APPINSIGHTS_ROLENAME = process.env.APPINSIGHTS_ROLENAME || ''

export class ApplicationInsightsWrapper {
  name: string | undefined
  iKey: string | undefined
  time: Date | undefined
  tags: any
  data: any

  constructor(type: string, instrumentationKey: string) {
    this.name = `Microsoft.ApplicationInsights.${instrumentationKey}.${type}`
    this.iKey = instrumentationKey
    this.time = new Date()
    this.tags = {
      'ai.cloud.roleInstance': APPINSIGHTS_ROLENAME,
    }
  }
}
