export const getPhoto = (store, image) => {
  const photo = image;
  store.setState({ photo })
}