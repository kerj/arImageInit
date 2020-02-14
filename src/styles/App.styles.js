import styled from 'styled-components';


export const Canvas = styled.canvas`
  background-color: #ccc;
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
  background-color: rebeccapurple;
  opacity: .5;
  z-index: 5;
`