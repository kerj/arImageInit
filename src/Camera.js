import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles/Camera.styles';

export const Camera = React.forwardRef(({ download, onUserMedia, onUserMediaError }, ref) => {

  const videoConstraints = {
    facingMode: "user",
    width: { min: 480, ideal: 1920, max: 5000 },
    height: { min: 640, ideal: 1080, max: 5000}
  };
  // src on sticker needs to sync with background prop in app!!!
  return (
    <>
      <Styled.Camera
        audio={false}
        ref={ref}
        mirrored={true}
        videoConstraints={videoConstraints}
        forceScreenshotSourceSize={true}
        onUserMedia={onUserMedia}
        onUserMediaError={onUserMediaError}
        screenshotQuality={1}
      >
      </Styled.Camera>
    </>
  )
})

Camera.propTypes = {
  download: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  onUserMedia: PropTypes.func,
  onUserMediaError: PropTypes.func,
}

export default Camera;
