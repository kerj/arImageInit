import React, { useEffect, useState, useCallback} from 'react';
import useGlobal from './store'
import Camera from './Camera'
import * as Styled from './styles/Preview.styles'
import PropTypes from 'prop-types'

const Preview = React.forwardRef(({stickerImage, imageRef, stickerRef, reportStickerPos, setError}, ref) => {

  const [position, setPosition] = useState([0, 0])
  const [stickerNode, setStickerNode] = useState(null)
  const [showSticker, setShowSticker] = useState(false)
  const [globalState, globalActions] = useGlobal();
  // Callback that is called when the
  const measuredSticker = useCallback((node) => {
      stickerRef.current = node
      setStickerNode(node)
  },
  [stickerRef])

  useEffect(() => {
    reportStickerPos([position[0], position[1]])
  }, [position, reportStickerPos])

  const onUserMedia = () => {
    // Video isn't playing yet.  But maybe it might be... this is fragile.
    ref.current.video.addEventListener('play', measureVideoAndPositionSticker)
  }

  function measureVideoAndPositionSticker() {
    if (!stickerNode) return
    /** @var {HTMLVideoElement} ref.current.video */
    if (!ref.current) return

    const stickerDims = {
      width: stickerNode.clientWidth,
      height: stickerNode.clientHeight
    }

    const camDims = {
      width: ref.current.video.clientWidth,
      height: ref.current.video.clientHeight
    }

    // Position sticker into the bottom right of the preview
    const newX = camDims.width - stickerDims.width;
    const newY = camDims.height - stickerDims.height;

    globalActions.setStickerAttrs({stickerDims, camDims, stickerXY:[newX, newY]});

    setPosition([newX, newY])
    setShowSticker(true)
  }

  const onUserMediaError = () => {
    setError()
  }

  return (
    <Styled.Preview>
      <Camera
        ref={ref}
        id='preview'
        download={() => {}}
        onUserMedia={onUserMedia}
        onUserMediaError={onUserMediaError}
      >
      </Camera>
      {
        <Styled.StickerContainer show={showSticker} xPos={position[0]} yPos={position[1]}>
          <Styled.Sticker ref={measuredSticker} src={stickerImage} />
        </Styled.StickerContainer>
      }

      <Styled.HiddenImg src={stickerImage} alt="logo" ref={imageRef} />
    </Styled.Preview>
  )
})

// Incomplete proptypes list because they've been in flux
Camera.propTypes = {
  setError: PropTypes.func,
}

export default Preview;
