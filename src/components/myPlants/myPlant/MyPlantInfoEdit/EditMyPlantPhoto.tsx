import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Subheading, Surface, IconButton } from 'react-native-paper';
import { PlantInfo } from '../../../../types/MyPlantInfo';
import theme from '../../../../../theme';

// plantInfo, selectPlantPhoto(함수)
interface EditMyPlantPhotoProps {
  plantInfo: PlantInfo;
}

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

const EditMyPlantPhoto = (props: EditMyPlantPhotoProps) => {
  const { plantInfo, selectPlantPhoto } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={selectPlantPhoto}>
        {plantInfo.image ? (
          <Image
            style={styles.image}
            source={
              typeof plantInfo.image === 'object'
                ? { uri: plantInfo.image.uri }
                : { uri: plantInfo.image }
            }
          />
        ) : (
          <Surface style={styles.surface}>
            <IconButton icon="plus" size={80} color={theme.colors.divider} />
          </Surface>
        )}
      </TouchableOpacity>
      <Subheading>사진을 눌러 변경</Subheading>
    </View>
  );
};

export default EditMyPlantPhoto;
