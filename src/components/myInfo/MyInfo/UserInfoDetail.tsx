import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Subheading, Title } from 'react-native-paper';
import { UserInfo } from '../../../types/MyInfo/index';

// userInfo
interface UserInfoDetailProps {
  userInfo: UserInfo;
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  image: { width: 140, height: 140, borderRadius: 70, marginBottom: 10 },
  text: { marginBottom: 4 },
});

const UserInfoDetail = (props: UserInfoDetailProps) => {
  const { image, username, email } = props.userInfo;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Title style={styles.text}>{username}</Title>
      <Subheading>{email}</Subheading>
    </View>
  );
};

export default UserInfoDetail;
