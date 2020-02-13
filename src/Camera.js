import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import useGlobal from './store';

import * as Styled from './styles/Camera.styles';

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
  // src on sticker needs to sync with background prop in app!!!
  return (
    <>
      <Styled.Camera
        audio={false}
        ref={camRef}
        mirrored={true}
        height={480}
        width={640}
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
  sticker: PropTypes.object,
}

export default Camera;