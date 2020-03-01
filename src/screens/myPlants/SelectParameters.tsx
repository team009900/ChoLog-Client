import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import produce from 'immer';
import {
  Heading,
  LevelParameterList,
  NoLevelParameterList,
  EditParameterButton,
} from '../../components/myPlants/SelectParameters';
import { TokenContext } from '../../navigations/AppNavigator';
import { Parameters } from '../../util/api/route';
import theme from '../../../theme';

// parameters(파라미터 전 종류와 선택 유무를 담은 배열), setParameters(함수) || null
// previous(addPlant에서 넘어옴. 이전 스크린명) || null <- 새로운 식물 입력인 경우, plantId || null <- 정보수정인 경우
// AddPlant, MyPlantInfoEdit에 넘어옴
interface SelectParametersProps {}

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
    marginBottom: 90,
    width: '97%',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    padding: 5,
    borderRadius: 50,
  },
});

const SelectParameters = (props: SelectParametersProps) => {
  const { headers } = useContext(TokenContext);
  const { navigation } = props;
  const { parameters } = props.route.params;
  const setParameters = props.route.params.setParameters || null;
  const previous = props.route.params.previous || null;
  const plantId = props.route.params.plantId || null;
  const switchColor = theme.colors.primary;

  // parameter id와 스위치의 status만을 담은 객체 생성
  const parameterStates = produce(parameters, draft => {
    return draft.reduce((stateObj, param) => {
      stateObj[param.id] = param.status;
      return stateObj;
    }, {});
  });

  // map으로 랜더할 두 개의 그룹(레벨유무)을 객체 내부 배열에 저장
  const parameterGroup = produce(parameters, draft => {
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

  const switchOn = key => {
    setIsSwitched({
      ...isSwitched,
      [key]: !isSwitched[key],
    });
  };

  // isSwitched = {0 : false, 1: true, ...}
  const editAddPlantParams = () => {
    const updatedArr = produce(parameters, draft => {
      draft.forEach(param => {
        param.status = isSwitched[param.id];
      });
    });
    setParameters(updatedArr);
    navigation.goBack();
  };

  // 나중에 MyPlantInfo에서 속성 바꾼 후 isSwitched 기반으로 api 요청 보냄
  const [isSwitched, setIsSwitched] = useState(parameterStates);
  const [isChanged, setIsChanged] = useState(false);

  // 값 변화가 있을때만 수정 API요청 버튼이 활성화(disable을 false로 변경)
  useEffect(() => {
    let changed = true;
    const originalValue = JSON.stringify(parameterStates);
    const changedValue = JSON.stringify(isSwitched);
    if (originalValue !== changedValue) {
      changed = false;
    }
    setIsChanged(changed);
  }, [isSwitched, parameterStates]);

  async function postParameters(array) {
    const result = await Parameters.setPlantParameters(plantId, array, headers);
    if (result.data && result.status === 201) {
      navigation.goBack();
    }
  }

  const editPlantParams = () => {
    const selectedParams = [];
    Object.keys(isSwitched).forEach(key => {
      if (isSwitched[key] === true) {
        selectedParams.push(key);
      }
    });
    postParameters(selectedParams);
  };

  const { hasLevel, noLevel } = parameterGroup;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.position}>
          <Heading />
          <LevelParameterList
            hasLevel={hasLevel}
            isSwitched={isSwitched}
            switchOn={switchOn}
            switchColor={switchColor}
          />
          <NoLevelParameterList
            noLevel={noLevel}
            isSwitched={isSwitched}
            switchOn={switchOn}
            switchColor={switchColor}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <EditParameterButton
          editPlantParams={editPlantParams}
          editAddPlantParams={editAddPlantParams}
          previous={previous}
          isChanged={isChanged}
        />
      </View>
    </View>
  );
};

export default SelectParameters;
