import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../../theme';

interface LoadingScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const LoadingScreen = (props: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
};

export default LoadingScreen;
