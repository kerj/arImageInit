import React, { useRef, useEffect, useState } from 'react';
import * as Styled from './styles/App.styles'
import year from './imgs/2020.svg';
import Camera from './Camera';
import useGlobal from './store';
import { saveAs } from 'file-saver';

function App() {
  const [globalState, globalActions] = useGlobal();
  const canvas = useRef();
  // change the image will change the sticker the users sees!
  const image = useRef();
  const picFromCamera = useRef(globalState.photo);
  const stickerOfChoice = useRef(year)
  const stickerPos = useRef([0, 0])
  const stickerElement = useRef()


  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  const handleMove = (newX, newY) => {

    stickerPos.current[0] = newX;
    stickerPos.current[1] = newY;
    console.log(stickerPos)
    setSticker(DrawSticker(stickerOfChoice.current, stickerPos.current[0], stickerPos.current[1]))
  }

  const handleTouch = (e) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY)
    console.log(e.touches[0].clientX, e.touches[0].clientY)
  }

  useEffect(() => {
    console.log('photo taken')
    const ctx = canvas.current.getContext('2d')
    console.log(canvas.current)
    picFromCamera.current.onload = () => {
      ctx.drawImage(picFromCamera.current, 0, 0, canvas.current.width, canvas.current.height)
      ctx.drawImage(image.current, stickerPos.current[0], stickerPos.current[1], 180, 240)
    }
    return () => {
      picFromCamera.current.onload = () => {
      }
    }
  }, [globalState.photo])

  function DownloadCanvasAsImage() {
    let canvas = document.getElementById('myCanvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, "image.png");
    }, 'image/png');
  }


  const DrawSticker = (source, xPos, yPos, stickerRef) => {
    return <Styled.Sticker ref={stickerRef} viewbox='0 0 50 50' src={source} xPos={xPos} yPos={yPos} />;
  }

  const [Sticker, setSticker] = useState(DrawSticker(stickerOfChoice.current, stickerPos.current[0], stickerPos.current[1], stickerElement))

  return (
    <Styled.App>
      <Styled.TouchArea
        onTouchStart={handleTouch}
      >
      </Styled.TouchArea>
      <Camera
        download={DownloadCanvasAsImage}
      >
      </Camera>
      <Styled.Canvas
        id='myCanvas'
        height={640}
        width={480}
        background={year}
        ref={canvas}
      >
      </Styled.Canvas>
      {Sticker}
      <Styled.HiddenImg src={year} alt="logo" ref={image} />
      <Styled.HiddenImg src={globalState.photo} ref={picFromCamera} />
    </Styled.App>
  );
}

export default App;
