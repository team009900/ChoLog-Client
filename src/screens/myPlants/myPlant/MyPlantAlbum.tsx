import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MyPlantAlbumProps {}

const MyPlantAlbum = (props: MyPlantAlbumProps) => {
  return (
    <View style={styles.container}>
      <Text>MyPlantAlbum</Text>
    </View>
  );
};

export default MyPlantAlbum;

const styles = StyleSheet.create({
  container: {}
});
