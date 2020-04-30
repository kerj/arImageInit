import React from "react";
import useGlobalHook from "use-global-hook"

import * as actions from "../actions";

const initialState = {
  photo: null,
  activeMode: 'takePhoto',
  mode: [
    'takePhoto',
    'viewPhoto',
  ],
  stickerAttrs: {
    stickerDims: {
      width: null,
      height: null
    },
    camDims: {
      width: null,
      height: null
    },
    stickerXY: [],
  }
}

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;