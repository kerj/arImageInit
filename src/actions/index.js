export const getPhoto = (store, image) => {
  const photo = image;
  store.setState({ photo })
}

export const setMode = (store, newMode) => {
  const activeMode = newMode;
  store.setState({ activeMode })
 }

 export const setStickerAttrs = (store, dims) => {
   const stickerAttrs = dims;
   store.setState({ stickerAttrs })
 }
