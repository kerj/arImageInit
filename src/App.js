import React, {useRef, useEffect, useState, useCallback} from 'react';
import * as Styled from './styles/App.styles'
import useGlobal from './store';
import { saveAs } from 'file-saver';
import PhotoDownload from './PhotoDownload';
import Preview from './Preview'
import superman from './imgs/selfie_superman.png'
import batman from './imgs/batman.png'
import count from './imgs/count.png'
import daffy from './imgs/daffy.png'
import landy from './imgs/lando.png'
import stange from './imgs/strange.png'

const stickerImages = [
  batman,
  count,
  daffy,
  landy,
  stange,
  superman
];

function App() {
  const [globalState, globalActions] = useGlobal();
  const stickerElement = useRef()
  const [stickerPos, setStickerPos] = useState([0, 0])
  // change the image will change the sticker the users sees!
  const image = useRef();
  const picFromCamera = useRef(globalState.photo);
  const [stickerImage, setStickerImage] = useState(stickerImages[0])
  const camPreview = useRef()
  const camRef = useRef(null)
  // TODO: Use this in some way to provide a friendly error message.
  const [error, setError] = useState(false)

  const [videoDims, setVideoDims] = useState(['???', '???'])

  useEffect(() => {
    if (document.getElementsByTagName('video') === null ) return
    document.getElementsByTagName('video')[0].addEventListener('play', () => {
      setVideoDims([document.getElementsByTagName('video')[0].videoWidth, document.getElementsByTagName('video')[0].videoHeight])
    })
  },[])

  const getPreview = () => {
    camPreview.current = document.querySelector('video');
  }

  useEffect(() => {
    getPreview()
  })

  // Used for debug cycling or images
  const [currentImg, setCurrentImg] = useState(0)
  const cycleSticker = () => {
    let next = currentImg + 1;
    if (next >= stickerImages.length) {
      next = 0
    }
    setCurrentImg(next)
  }
  useEffect(() => {
    setStickerImage(stickerImages[currentImg])
  }, [currentImg])

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    globalActions.getPhoto(imageSrc);
    globalActions.setMode('viewPhoto');
  }, [globalActions])

  return (
    <Styled.App>
      {
        globalState.activeMode === 'viewPhoto' &&
        <PhotoDownload activeCam={camPreview} setVideo={videoDims} img={image} stickerXY={stickerPos} sticker={stickerImage} stickerRef={stickerElement}/>
      }
      {
        globalState.activeMode === 'takePhoto' &&
        <>
          <div>Video W: ${videoDims[0]} H:{videoDims[1]}</div>
          <Preview
            ref={camRef}
            imageRef={image}
            stickerImage={stickerImage}
            stickerRef={stickerElement}
            reportStickerPos={setStickerPos}
            setError={setError}
          />
          <Styled.Actions>
            <Styled.Snapshot onClick={capture}>Take Photo</Styled.Snapshot>
            <Styled.Snapshot onClick={() => {cycleSticker()}}>Cycle Image</Styled.Snapshot>
            <Styled.HiddenImg id='fromCamera' src={globalState.photo} ref={picFromCamera} />
          </Styled.Actions>
        </>
      }
     
    </Styled.App>
  );
}

export default App;
