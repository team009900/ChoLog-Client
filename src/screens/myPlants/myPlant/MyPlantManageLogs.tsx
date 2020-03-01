import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import produce from 'immer';
import { TokenContext } from '../../../navigations/AppNavigator';
import {
  MyPlantManageLogsCalendar,
  MyPlantManageLogsList,
  GoToMyPlantLogNewButton,
} from '../../../components/myPlants/myPlant/MyPlantManageLogs';
import theme from '../../../../theme';
import { Plant, Parameters, Weather } from '../../../util/api/route';

// props.route.params.plantId / props.route.params.parametersData / props.route.params.plantParameter
interface MyPlantManageLogsProps {}

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
    marginTop: 23,
    marginBottom: 100,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    padding: 5,
    borderRadius: 50,
  },
});

const defaultDate = {
  year: String(new Date().getFullYear()),
  month: String(new Date().getMonth() + 1),
};

const MyPlantManageLogs = (props: any) => {
  const { navigation } = props;
  const { plantId, parametersData } = props.route.params;
  const [logs, setLogs] = useState([]);
  const [yearMonth, setYearMonth] = useState(defaultDate);
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);
  const [date, setDate] = useState(timezoneDate.toISOString().slice(0, 10));
  console.log('오늘날짜?', date);

  // 날짜 선택 후 필터링 유무를 boolean으로 관리
  const [filtered, setFiltered] = useState(false);
  // 달력에서 날짜 선택시 그 날짜에 필터링 된 logData들이 들어갈 변수
  const [filteredLogData, setFilteredLogData] = useState(null);
  const [plantParameter, setPlantParameter] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const { headers } = useContext(TokenContext);

  const getData = useCallback(async () => {
    const { year, month } = yearMonth;
    let formedMonth = month;
    if (month.length === 1) {
      formedMonth = `0${yearMonth.month}`;
    }
    const response = await Plant.getDiaryList(
      plantId,
      year,
      formedMonth,
      headers,
    );
    if (response.data && response.status === 200) {
      const formedData = response.data.map(item => {
        item.createdAt = item.createdAt.slice(0, 10);
        return item;
      });
      const copiedLogData = produce(formedData, draftState => {
        draftState;
      });
      setLogs(formedData);
      setFilteredLogData(copiedLogData);
    }
  }, [yearMonth, plantId, headers]);

  useEffect(() => {
    async function getWeather() {
      const result = await Weather.getWeather(headers);
      if (result.data && result.status === 200) {
        const formedWeatherData = produce(result.data, draft => {
          draft.unshift({ id: 0, name: '날씨선택' });
        });
        setWeatherData(formedWeatherData);
      }
    }
    getWeather();

    async function getParameters() {
      const response = await Parameters.getPlantParameters(plantId, headers);
      if (response.data && response.status === 200) {
        setPlantParameter(response.data);
      }
    }
    getParameters();

    const getDataOnStateUpdate = () => {
      getData();
    };

    const getDataOnFocus = navigation.addListener('focus', () => {
      getData();
      getParameters();
    });

    getDataOnStateUpdate();
    return getDataOnFocus;
  }, [getData, headers, navigation, plantId]);

  // 날짜 선택시 필터링하는 함수
  const filteringData = (selectedDate, logData = logs) => {
    const filteredData = logData.filter(data => {
      return data.createdAt === selectedDate;
    });
    setFilteredLogData(filteredData);
  };

  const logDataDatesAndStates = produce(logs, draft => {
    return draft.map(data => {
      return {
        date: data.createdAt,
        states: data.states.map(state => {
          return state.id;
        }),
      };
    });
  });

  if (!logs || !plantParameter || !weatherData) return null;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.position}>
          <MyPlantManageLogsCalendar
            date={date}
            setDate={setDate}
            yearMonth={yearMonth}
            setYearMonth={setYearMonth}
            parametersData={parametersData}
            logDataDatesAndStates={logDataDatesAndStates}
            filteringData={filteringData}
            filtered={filtered}
            setFiltered={setFiltered}
          />
          {filtered ? ( // 필터링 됐으면 필터링 된 데이터를 쓰고, 안됐으면 전체 데이터 쓴다
            <MyPlantManageLogsList
              parametersData={parametersData}
              plantParameter={plantParameter}
              weatherData={weatherData}
              logList={filteredLogData}
            />
          ) : (
            <MyPlantManageLogsList
              parametersData={parametersData}
              plantParameter={plantParameter}
              weatherData={weatherData}
              logList={logs}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.button}>
        <GoToMyPlantLogNewButton
          date={date}
          plantId={plantId}
          parametersData={parametersData}
          plantParameter={plantParameter}
          weatherData={weatherData}
        />
      </View>
    </View>
  );
};

export default MyPlantManageLogs;
