const formDataMaker = (photo, body) => {
  const data = new FormData();

  if (typeof photo === 'object' && photo !== null) {
    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
  }

  Object.keys(body).forEach(key => {
    if (key !== 'image') {
      data.append(key, body[key]);
    }
  });

  return data;
};

export default formDataMaker;
