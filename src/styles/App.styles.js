import styled from 'styled-components';


export const Canvas = styled.canvas`
  max-width: max-content;
  width: 100%;
`

export const App = styled.div`

`

export const HiddenImg = styled.img`
  display: none;
`

export const Sticker = styled.img`
  position: absolute;
  width: 150px;
  top: ${props => props.yPos + 'px'};
  left: ${props => props.xPos + 'px'};
`

export const TouchArea = styled.div`
  position: absolute;
  margin: 0 0 20px 0;
  --width: 100%;
  width: var(--width);
  height: calc(var(--width) * 0.75);
  /* background-color: rebeccapurple; */
  max-width: ${props => props.maxWidth || 'var(--width)' };
  opacity: .5;
  z-index: 5;
`

export const Snapshot = styled.button`
    z-index: 1000;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    padding: 0;
    background: #cb4e4e;
    color: #fff;
    box-shadow: 0 6px #ab3c3c;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
    display: inline-block;
    margin: 15px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    z-index: 10;
`