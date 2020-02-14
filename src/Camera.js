import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import useGlobal from './store';

import * as Styled from './styles/Camera.styles';

export const Camera = ({ download, height, width }) => {
  const [globalState, globalActions] = useGlobal();
  const camRef = useRef(null)

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    globalActions.getPhoto(imageSrc);
  }, [])

  const videoConstraints = {
    height: 640,
    width: 480,
    facingMode: "user",
  };
  // src on sticker needs to sync with background prop in app!!!
  return (
    <>
      <Styled.Camera
        audio={false}
        ref={camRef}
        mirrored={true}
        height={height}
        width={width}
        videoConstraints={videoConstraints}
      >
      </Styled.Camera>
      <Styled.Snapshot onPointerDown={capture}>Take Photo</Styled.Snapshot>
      <Styled.Snapshot onPointerDown={download}>Download</Styled.Snapshot>
    </>
  )
}

Camera.propTypes = {
  download: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
}

export default Camera;