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
  const w = window, 
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x = w.innerWidth || e.clientWidth || g.clientWidth,
  y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  // x y are the x/y of the viewing screen
  


  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    picFromCamera.current.onload = () => {
      ctx.drawImage(picFromCamera.current, 0, 0)
      // 20, 120 should be set based off of x and y
      ctx.drawImage(image.current, 80, 120, 180, 240)
    }
  }, [globalState.photo])

  function DownloadCanvasAsImage() {
    let canvas = document.getElementById('myCanvas');
    canvas.toBlob(function (blob) {
      saveAs(blob, "image.png");
    }, 'image/png');
  }

  const DrawSticker = (source, xPos, yPos) => {
    console.group('drawing')
    // xPos and yPos will be based off of x/y and affect how the image.current is drawn onto the canvas
    return <Styled.Sticker viewbox='0 0 50 50' src={source} xPos={xPos} yPos={yPos} />;
  }

  const [Sticker, setSticker] = useState(DrawSticker(stickerOfChoice.current, -500, -600))

  const handleMove = (x, y) => {
    // can move based on touch/click needs heavily refined
    const xPos = Math.floor(x) + 'px'
    const yPos = -Math.floor(y) + 'px'
    console.log(xPos, yPos)
    //
    setSticker(DrawSticker(stickerOfChoice.current, xPos, yPos))
  }

  const handleTouch = (e) => {
    // get the start position and get ready to move
    handleMove(e.touches[0].clientX, e.touches[0].clientY)
  }




  return (
    <Styled.App
      // onTouchStart={e => handleTouch(e)}
    >
      <Camera download={DownloadCanvasAsImage}>
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
