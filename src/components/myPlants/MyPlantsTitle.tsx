import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';
import theme from '../../../theme';

interface MyPlantsTitleProps {}

const styles = StyleSheet.create({
  position: { marginLeft: 9, marginBottom: 20 },
  text: { fontWeight: '700', color: theme.colors.primary },
});

const MyPlantsTitle = (props: MyPlantsTitleProps) => {
  return (
    <View style={styles.position}>
      <Headline style={styles.text}>내 식물들</Headline>
    </View>
  );
};

export default MyPlantsTitle;
