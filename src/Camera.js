import React, { useRef, useCallback, useEffect } from 'react'
import useGlobal from './store'
import year from './imgs/2020.svg';
import * as Styled from './styles/Camera.styles'

export const Camera = ({ download }) => {
  const [globalState, globalActions] = useGlobal();
  const camRef = useRef(null)

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    globalActions.getPhoto(imageSrc);
  }, [])

  const videoConstraints = {
    facingMode: "user",
  };

  useEffect(() => {
    if (camRef.current) return
    const previewCanvas = document.getElementById('preview')
    camRef.current.onload = () => {
      setInterval(() => {
        previewCanvas.drawImage(camRef.current, 0, 0, 260, 125)
      }, 20);
    }
  }, [camRef])

  return (
    <>
      <Styled.Camera
        id='hiddenPreview'
        audio={false}
        ref={camRef}
        videoConstraints={videoConstraints}
      >
      </Styled.Camera>
      <Styled.Sticker src={year} id='sticker'></Styled.Sticker>
      <Styled.Snapshot onClick={capture}>Take Photo</Styled.Snapshot>
      <Styled.Snapshot onClick={download}>Download</Styled.Snapshot>
    </>
  )
}

export default Camera;