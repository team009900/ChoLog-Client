import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

// diaryData
interface MyPlantImageProps {}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  emptyContainer: { marginBottom: 0 },
  image: {
    width,
    height: width,
  },
});

const MyPlantImage = (props: MyPlantImageProps) => {
  const { diaryData } = props;

  return (
    <View style={styles.container}>
      {diaryData.image ? (
        <Image style={styles.image} source={{ uri: diaryData.image }} />
      ) : (
        <View style={styles.emptyContainer} />
      )}
    </View>
  );
};

export default MyPlantImage;
