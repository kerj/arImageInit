import styled from 'styled-components';

export const Canvas = styled.canvas`
  max-width: max-content;
  width: 100%;
`
export const HiddenCanvas = styled.canvas`
  display:none;
`

export const App = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
`

export const HiddenImg = styled.img`
  display: none;
`

const buttonHeight = '10vh';
export const Actions = styled.div`
  position: fixed;
  bottom: 10vh;
  left: 50vw;
  width: 100vw;
  text-align: center;
  transform: translateX(-50%);
  height: ${buttonHeight};
`

export const Snapshot = styled.button`
    border-radius: 50%;
    width: ${buttonHeight};
    height: ${buttonHeight};
    padding: 0;
    background: #cb4e4e;
    color: #fff;
    box-shadow: 0 6px #ab3c3c;
    border: none;
    font-family: inherit;
    cursor: pointer;
    display: inline-block;
    margin: 0 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    z-index: 10;
    transition: all 0.3s;
`
