import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

interface SearchPlantButtonProps {}

const styles = StyleSheet.create({
  container: { flex: 1.5 },
  contentStyle: { padding: 6 },
  lableStyle: {
    ...buttonStyles.lableStyle,
  },
});

const SearchPlantButton = (props: SearchPlantButtonProps) => {
  const { onPressSearch } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        onPress={onPressSearch}>
        검색
      </Button>
    </View>
  );
};

export default SearchPlantButton;
