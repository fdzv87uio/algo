import { ApplicationInsightsWrapper } from './ApplicationInsightsWrapper'

export class TelemetryClient {
  instrumentationKey: string
  correlationId: string
  deviceInfo: any | undefined

  constructor(
    instrumentationKey: string,
    correlationId: string,
    deviceInfo?: any | undefined
  ) {
    this.instrumentationKey = instrumentationKey
    this.correlationId = correlationId
    this.deviceInfo = deviceInfo
  }

  logEvent = async (
    eventName: string,
    customProperties: any | undefined
  ): Promise<void> => {
    const event = this.getEvent(eventName, customProperties)
    this.postInsight(event)
  }

  logException = async (
    error: Error,
    customProperties: any | undefined
  ): Promise<void> => {
    const exception = this.getException(error, customProperties)
    this.postInsight(exception)
  }

  logTrace = async (
    traceMessage: string,
    customProperties: any | undefined
  ): Promise<void> => {
    const trace = this.getTrace(traceMessage, customProperties)
    this.postInsight(trace)
  }

  private postInsight = async (
    insight: ApplicationInsightsWrapper
  ): Promise<Response> => {
    return await fetch('https://dc.services.visualstudio.com/v2/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(insight),
    })
  }

  private getEvent = (
    eventName: string,
    customProperties: any | undefined
  ): ApplicationInsightsWrapper => {
    const wrapper = new ApplicationInsightsWrapper(
      'Event',
      this.instrumentationKey
    )
    wrapper.data = {
      baseType: 'EventData',
      baseData: {
        ver: 2,
        name: eventName,
        properties: this.getCustomProperties(customProperties),
      },
    }

    return wrapper
  }

  private getException = (
    error: Error,
    customProperties: any | undefined
  ): ApplicationInsightsWrapper => {
    const wrapper = new ApplicationInsightsWrapper(
      'Exception',
      this.instrumentationKey
    )
    wrapper.data = {
      baseType: 'ExceptionData',
      baseData: {
        ver: 2,
        properties: this.getCustomProperties(customProperties),
        exceptions: [
          {
            typeName: 'error',
            message: JSON.stringify(error),
          },
        ],
      },
    }
    return wrapper
  }

  private getTrace = (
    traceMessage: string,
    customProperties: any | undefined
  ): ApplicationInsightsWrapper => {
    const wrapper = new ApplicationInsightsWrapper(
      'Message',
      this.instrumentationKey
    )
    wrapper.data = {
      baseType: 'MessageData',
      baseData: {
        ver: 2,
        message: traceMessage,
        properties: this.getCustomProperties(customProperties),
      },
    }
    return wrapper
  }

  private getCustomProperties = (customProperties: any | undefined): any => {
    if (customProperties === undefined) {
      customProperties = {
        correlation: this.correlationId,
      }
    } else {
      customProperties.correlation = this.correlationId
    }

    if (this.deviceInfo !== undefined) {
      for (const deviceProperty in this.deviceInfo) {
        customProperties[deviceProperty] = this.deviceInfo[deviceProperty]
      }
    }

    return customProperties
  }
}
