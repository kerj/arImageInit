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

  return (
    <>
      <Camera download={DownloadCanvasAsImage}>
      </Camera>
      <Styled.Canvas
        id='myCanvas'
        height={480}
        width={640}
        background={year}
        ref={canvas}
      >
      </Styled.Canvas>
      <Styled.HiddenImg src={year} alt="logo" ref={image} />
      <Styled.HiddenImg src={globalState.photo} ref={picFromCamera} />
    </>
  );
}

export default App;
