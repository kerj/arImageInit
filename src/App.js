import React, { useRef, useEffect, useState } from 'react';
import * as Styled from './styles/App.styles'
import year from './imgs/2020.svg';
import Camera from './Camera';
import useGlobal from './store';
import './App.css';

function App() {
  const [globalState, globalActions] = useGlobal();
  const canvas = useRef();
  // change the image will change the sticker the users sees!
  const image = useRef();
  const picFromCamera = useRef(globalState.photo);


  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    picFromCamera.current.onload = () => {
      ctx.drawImage(picFromCamera.current, 0, 0)
      ctx.drawImage(image.current, 80, 120, 180, 240)
    }
  }, [globalState.photo])

  function DownloadCanvasAsImage() {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('myCanvas');
    canvas.toBlob(function (blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
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
