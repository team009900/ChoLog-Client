import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import produce from 'immer';
import { TokenContext } from '../../../navigations/AppNavigator';
import {
  MyPlantInfoDetails,
  GoToMyPlantInfoEditButton,
  DeleteMyPlantButton,
  GoodByeToPlantButton,
  GoToSelectParametersButton,
  WarningModal,
} from '../../../components/myPlants/myPlant/MyPlantInfo';
import theme from '../../../../theme';
import { Plant, Parameters } from '../../../util/api/route';

// props.route.params.parameterData / props.route.params.plantId
interface MyPlantInfoProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  buttonList: {
    flex: 5,
    backgroundColor: theme.colors.surface,
    marginBottom: 25,
  },
  divider: {
    backgroundColor: theme.colors.divider,
  },
});

const MyPlantInfo = (props: MyPlantInfoProps) => {
  const { navigation } = props;
  const { plantId, parametersData, setPlantData } = props.route.params; // plantParameter
  const [plantInfo, setPlantInfo] = useState({});
  const [plantParameter, setPlantParameter] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { headers } = useContext(TokenContext);

  const [renderParameter, setRenderParameter] = useState([]);

  // 식물 대표 이미지가 없을 때 사용하는 디폴트 이미지(정사각형)
  const defaultPlantImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogPlantDefualtImage.png';

  useEffect(() => {
    async function getParameters() {
      const response = await Parameters.getPlantParameters(plantId, headers);
      if (response.data && response.status === 200) {
        setPlantParameter(response.data);
        const parameters = produce(parametersData, draft => {
          draft.forEach(param => {
            param.status = false;
            response.data.forEach(item => {
              if (param.id === item.id) {
                param.status = true;
              }
            });
            return param;
          });
        });
        setRenderParameter(parameters);
      }
    }
    getParameters();

    const getData = navigation.addListener('focus', async () => {
      const response = await Plant.getPlantData(plantId, headers);
      if (response.data && response.status === 200) {
        const { image } = response.data;
        if (image === null) {
          // 헤더 섬네일과 닉네임 업데이트
          setPlantData({
            plantName: response.data.nickname,
            plantImage: defaultPlantImage,
          });
        } else {
          setPlantData({
            plantName: response.data.nickname,
            plantImage: response.data.image,
          });
        }
        setPlantInfo(response.data);
      }
      getParameters();
    });
    return getData;
  }, [headers, navigation, parametersData, plantId, setPlantData]);

  const dayCounter = date => {
    const adoptionDay = new Date(date);
    const today = new Date();
    const day = 24 * 60 * 60 * 1000;
    return Math.floor((today - adoptionDay) / day);
  };

  async function deletePlant() {
    const response = await Plant.deletePlant(plantId, headers);
    if (response.data && response.status === 200) {
      navigation.navigate('MyPlants');
    }
  }

  if (!plantParameter || !plantInfo) return null;
  return (
    <ScrollView style={styles.container}>
      <WarningModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        nickname={plantInfo.nickname}
        deletePlant={deletePlant}
      />
      <View>
        <MyPlantInfoDetails plantInfo={plantInfo} dayCounter={dayCounter} />
      </View>
      <View style={styles.buttonList}>
        <GoToSelectParametersButton
          plantId={plantId}
          parameters={renderParameter}
        />
        <Divider style={styles.divider} />
        <GoToMyPlantInfoEditButton plantInfo={plantInfo} />
        <Divider style={styles.divider} />
        <DeleteMyPlantButton setIsVisible={setIsVisible} />
        {/* <Divider style={styles.divider} /> */}
        {/* <GoodByeToPlantButton id={plantInfo.id} /> */}
      </View>
    </ScrollView>
  );
};

export default MyPlantInfo;
