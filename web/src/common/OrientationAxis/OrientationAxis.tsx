import { useCanvas } from '../Canvas/Canvas'

export class OrientationAxisProps {
  beta?: number | null
  gamma?: number | null
  onDeviceAlignmentUpdated?: (deviceIsAligned: boolean) => void
  alignmentErrorMargin?: number = 0.1 // 0 means that it requires perfect alignment, 1 is no alignment validation
}

export const OrientationAxis = ({
  beta,
  gamma,
  onDeviceAlignmentUpdated,
  alignmentErrorMargin,
}: OrientationAxisProps): JSX.Element => {
  const context = useCanvas()

  const xOffset = 40
  const yOffset = 40
  const railWidth = 100
  alignmentErrorMargin = alignmentErrorMargin || 0.1

  const xCenterPosition = xOffset + railWidth / 2
  const yCenterPosition = yOffset + railWidth / 2

  const railEndingXPosition = xOffset + railWidth
  const railEndingYPosition = yOffset + railWidth

  const radius = 5
  let gammaIsAligned = false
  let betaIsAligned = false

  // const circleXPosition = useAnimation<number>(
  //   xPosition,
  //   currentPosition => currentPosition
  // );

  function valueIsWithinThreshold(
    value: number,
    target: number,
    errorMargin: number
  ): boolean {
    const lowerThreshold = target - target * errorMargin
    const upperThreshold = target + target * errorMargin
    return value >= lowerThreshold && value <= upperThreshold
  }

  if (context !== null) {
    //Draw horizontal circle
    if (gamma) {
      gammaIsAligned = valueIsWithinThreshold(
        gamma + 90,
        90,
        alignmentErrorMargin
      )
      context.beginPath()
      context.arc(
        ((gamma + 90) / 180) * railWidth + xOffset,
        yCenterPosition,
        radius,
        0,
        2 * Math.PI,
        false
      )
      context.fillStyle = gammaIsAligned ? 'green' : 'orange'
      context.fill()
    }

    //Draw vertical circle
    if (beta) {
      betaIsAligned = valueIsWithinThreshold(beta, 90, alignmentErrorMargin)
      context.beginPath()
      context.arc(
        xCenterPosition,
        (beta / 180) * railWidth + yOffset,
        radius,
        0,
        2 * Math.PI,
        false
      )
      context.fillStyle = betaIsAligned ? 'green' : 'orange'
      context.fill()
    }

    //Draw vertical rail
    context.beginPath()
    context.moveTo(xCenterPosition, yOffset)
    context.lineTo(xCenterPosition, railEndingYPosition)
    context.stroke()

    //Draw horizontal rail
    context.beginPath()
    context.moveTo(xOffset, yCenterPosition)
    context.lineTo(railEndingXPosition, yCenterPosition)
    context.stroke()

    if (onDeviceAlignmentUpdated) {
      onDeviceAlignmentUpdated(
        gammaIsAligned === true && betaIsAligned === true
      )
    }
  }

  return null
}
