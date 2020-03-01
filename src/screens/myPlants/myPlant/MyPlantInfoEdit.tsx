import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import produce from 'immer';
import { PlantInfo } from '../../../types/MyPlantInfo';
import { TokenContext } from '../../../navigations/AppNavigator';
import {
  GoToSearchPlantDataButton,
  MyPlantInfoInputs,
  EditMyPlantInfoButton,
  EditMyPlantPhoto,
} from '../../../components/myPlants/myPlant/MyPlantInfoEdit';
import { SelectPhoto, getChangedDataOnly } from '../../../util/helper';
import { Plant } from '../../../util/api/route';
import theme from '../../../../theme';

// props.route.params.plantInfo
interface MyPlantInfoEditProps {
  route: {
    params: {
      plantInfo: PlantInfo;
    };
  };
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  contentsContainer: {
    width,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  position: {
    marginTop: 30,
    marginBottom: 40,
    width: '88%',
  },
});

const MyPlantInfoEdit = (props: MyPlantInfoEditProps) => {
  const { navigation } = props;
  const { params } = props.route;
  const [plantInfo, setPlantInfo] = useState(params.plantInfo);
  const { headers } = useContext(TokenContext);

  const prevPlantInfo = produce(props.route.params.plantInfo, draft => draft);

  const onChangeText = (key, text) => {
    setPlantInfo({
      ...plantInfo,
      [key]: text,
    });
  };

  const selectPlantPhoto = () => {
    SelectPhoto('식물 대표사진을 선택하세요', plantInfo, setPlantInfo);
  };

  async function patchRequest(isImageDeleted, id, image, data, headers) {
    const result = await Plant.editPlant(
      isImageDeleted,
      id,
      image,
      data,
      headers,
    );
    if (result.status && result.status === 200) {
      navigation.goBack();
    }
  }

  const editPlantInfo = () => {
    const isImageDeleted = false;
    const { nickname, plantName, adoptionDate } = plantInfo;
    let newImage = null;

    if (nickname === '' || plantName === '' || adoptionDate === '') {
      Alert.alert(
        '',
        '필수 입력 항목을 모두 작성해주세요.',
        [{ text: '확인' }],
        {
          cancelable: false,
        },
      );
    } else {
      const resultObj = getChangedDataOnly(
        prevPlantInfo,
        plantInfo,
        Object.keys(plantInfo),
      );

      if (resultObj.image) {
        newImage = resultObj.image;
      }
      if (Object.keys(resultObj).length > 0) {
        patchRequest(
          isImageDeleted,
          plantInfo.id,
          newImage,
          resultObj,
          headers,
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.position}>
          <GoToSearchPlantDataButton
            plantInfo={plantInfo}
            setPlantInfo={setPlantInfo}
          />
          <EditMyPlantPhoto
            plantInfo={plantInfo}
            selectPlantPhoto={selectPlantPhoto}
          />
          <MyPlantInfoInputs
            plantInfo={plantInfo}
            onChangeText={onChangeText}
          />
          <EditMyPlantInfoButton editPlantInfo={editPlantInfo} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPlantInfoEdit;
