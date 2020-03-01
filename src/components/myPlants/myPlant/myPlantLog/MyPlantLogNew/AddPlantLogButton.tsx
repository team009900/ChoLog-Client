import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../../../style';

interface AddPlantLogButtonProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 40 },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
  },
});

const AddPlantLogButton = (props: AddPlantLogButtonProps) => {
  const { addOrEditPlantLog } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        onPress={addOrEditPlantLog}>
        작성
      </Button>
    </View>
  );
};

export default AddPlantLogButton;
