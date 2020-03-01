import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// diaryData, parametersData, diaryPlantParameter
interface GoToMyPlantLogEditButtonProps {}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'flex-end' },
  lableStyle: {
    fontWeight: '700',
  },
});

const GoToMyPlantLogEditButton = (props: GoToMyPlantLogEditButtonProps) => {
  const navigation = useNavigation();
  const { diaryData, parametersData, plantParameter, weatherData } = props;

  return (
    <View style={styles.container}>
      <Button
        mode="text"
        style={styles.button}
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        onPress={() =>
          navigation.navigate('MyPlantLogNew', {
            diaryData,
            parametersData,
            plantParameter,
            weatherData,
            title: '기록 수정',
            plantId: diaryData.plant.id,
            isEditing: 1,
          })
        }>
        기록수정
      </Button>
    </View>
  );
};

export default GoToMyPlantLogEditButton;
