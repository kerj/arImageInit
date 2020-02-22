import React, { useEffect, useRef, useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import useGlobal from './store'
import * as Styled from './styles/PhotoDownload.styles'

export const PhotoDownload = ({ setVideo, stickerXY, sticker, stickerRef }) => {
  const [globalState, globalActions] = useGlobal();
  const [stickerNode, setStickerNode] = useState(null)
  const picFromCamera = useRef(globalState.photo);
  const canvas = useRef();

  const measuredSticker = useCallback((node) => {
    stickerRef.current = node;
    setStickerNode(node)
   },[stickerRef])

  useEffect(() => {
    if (!stickerNode) return
    const ctx = canvas.current.getContext('2d')
    // can set video width and height via video.videoWidth
    canvas.current.width = setVideo[0];
    canvas.current.height = setVideo[1];
    // Record the difference in scale between the video's data and the video element's width
    let videoScaleFactor = 1;
    const drawingAttrs = globalState.stickerAttrs
    // Don't divide by zero.
    if (setVideo[0] > 0 && drawingAttrs.camDims.width > 0) {
      videoScaleFactor = setVideo[0] / drawingAttrs.camDims.width;
    }

    const picFromCam = picFromCamera.current;
    
    picFromCam.onload = () => {
      ctx.drawImage(picFromCam, 0, 0, canvas.current.width, canvas.current.height)
      ctx.drawImage(stickerRef.current, drawingAttrs.stickerXY[0] * videoScaleFactor, drawingAttrs.stickerXY[1] * videoScaleFactor, drawingAttrs.stickerDims.width * videoScaleFactor, drawingAttrs.stickerDims.height * videoScaleFactor)

      canvas.current.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const cleanUpURL = () => {
          URL.revokeObjectURL(url);
        }
        const downloadableBlob = <Styled.Photo onload={cleanUpURL} src={url} />

        ReactDOM.render(downloadableBlob, document.getElementById('downloadablePhoto'))
      })
    }
    return () => {
      picFromCam.onload = () => {
      }
    }
  }, [globalState.photo, globalState.stickerAttrs, setVideo, stickerNode, stickerRef, stickerXY])



  return (
    <>
      <div id='downloadablePhoto'>
      </div>
      <Styled.Canvas
        id='myCanvas'
        background={sticker}
        ref={canvas}
      >
      </Styled.Canvas>
        <Styled.HiddenImg src={sticker} ref={measuredSticker} />
        <Styled.HiddenImg src={globalState.photo} ref={picFromCamera} />
    </>
      )
    }
    
export default PhotoDownload;