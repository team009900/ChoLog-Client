import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PlantInfo } from '../../../../types/MyPlantInfo';
import { buttonStyles } from '../../../../style';

// plantInfo, setPlantInfo(함수)
interface GoToSearchPlantDataButtonProps {
  plantInfo: PlantInfo;
}

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
  },
});

const GoToSearchPlantDataButton = (props: GoToSearchPlantDataButtonProps) => {
  const navigation = useNavigation();
  const { plantInfo, setPlantInfo } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        icon="magnify"
        onPress={() =>
          navigation.navigate('SearchPlantData', { plantInfo, setPlantInfo })
        }>
        식물 이름으로 정보 검색
      </Button>
    </View>
  );
};

export default GoToSearchPlantDataButton;
