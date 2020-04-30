import React, { useRef, useEffect, useState, useCallback } from 'react';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import useGlobal from './store';
import PhotoDownload from './PhotoDownload';
import Preview from './Preview'

import * as Styled from './styles/App.styles'

import batman from './imgs/batman.png'
import count from './imgs/count.png'
import daffy from './imgs/daffy.png'
import lando from './imgs/lando.png'
import strange from './imgs/strange.png'

const stickerImages = {
  batman: batman,
  count: count,
  daffy: daffy,
  landy: lando,
  strange: strange,
}

function App({ stickerChoice }) {
  const [globalState, globalActions] = useGlobal();
  const [isDev, setIsDev] = useState(true);
  const [stickerPos, setStickerPos] = useState([0, 0]);
  const [stickerImage, setStickerImage] = useState(stickerImages[stickerChoice] || stickerImages['batman']);

  const stickerElement = useRef();
  const image = useRef();
  const picFromCamera = useRef(globalState.photo);
  const camPreview = useRef();
  const camRef = useRef(null);
  const cycleStickerRef = useRef();
  const next = useRef(null);
  // TODO: Use this in some way to provide a friendly error message.
  const [error, setError] = useState(false);
  const [currentOrientation, setOrientation] = useState('unknown')

  const [videoDims, setVideoDims] = useState(['???', '???']);

  useEffect(() => {
    // find and set user camera dimensions here
    const video = document.querySelector('video')
    if (!video) return

    const playListener = () => {
      setVideoDims([video.videoWidth, video.videoHeight])
    }
    video.addEventListener('play', playListener)

    // Might already be running
    if (!video.paused) {
      setVideoDims([video.videoWidth, video.videoHeight])
    }
    // cleanup after yourself, create a listener, remove it
    return () => {
      video.removeEventListener('play', playListener)
    }
    // everytime user changes orientation of device- reset the dims
  }, [currentOrientation])

  const getPreview = () => {
    camPreview.current = document.querySelector('video');
  }

  useEffect(() => {
    // always keep an up-to-date ref
    getPreview()
  })

  // Used for debug cycling for images 
  const cycleSticker = () => {
    const stickerList = Object.keys(stickerImages)

    let current = next.current !== null ? cycleStickerRef.current : stickerList.indexOf(stickerChoice)
    next.current = current + 1;

    if (next.current >= stickerList.length) {
      next.current = 0
    }

    cycleStickerRef.current = next.current;
    setStickerImage(stickerImages[stickerList[next.current]])
  }

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    globalActions.getPhoto(imageSrc);
    globalActions.setMode('viewPhoto');
  }, [globalActions])

  return (

    <DeviceOrientation
      lockOrientation={'portrait'}
      onOrientationChange={(orientation, type, angle) => {
        setOrientation(orientation)
      }}
    >
      <Orientation orientation='portrait' alwaysRender={false}>
        <Styled.App>
          {
            globalState.activeMode === 'viewPhoto' &&
            <PhotoDownload
              activeCam={camPreview}
              setVideo={videoDims}
              img={image}
              stickerXY={stickerPos}
              sticker={stickerImage}
              stickerRef={stickerElement} />
          }
          {
            globalState.activeMode === 'takePhoto' &&
            <>
              <Preview
                ref={camRef}
                stickerImage={stickerImage}
                imageRef={image}
                stickerRef={stickerElement}
                reportStickerPos={setStickerPos}
                setError={setError}
              />
              <Styled.Actions>
                <Styled.Snapshot onClick={capture}>Take Photo</Styled.Snapshot>
                {
                  isDev &&
                  <Styled.Snapshot onClick={() => { cycleSticker() }}>
                    Cycle Image
                  </Styled.Snapshot>
                }
                <Styled.HiddenImg id='fromCamera' src={globalState.photo} ref={picFromCamera} />
              </Styled.Actions>
            </>
          }
        </Styled.App>
      </Orientation>
      <Orientation orientation='landscape' alwaysRender={false}>
        <Styled.RotationWarning>
          <p>Please rotate your device</p>
        </Styled.RotationWarning>
      </Orientation>
    </DeviceOrientation>
  );
}

export default App;

