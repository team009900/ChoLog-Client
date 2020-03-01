import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import produce from 'immer';
import {
  WeatherInfoBar,
  MyPlantImage,
  ParameterList,
  LogNote,
  GoToMyPlantLogEditButton,
  DeleteLogButton,
  WarningModal,
} from '../../../../components/myPlants/myPlant/myPlantLog/MyPlantLog';
import { TokenContext } from '../../../../navigations/AppNavigator';
import { Diary } from '../../../../util/api/route';
import theme from '../../../../../theme';

// diaryId, parametersData(네비게이터부터 내려오는 파라미터 데이터 목록)
interface MyPlantLogProps {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  position: {
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 30,
  },
  buttons: { flexDirection: 'row', alignItems: 'center' },
});

const MyPlantLog = (props: MyPlantLogProps) => {
  const { navigation } = props;
  const { headers } = useContext(TokenContext);
  const {
    diaryId,
    parametersData,
    plantParameter,
    weatherData,
  } = props.route.params;
  // 일기 수정 페이지에 전달할 state
  const [diaryData, setDiaryData] = useState(null);
  const [loggedState, setLoggedState] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getData = navigation.addListener('focus', async () => {
      const response = await Diary.getDiary(diaryId, headers);
      if (response.data && response.status === 200) {
        response.data.temperature =
          response.data.temperature && String(response.data.temperature);
        response.data.humidity =
          response.data.humidity && String(response.data.humidity);
        if (response.data.states) {
          const states = produce(response.data.states, draft => {
            return draft.map(item => {
              parametersData.forEach(param => {
                if (item.id === param.id) {
                  item = { ...item, ...param };
                }
              });
              return item;
            });
          });
          setLoggedState(states);
        }
        setDiaryData(response.data);
      }
    });
    return getData;
  }, [diaryId, headers, navigation, parametersData]);

  async function deleteDiary() {
    const response = await Diary.deleteDiary(diaryId, headers);
    if (response.status === 204) {
      navigation.goBack();
    }
  }

  const findWeatherName = id => {
    let name = null;
    weatherData.forEach(item => {
      if (item.id === id) {
        name = item.name;
      }
    });
    return name;
  };

  const parameterGroup = produce(loggedState, draft => {
    return draft.reduce(
      (groupObj, param) => {
        if (param.type === 1) {
          groupObj.hasLevel.push(param);
        } else {
          groupObj.noLevel.push(param);
        }
        return groupObj;
      },
      {
        hasLevel: [],
        noLevel: [],
      },
    );
  });

  const { hasLevel, noLevel } = parameterGroup;

  if (!diaryData) return null;
  return (
    <ScrollView style={styles.container}>
      <WarningModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        deleteDiary={deleteDiary}
      />
      <View>
        <WeatherInfoBar
          diaryData={diaryData}
          findWeatherName={findWeatherName}
        />
        <MyPlantImage diaryData={diaryData} />
        <ParameterList
          loggedState={loggedState}
          hasLevel={hasLevel}
          noLevel={noLevel}
        />
        <View style={styles.position}>
          <LogNote diaryData={diaryData} />
          <View style={styles.buttons}>
            <GoToMyPlantLogEditButton
              diaryData={diaryData}
              parametersData={parametersData}
              plantParameter={plantParameter}
              weatherData={weatherData}
            />
            <DeleteLogButton setIsVisible={setIsVisible} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPlantLog;
