import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PlantInfo } from '../../../../types/MyPlantInfo';
import { buttonStyles } from '../../../../style';

// fromAddPlant(addplant에서만 전달된다)
// parameters(파라미터 정보를 담은 객체) -> 없을 수도 있음
interface EditMyPlantInfoButtonProps {
  plantInfo: PlantInfo;
}

const styles = StyleSheet.create({
  button: { marginTop: 15 },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
    fontSize: 17,
  },
});

const EditMyPlantInfoButton = (props: EditMyPlantInfoButtonProps) => {
  const { fromAddPlant, addNewPlant, editPlantInfo } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={fromAddPlant ? null : styles.button}
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        onPress={fromAddPlant ? addNewPlant : editPlantInfo}>
        {fromAddPlant ? '식물 등록' : '정보 수정'}
      </Button>
    </View>
  );
};

export default EditMyPlantInfoButton;
