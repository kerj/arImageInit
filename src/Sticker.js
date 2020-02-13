import React, { useRef, useCallback } from 'react';
import * as Styled from './styles/Sticker.styles';

export const Sticker = drawSticker => {

  return(
    <Styled.Sticker src={drawSticker.source} id='sticker' xPosition={drawSticker.xPos} yPosition={drawSticker.yPos} />
  )
}

export default Sticker;