import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Surface, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../../../../theme';

// selectedParameters, selectedParamsIds, findId, onParamsButtonPress, findLevel, parameters, setParameters
interface ParameterButtonsProps {}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  surface: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    paddingLeft: 25,
    paddingRight: 20,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  button: {
    borderRadius: 30,
    marginBottom: 1,
  },
  contentStyle: {
    padding: 5,
  },
  iconsWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
  },
  icon: { margin: 0 },
});

const ParameterButtons = (props: ParameterButtonsProps) => {
  const navigation = useNavigation();
  const {
    // selectedParameters,
    selectedParamsIds,
    findId,
    onParamsButtonPress,
    findLevel,
    hasLevel,
    noLevel,
    parameters,
    setParameters,
  } = props;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.surface}>
          {hasLevel.map(param => (
            <View key={param.id} style={styles.buttonWrapper}>
              <Button
                mode="contained"
                style={styles.button}
                contentStyle={styles.contentStyle}
                color={
                  findId(selectedParamsIds, param.id)
                    ? param.color
                    : theme.colors.subDivider
                }
                onPress={() => onParamsButtonPress(param)}>
                {param.parameterName}
              </Button>
              <View style={styles.iconsWrapper}>
                <IconButton
                  style={styles.icon}
                  icon="circle"
                  size={15}
                  color={
                    !(findLevel(selectedParamsIds, param.id) >= 1)
                      ? theme.colors.subDivider
                      : param.color
                  }
                />
                <IconButton
                  style={styles.icon}
                  icon="circle"
                  size={15}
                  color={
                    !(findLevel(selectedParamsIds, param.id) >= 2)
                      ? theme.colors.subDivider
                      : param.color
                  }
                />
                <IconButton
                  style={styles.icon}
                  icon="circle"
                  size={15}
                  color={
                    !(findLevel(selectedParamsIds, param.id) >= 3)
                      ? theme.colors.subDivider
                      : param.color
                  }
                />
              </View>
            </View>
          ))}
          {noLevel.map(param => (
            <View key={param.id} style={styles.buttonWrapper}>
              <Button
                mode="contained"
                style={styles.button}
                contentStyle={styles.contentStyle}
                color={
                  findId(selectedParamsIds, param.id)
                    ? param.color
                    : theme.colors.subDivider
                }
                onPress={() => onParamsButtonPress(param)}>
                {param.parameterName}
              </Button>
            </View>
          ))}
          {/* <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('SelectParameters', {
                parameters,
                setParameters,
              })
            }>
            수정
          </Button> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ParameterButtons;
