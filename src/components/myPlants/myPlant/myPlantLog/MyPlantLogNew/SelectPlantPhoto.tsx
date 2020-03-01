import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Subheading, Surface, IconButton } from 'react-native-paper';
import theme from '../../../../../../theme';

// selectPlantPhoto, diaryData
interface SelectPlantPhotoProps {}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginBottom: 20 },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: width * 0.85,
    marginBottom: 6,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  surface: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: theme.colors.lightPrimary,
  },
});

const SelectPlantPhoto = (props: SelectPlantPhotoProps) => {
  const { selectPlantPhoto, diaryData } = props;

  console.log('이미지', diaryData.image);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={selectPlantPhoto}>
        {diaryData.image ? (
          <Image
            style={styles.image}
            source={
              typeof diaryData.image === 'object'
                ? { uri: diaryData.image.uri }
                : { uri: diaryData.image }
            }
          />
        ) : (
          <Surface style={styles.surface}>
            <IconButton icon="plus" size={75} color={theme.colors.divider} />
          </Surface>
        )}
      </TouchableOpacity>
      <Subheading>사진을 눌러 변경</Subheading>
    </View>
  );
};

export default SelectPlantPhoto;
