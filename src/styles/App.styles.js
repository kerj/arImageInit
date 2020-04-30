import styled, { keyframes } from 'styled-components';

export const App = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  height: 100%;
`

export const RotationWarning = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-content: center;
  justify-content: center;
`

export const HiddenImg = styled.img`
  display: none;
`

const buttonHeight = '10vh';
export const Actions = styled.div`
  position: fixed;
  bottom: 5vh;
  left: 50vw;
  width: 100vw;
  text-align: center;
  transform: translateX(-50%);
  height: ${buttonHeight};
`

const pressButton = keyframes`
  0% {
    box-shadow: 0 6px #ab3c3c;
  }
  50% {
    box-shadow: 0 3px #ab3c3c;
  }
  100% {
    box-shadow: 0 0px #ab3c3c;
  }
`

export const Snapshot = styled.button`
    z-index: 1000;
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
    margin: 0px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    :active {
      transform: translateY(6px);
      animation: .1s ${pressButton} ease both;
    }
`
