import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import produce from 'immer';
import { MyPlantsTitle, MyPlantsItems } from '../../components/myPlants';
import theme from '../../../theme';
import { User } from '../../util/api/route';
import { TokenContext } from '../../navigations/AppNavigator';

// parametersData
interface MyPlantsProps {}

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
    marginBottom: 15,
    width: '90%',
  },
  indicator: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const MyPlants = (props: MyPlantsProps) => {
  const { navigation } = props;
  const { parametersData } = props.route.params;
  const [items, setPlants] = useState(null);

  const { headers } = useContext(TokenContext);

  const itemsCopy = produce(items, draftState => {
    draftState;
  });

  const dayCounter = date => {
    const adoptionDay = new Date(date);
    const today = new Date();
    const day = 24 * 60 * 60 * 1000;
    return Math.floor((today - adoptionDay) / day);
  };

  // 식물 등록 흑백 잎사귀
  const addPlantCardImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogPlantDefualtImage2-1.png';

  // 식물 디폴트 이미지 컬러 잎사귀
  const defaultPlantImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogPlantDefualtImage.png';

  useEffect(() => {
    async function fetchData() {
      const response = await User.getPlants(headers);
      if (response.data && response.status === 200) {
        response.data.map(item => {
          if (item.image === null) {
            item.image = defaultPlantImage;
          }
        });
        setPlants(response.data);
      }
    }
    fetchData();

    const getData = navigation.addListener('focus', async () => {
      const response = await User.getPlants(headers);
      if (response.data && response.status === 200) {
        response.data.map(item => {
          if (item.image === null) {
            item.image = defaultPlantImage;
          }
        });
        setPlants(response.data);
      }
    });
    return getData;
  }, [headers, navigation]);

  if (!items) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        color={theme.colors.primary}
      />
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.position}>
          <MyPlantsTitle />
          <MyPlantsItems
            items={itemsCopy}
            parametersData={parametersData}
            dayCounter={dayCounter}
            addPlantCardImage={addPlantCardImage}
          />
          {/* <Text>초록별이된식물들(아직미구현)</Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPlants;
