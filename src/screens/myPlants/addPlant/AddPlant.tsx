import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import produce from 'immer';
import {
  GoToSearchPlantDataButton,
  MyPlantInfoInputs,
  EditMyPlantInfoButton,
  EditMyPlantPhoto,
} from '../../../components/myPlants/myPlant/MyPlantInfoEdit';
import { GoToSelectParametersButton } from '../../../components/myPlants/addPlant/AddPlant';
import { TokenContext } from '../../../navigations/AppNavigator';
import { Plant, Parameters } from '../../../util/api/route';
import { SelectPhoto } from '../../../util/helper';
import theme from '../../../../theme';

// props.route.params.parametersData, username 혹은 userId 필요
interface AddPlantProps {}

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

// 입력하세요 창 디폴트 사진 여기서 변경
const defaultData = {
  id: null,
  image: '',
  nickname: '',
  plantName: '',
  scientificName: '',
  adoptionDate: '',
  deathDate: '',
  memo: '',
  advice: '',
  openAllow: 1,
  familyName: '',
};

const AddPlant = (props: AddPlantProps) => {
  const { navigation } = props;
  const { parametersData } = props.route.params;
  const { headers } = useContext(TokenContext);

  // 파라미터의 선택 상황을 모두 false로 설정한 새로운 파라미터 객체를 만들기
  const renderParameter = produce(parametersData, draftState => {
    draftState.forEach(param => {
      param.status = false;
      return param;
    });
  });

  const [parameters, setParameters] = useState(renderParameter);

  // 변하는 식물정보 입력내용을 저장하기 위한 state를 설정
  const [plantInfo, setPlantInfo] = useState(defaultData);

  const onChangeText = (key, text) => {
    setPlantInfo({
      ...plantInfo,
      [key]: text,
    });
  };

  const selectPlantPhoto = () => {
    SelectPhoto('식물 대표사진을 선택하세요', plantInfo, setPlantInfo);
  };

  // 식물 정보에 대표 이미지가 없을 때 식물로그 헤더 섬네일에 적용할 컬러 잎사귀 이미지
  const defaultPlantImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogPlantDefualtImage.png';

  async function postNewPlant(plantImage, info, params) {
    const plantResult = await Plant.addPlant(plantImage, info, headers);
    const paramResult = await Parameters.setPlantParameters(
      plantResult.data.id,
      params,
      headers,
    );
    if (
      plantResult.data &&
      paramResult.data &&
      plantResult.status === 201 &&
      paramResult.status === 201
    ) {
      const { id, nickname, image } = plantResult.data;
      if (image === null) {
        plantResult.data.image = defaultPlantImage;
      }
      navigation.navigate('MyPlantManageLogs', {
        plantId: id,
        image: plantResult.data.image,
        plantName: nickname,
      });
    }
  }

  const addNewPlant = () => {
    const { nickname, plantName, adoptionDate } = plantInfo;
    const image = plantInfo.image || null;
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
      const selectedParams = produce(parameters, draft => {
        return draft.reduce((newArray, param) => {
          if (param.status === true) {
            newArray.push(param.id);
          }
          return newArray;
        }, []);
      });
      postNewPlant(image, plantInfo, selectedParams);
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
            // isValidDate={isValidDate}
            // setDate={setDate}
          />
          <GoToSelectParametersButton
            parameters={parameters}
            setParameters={setParameters}
          />
          <EditMyPlantInfoButton
            parameters={parameters}
            fromAddPlant={1}
            addNewPlant={addNewPlant}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPlant;
