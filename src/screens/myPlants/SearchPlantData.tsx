import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import {
  SearchPlantDataInput,
  PlantDataDetailModal,
  SearchPlantButton,
  SearchedPlantList,
} from '../../components/myPlants/SearchPlantData';
import { TokenContext } from '../../navigations/AppNavigator';
import { PlantsDB } from '../../util/api/route';
import theme from '../../../theme';

// navigation -> props / plantInfo, setPlantInfo -> props.route.params
interface SearchPlantDataProps {}

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
    marginTop: 18,
    marginBottom: 40,
    width: '97%',
  },
  search: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
  },
});

const SearchPlantData = (props: SearchPlantDataProps) => {
  const { navigation } = props;
  const { plantInfo, setPlantInfo } = props.route.params;
  const [query, setQuery] = useState('');
  const [showDetailData, setShowDetailData] = useState(false);
  const [plants, setPlants] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { headers } = useContext(TokenContext);

  async function searchDb(query, headers) {
    const result = await PlantsDB.searchPlant(query, headers);
    console.log(result.data);
    return result.data;
  }

  const onPressSearch = async () => {
    let result = null;
    if (query.length > 1) {
      result = await searchDb(query, headers);
    } else {
      Alert.alert(
        '',
        '검색어를 두 글자 이상 입력해주세요',
        [{ text: '확인', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
    setPlants(result);
  };

  const changeInputValueToData = () => {
    setPlantInfo({
      ...plantInfo,
      plantName: selectedPlant.distributionName || '',
      scientificName: selectedPlant.scientificName || '',
      advice: selectedPlant.advice || '',
    });
    navigation.goBack();
  };

  // 동기적으로 만들기
  const showSelectedPlantData = async item => {
    let result = null;
    result = await PlantsDB.getPlantData(item.id, headers);
    setSelectedPlant(result.data);
    setShowDetailData(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.position}>
          <PlantDataDetailModal
            showDetailData={showDetailData}
            setShowDetailData={setShowDetailData}
            selectedPlant={selectedPlant}
            changeInputValueToData={changeInputValueToData}
          />
          <View style={styles.search}>
            <SearchPlantDataInput
              query={query}
              setQuery={setQuery}
              onPressSearch={onPressSearch}
            />
            {/* <SearchPlantButton onPressSearch={onPressSearch} /> */}
          </View>
          <SearchedPlantList
            plants={plants}
            showSelectedPlantData={showSelectedPlantData}
          />
          {/* <View>
            {plants.map(plant => (
              <List.Item
                key={plant.id}
                plant={plant}
                title={plant.name}
                description={plant.scientificName}
                onPress={() => showSelectedPlantData(plant)}
              />
            ))}
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchPlantData;
