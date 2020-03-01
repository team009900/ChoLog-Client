import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../../style';

// date, plantId, parametersData, plantParameter
interface GoToMyPlantLogNewButtonProps {}

const styles = StyleSheet.create({
  container: { elevation: 10, backgroundColor: 'white', borderRadius: 50 },
  button: {
    borderRadius: 50,
  },
  contentsStyle: {
    padding: 10,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
    fontWeight: '700',
  },
});

const GoToMyPlantLogNewButton = (props: GoToMyPlantLogNewButtonProps) => {
  const navigation = useNavigation();
  const { date, plantId, parametersData, plantParameter, weatherData } = props;

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        contentStyle={styles.contentsStyle}
        labelStyle={styles.labelStyle}
        icon="plus"
        onPress={() =>
          navigation.navigate('MyPlantLogNew', {
            date,
            plantId,
            parametersData,
            plantParameter,
            weatherData,
            title: `${date} 기록하기`,
          })
        }>
        {date.slice(-5)} 기록하기
      </Button>
    </View>
  );
};

export default GoToMyPlantLogNewButton;
