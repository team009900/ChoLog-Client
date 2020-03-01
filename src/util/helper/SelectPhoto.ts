import ImagePicker from 'react-native-image-picker';

interface SelectPhotoProps {}

const SelectPhoto = (title, state, stateFunction) => {
  const options = {
    title,
    storageOptions: {
      skipBackup: true,
      noData: true,
      path: 'images',
    },
  };

  // https://github.com/react-native-community/react-native-image-picker
  ImagePicker.showImagePicker(options, response => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else {
      // 현재 base64 형식으로 표시 및 저장
      // const source = `data:image/jpeg;base64,${response.data}`;
      // response 객체 자체를 보내서 거기서 정보를 뽑아서 formdata로 보낼 수 있도록 함
      const source = response;
      stateFunction({
        ...state,
        image: source,
      });
    }
  });
};

export default SelectPhoto;
