import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Paragraph } from 'react-native-paper';

// selectProfilePhoto(함수), userInfo
interface UserPhotoEditProps {}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  image: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
});

const UserPhotoEdit = (props: UserPhotoEditProps) => {
  const { selectProfilePhoto, userInfo } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectProfilePhoto}>
        {userInfo.image.uri ? (
          <Image style={styles.image} source={{ uri: userInfo.image.uri }} />
        ) : (
          <Image style={styles.image} source={{ uri: userInfo.image }} />
        )}
      </TouchableOpacity>
      <Paragraph style={styles.text}>사진을 눌러 변경하세요</Paragraph>
    </View>
  );
};

export default UserPhotoEdit;
