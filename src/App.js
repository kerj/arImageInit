import React, { useRef, useEffect } from 'react';
import * as Styled from './styles/App.styles'
import year from './imgs/2020.svg';
import Camera from './Camera';
import useGlobal from './store';
import './App.css';

function App() {
  const [globalState, globalActions] = useGlobal();
  const canvas = useRef();
  const image = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    image.current.onload = () => {
      ctx.drawImage(image.current, 80,120, 200, 220)
      ctx.font = "20px Courier bold"
      ctx.fillStyle = "white"
      ctx.fillText("Happy New Year", 100, 100)
    }
  }, [canvas])

  return (
    <>
      <Camera>
      </Camera>
      <Styled.Canvas
        background={globalState.photo}
        height={480}
        width={640}
        ref={canvas}
      >

      </Styled.Canvas>
      <Styled.HiddenImg src={year} alt="logo" ref={image} />
    </>
  );
}

export default App;
