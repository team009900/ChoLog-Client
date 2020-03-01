import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MyPlantAlbumImageProps {}

const MyPlantAlbumImage = (props: MyPlantAlbumImageProps) => {
  return (
    <View style={styles.container}>
      <Text>MyPlantAlbumImage</Text>
    </View>
  );
};

export default MyPlantAlbumImage;

const styles = StyleSheet.create({
  container: {}
});
