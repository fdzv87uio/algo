import React, { useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { CoreApiMeasurementsPayload } from '../../utils/CoreApiClient'

export default function WebcamCapture(): JSX.Element {
  const webcamRef = React.useRef(null)
  const [lastImageUrl, setLastImageUrl] = useState<string>()
  const [userId] = useState<string>(uuidv4())

  async function postImage(
    base64: string,
    userId: string,
    pose: string
  ): Promise<void> {
    const response = await fetch(`/api/user/${userId}/pose/${pose}`, {
      method: 'POST',
      body: JSON.stringify({ image: base64 }),
    })

    if (response.ok) {
      const result = await response.json()
      setLastImageUrl(result.url)
    } else {
      // eslint-disable-next-line no-console
      console.log(`error: ${response.status} ${response.statusText}`)
    }
  }

  async function callApi(userId: string): Promise<void> {
    const payload = new CoreApiMeasurementsPayload()
    payload.userId = userId
    payload.height = 172
    const response = await fetch(`/api/user/${userId}/init`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const result = await response.json()
      // eslint-disable-next-line no-console
      console.log(`result: ${JSON.stringify(result)}`)
    } else {
      // eslint-disable-next-line no-console
      console.log(`error: ${response.status} ${response.statusText}`)
    }
  }

  const height = 720
  const width = 1280

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: 'user',
  }

  const captureFront = React.useCallback(() => {
    const imgBase64 = webcamRef.current.getScreenshot()
    postImage(imgBase64, userId, 'front')
  }, [webcamRef, userId])

  const captureSide = React.useCallback(() => {
    const imgBase64 = webcamRef.current.getScreenshot()
    postImage(imgBase64, userId, 'side')
  }, [webcamRef, userId])

  const sendToApi = React.useCallback(() => {
    callApi(userId)
  }, [userId])

  return (
    <>
      <Webcam
        audio={false}
        height={height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={width}
        videoConstraints={videoConstraints}
      />
      <button onClick={captureFront}>Capture front photo</button>
      <button onClick={captureSide}>Capture side photo</button>
      <button onClick={sendToApi}>Call Core API</button>
      {lastImageUrl ? (
        <Image src={lastImageUrl} width={width / 4} height={height / 4}></Image>
      ) : null}
    </>
  )
}
