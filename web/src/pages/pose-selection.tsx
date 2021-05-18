import React, { useState } from 'react'
import { useStyles } from '../../styles/pose_selection.styles'
import Link from 'next/link'
import FrontPoseCamera from '../common/FrontPoseCamera/FrontPoseCamera'

//device orientation Info Props
export class DeviceOrientationInfo {
  absolute = false
  alpha: number | null = null
  beta: number | null = null
  gamma: number | null = null
}

export interface CameraWrapperProps {
  width: number | undefined
  height: number | undefined
}

export default function PoseSelection({
  props,
}: {
  props: CameraWrapperProps
}): JSX.Element {
  // retrieve styles
  const classes = useStyles()
  // camera selection Hooks
  const [frontPose, setFrontPose] = useState<boolean>(false)
  // Ios permission  hooks
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false)
  const [deviceOrientation, setDeviceOrientation] =
    useState<DeviceOrientationInfo>()
  //Ios permission methods
  function grantPermissionForDeviceOrientation() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            setPermissionGranted(true)
            window.addEventListener(
              'deviceorientation',
              handleDeviceOrientationEvent
            )
          }
        })
        .catch(console.error)
    } else {
      // handle regular non iOS 13+ devices
      setPermissionGranted(true)
      window.addEventListener('deviceorientation', handleDeviceOrientationEvent)
    }
  }

  function handleDeviceOrientationEvent(ev: DeviceOrientationEvent) {
    setDeviceOrientation({
      absolute: ev.absolute,
      alpha: ev.alpha,
      beta: ev.beta,
      gamma: ev.gamma,
    })
  }

  if (frontPose === true) {
    return (
      <FrontPoseCamera
        deviceOrientation={deviceOrientation}
        permissionGranted={permissionGranted}
        props={props}
      />
    )
  } else {
    return (
      <div className={classes.pageWrapper}>
        <div className={classes.pageHeader}>
          <Link href="/terms-and-conditions">
            <img
              className={classes.BackArrow}
              src="/images/Arrow_Back.png"
              width={25}
              height={25}
            />
          </Link>
          <div>&nbsp;</div>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.textWrapper}>
            <h1 className={classes.pageTitle}>Next we will take two photos</h1>
            <Link href="#">
              <img src="/images/Info_Button.png" height={25} width={25} />
            </Link>
            <p className={classes.pageText}>
              This works better wearing tighter fit clothing or even athletic or
              swimwear
            </p>
            <p className={classes.pageText}>Need a second person to help</p>
          </div>
          <div className={classes.thumbnailWrapper}>
            <div className={classes.frontImage}>
              <img
                onClick={() => {
                  grantPermissionForDeviceOrientation()
                  setFrontPose(true)
                }}
                src="/images/Camera_Icon.png"
                width={50}
                height={50}
              />
            </div>
            <div className={classes.sideImage}>
              <img src="/images/Camera_Icon.png" width={50} height={50} />
            </div>
            <p className={classes.thumbnailSubtitle}>Front</p>
            <p className={classes.thumbnailSubtitle}>Side</p>
          </div>
        </div>
      </div>
    )
  }
}
