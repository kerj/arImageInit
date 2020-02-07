import React, { useRef, useCallback } from 'react'
import CameraEle from 'react-webcam'
import useGlobal from './store'

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
      <button onClick={capture}> Take Photo</button>
    </>
  )
}

export default Camera;