import styled from 'styled-components'

export const Preview = styled.div`
  position: relative;
`

export const HiddenImg = styled.img`
  display: none;
`

export const Sticker = styled.img`
  position: absolute;
  width: 50%;
  top: ${props => props.yPos + 'px'};
  left: ${props => props.xPos + 'px'};
  opacity: ${props => props.show ? 1 : 0};
`
