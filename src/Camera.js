import React, { useRef, useCallback } from 'react'
import CameraEle from 'react-webcam'
import useGlobal from './store'
import * as Styled from './styles/Camera.styles'

export const Camera = () => {
  const [globalState, globalActions] = useGlobal();
  const camRef = useRef(null)

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    globalActions.getPhoto(imageSrc);
  }, [])

  const videoConstraints = {
    facingMode: "user",
  };


  return (
    <>
      <CameraEle
        audio={false}
        ref={camRef}
        videoConstraints={videoConstraints}
      >
      </CameraEle>
      <Styled.Snapshot onClick={capture}> Take Photo</Styled.Snapshot>
    </>
  )
}

export default Camera;