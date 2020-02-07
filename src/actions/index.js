export const getPhoto = (store, image) => {
  const photo = image;
  store.setState({ photo })
}

export const getEditedPhoto = (store, editImage) => {
  const editedPhoto = editImage;
  store.setState({editedPhoto})
} 