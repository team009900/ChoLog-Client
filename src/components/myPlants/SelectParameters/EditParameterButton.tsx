import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// previous, isChanged, editAddPlantParams
interface EditParameterButtonProps {}

const styles = StyleSheet.create({
  // container: { flex: 1, alignItems: 'center' },
  container: { elevation: 5, backgroundColor: 'white', borderRadius: 50 },
  button: {
    borderRadius: 50,
  },
  contentStyle: {
    padding: 8,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
    fontSize: 16,
  },
});

const EditParameterButton = (props: EditParameterButtonProps) => {
  const { previous, isChanged, editAddPlantParams, editPlantParams } = props;
  return (
    <View style={styles.container}>
      {previous ? (
        <Button
          disabled={isChanged}
          style={styles.button}
          contentStyle={styles.contentStyle}
          labelStyle={styles.lableStyle}
          mode="contained"
          icon="star"
          onPress={editAddPlantParams}>
          선택
        </Button>
      ) : (
        <Button
          disabled={isChanged}
          style={styles.button}
          contentStyle={styles.contentStyle}
          labelStyle={styles.lableStyle}
          onPress={editPlantParams}
          mode="contained"
          icon="star">
          변경
        </Button>
      )}
    </View>
  );
};

export default EditParameterButton;
