import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import produce from 'immer';
import {
  WeatherInputs,
  SelectPlantPhoto,
  ParameterButtons,
  AddPlantLogButton,
  EditPlantLogButton,
  SelectLevelModal,
  WriteNoteInput,
} from '../../../../components/myPlants/myPlant/myPlantLog/MyPlantLogNew';
import { SelectPhoto, getChangedDataOnly } from '../../../../util/helper';
import { TokenContext } from '../../../../navigations/AppNavigator';
import { Diary } from '../../../../util/api/route';
import theme from '../../../../../theme';

// route에서 -> plantId, parametersData, plantParameter
interface MyPlantLogNewProps {}

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
    marginTop: 8,
    width: '88%',
  },
  parameters: {
    width: '100%',
  },
});

// 모달창에 보낼 level이 있는 파라미터 디폴트 객체
const defaultModal = {
  id: null,
  parameterName: '',
  type: null,
  title: '',
  description: '',
  color: '',
  status: null,
};

const MyPlantLogNew = (props: MyPlantLogNewProps) => {
  // 일기 입력창에서 입력하는 정보를 담고 post요청 시 첨부할 빈 데이터 객체
  const defaultData = {
    image: null,
    createdAt: props.route.params.date || null,
    note: '',
    temperature: '',
    weatherId: '',
    humidity: '',
    states: [],
  };

  const { navigation } = props;
  const {
    plantId,
    parametersData,
    plantParameter,
    weatherData,
  } = props.route.params;
  const { headers } = useContext(TokenContext);
  const isEditing = props.route.params.isEditing || null;
  const defaultDiaryData = props.route.params.diaryData || defaultData;
  const defaultSelectedParamsIds =
    (props.route.params.diaryData && props.route.params.diaryData.states) || [];

  // 해당 식물이 파라미터를 선택했는지 아닌지 여부인 status를 포함한 새로운 파라미터 배열 생성
  // 이 정보를 기준으로 파라미터 선택버튼을 랜더
  const renderParameter = produce(parametersData, draft => {
    draft.forEach(param => {
      param.status = false;
      plantParameter.forEach(item => {
        if (param.id === item.id) {
          param.status = true;
        }
      });
    });
  });

  // 날씨 id로 날씨 이름 추출
  const findWeatherName = id => {
    let name = null;
    weatherData.forEach(item => {
      if (item.id === id) {
        name = item.name;
      }
    });
    return name;
  };

  const defaultParameter = produce(renderParameter, draft => draft);
  const [parameters, setParameters] = useState(defaultParameter);

  // 이전 일기 내용 저장(내용변화 비교용)
  const prevDiaryData = produce(defaultDiaryData, draft => draft);
  // 일기 내용을 담아 post 요청 보낼 데이터
  const [diaryData, setDiaryData] = useState(defaultDiaryData);
  // 드롭다운에 표시할 날씨 정보를 담을 state
  const [weather, setWeather] = useState(
    findWeatherName(diaryData.weatherId) || '날씨선택',
  );
  // 나중에 post 요청 시 states에 넣어서 보낼, 기록하는 파라미터와 레벨 정보를 담은 배열
  // {(parameter)id: id, level: number} 삽입
  const [selectedParamsIds, setSelectedParmasIds] = useState(
    defaultSelectedParamsIds,
  );
  // 모달창에 보낼 level이 있는 파라미터 정보
  const [paramToModal, setParamToModal] = useState(defaultModal);
  // 날씨 입력창을 열거나 닫는 state
  const [isWeatherExpanded, setIsWeatherExpanded] = useState(false);
  // 모달창을 열거나 닫는 state
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 화면에 랜더하기 위해 defaultParameter에서 status가 true인것만 뽑아내기
  const selectedParameters = parameters.reduce((newArr, param) => {
    if (param.status) {
      newArr.push(param);
    }
    return newArr;
  }, []);

  const selectPlantPhoto = () => {
    SelectPhoto('식물 사진을 고르세요', diaryData, setDiaryData);
  };

  const onChangeText = (key, text) => {
    setDiaryData({
      ...diaryData,
      [key]: text,
    });
  };

  // 파라미터 id가 선택된 파라미터 목록에 있는지 확인
  const findId = (array, id) => {
    return array.some(item => item.id === id);
  };

  // 파라미터 id가 선택된 파라미터 목록에 있는지 확인 후 해당 level 확인
  const findLevel = (array, id) => {
    const targetObj = array.filter(item => item.id === id);
    if (targetObj[0]) {
      return targetObj[0].level;
    }
    return false;
  };

  // 선택한 파라미터 목록 업데이트 함수. 레벨이 있으면 레벨 입력, 없으면 0
  const updateParamIds = (param, level = 0) => {
    const modalDismissed =
      param.type && !level && !findId(selectedParamsIds, param.id);
    const editParameterLevel = level && findId(selectedParamsIds, param.id);
    const deleteParameter = !level && findId(selectedParamsIds, param.id);

    if (modalDismissed) return;
    if (editParameterLevel) {
      const updatedIds = selectedParamsIds.map(item => ({ ...item }));
      updatedIds.forEach(item => {
        if (item.id === param.id) {
          item.level = level;
        }
        return item;
      });
      setSelectedParmasIds(updatedIds);
    } else if (deleteParameter) {
      const updatedIds = selectedParamsIds.filter(item => item.id !== param.id);
      setSelectedParmasIds(updatedIds);
    } else {
      const paramObj = { id: param.id, level };
      const updatedIds = selectedParamsIds.concat(paramObj);
      setSelectedParmasIds(updatedIds);
    }
  };

  // 레벨이 있는 타입의 경우 파라미터 데이터를 모달에 전달하기 위해 설정하고 레벨 선택 모달창을 띄움
  const onParamsButtonPress = param => {
    if (param.type) {
      setParamToModal(param);
      setIsModalVisible(!isModalVisible);
    } else {
      updateParamIds(param);
    }
  };

  // 날씨 선택 시 드롭다운에 표시되는 이름과 전송할 데이터의 날씨 id를 변경
  const selectWeatherName = (itemIndex, itemValue) => {
    setWeather(itemValue);
    if (itemIndex === 0) {
      setDiaryData({
        ...diaryData,
        weatherId: '',
      });
    } else {
      setDiaryData({
        ...diaryData,
        weatherId: itemIndex,
      });
    }
  };

  async function postOrFetchLog(isImageDeleted, plantImage, info) {
    let result = null;
    if (isEditing) {
      result = await Diary.editDiary(
        isImageDeleted,
        prevDiaryData.id,
        plantImage,
        info,
        headers,
      );
    } else {
      result = await Diary.newDiary(plantId, plantImage, info, headers);
    }
    if ((result.data && result.status === 200) || result.status === 201) {
      // 요청 성공 시 MyPlantLog에 diaryId, 날짜 전달
      const createdAt = result.data.createdAt || prevDiaryData.createdAt;
      const id = result.data.id || prevDiaryData.id;
      navigation.navigate('MyPlantLog', {
        parametersData,
        plantParameter,
        weatherData,
        diaryId: id,
        title: createdAt.slice(0, 10),
      });
    }
  }

  const noInputDataWarning = () => {
    Alert.alert('', '내용을 입력해주세요.', [{ text: '확인' }], {
      cancelable: false,
    });
  };

  const addOrEditPlantLog = () => {
    const isImageDeleted = false;
    let newImage = null;
    const resultObj = getChangedDataOnly(
      prevDiaryData,
      diaryData,
      Object.keys(diaryData),
    );
    if (resultObj.image) {
      newImage = resultObj.image;
    }

    const newSelectedParams = JSON.stringify(selectedParamsIds);
    if (newSelectedParams !== JSON.stringify(prevDiaryData.states)) {
      resultObj.states = JSON.stringify(selectedParamsIds);
    }

    if (Object.keys(resultObj).length > 0) {
      // 다이어리에서 넘어온 날짜 혹은 원래 날짜를 추가
      resultObj.createdAt = prevDiaryData.createdAt.slice(0, 10);
      postOrFetchLog(isImageDeleted, newImage, resultObj);
    } else {
      // 내용이 변한 게 없으면 이전 화면으로 이동
      isEditing ? navigation.goBack() : noInputDataWarning();
    }
  };

  const parameterGroup = produce(selectedParameters, draft => {
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.position}>
          <WeatherInputs
            isWeatherExpanded={isWeatherExpanded}
            setIsWeatherExpanded={setIsWeatherExpanded}
            diaryData={diaryData}
            onChangeText={onChangeText}
            selectWeatherName={selectWeatherName}
            weatherData={weatherData}
            weather={weather}
          />
          <SelectPlantPhoto
            selectPlantPhoto={selectPlantPhoto}
            diaryData={diaryData}
          />
        </View>
        <View style={styles.parameters}>
          <ParameterButtons
            hasLevel={hasLevel}
            noLevel={noLevel}
            // selectedParameters={selectedParameters}
            selectedParamsIds={selectedParamsIds}
            findId={findId}
            onParamsButtonPress={onParamsButtonPress}
            findLevel={findLevel}
            parameters={parameters}
            setParameters={setParameters}
          />
        </View>
        <View style={styles.position}>
          <WriteNoteInput diaryData={diaryData} onChangeText={onChangeText} />
          {isEditing ? (
            <EditPlantLogButton addOrEditPlantLog={addOrEditPlantLog} />
          ) : (
            <AddPlantLogButton addOrEditPlantLog={addOrEditPlantLog} />
          )}
          <SelectLevelModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            paramToModal={paramToModal}
            updateParamIds={updateParamIds}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPlantLogNew;
