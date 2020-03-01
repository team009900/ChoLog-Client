import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import produce from 'immer';
import { useNavigation } from '@react-navigation/native';
import { TokenContext } from '../../navigations/AppNavigator';
import { UserInfo } from '../../types/MyInfo/index';
import { SelectPhoto } from '../../util/helper';
import {
  ChangeUserInfoButton,
  CheckUsernameButton,
  UsernameInput,
  UserPhotoEdit,
} from '../../components/myInfo/MyInfoEdit';
import { User } from '../../util/api/route';
import theme from '../../../theme';

// route.params.userInfo
interface MyInfoEditProps {
  route: {
    params: {
      userInfo: UserInfo;
    };
  };
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  contentsContainer: {
    height,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  position: { flex: 1, width: '70%' },
  photo: { flex: 0.6, marginBottom: 15 },
  inputAndButtons: { flex: 1 },
});

const MyInfoEdit = (props: MyInfoEditProps) => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(props.route.params.userInfo);
  const [usernameOverlap, setUsernameOverlap] = useState<boolean>(false);
  // const [isDuplicated, setIsDuplicated] = useState(2);
  const { headers } = useContext(TokenContext);
  const prevUserInfo = produce(props.route.params.userInfo, draft => draft);

  const selectProfilePhoto = () => {
    SelectPhoto('프로필 사진을 선택하세요', userInfo, setUserInfo);
  };

  const onChangeUserName = text => {
    setUserInfo({
      ...userInfo,
      username: text,
    });
  };

  async function patchRequest(isImageDeleted, image, data) {
    const result = await User.editProfile(isImageDeleted, image, data, headers);
    if (result.status && result.status === 200) {
      navigation.goBack();
    }
  }

  const editUserInfo = () => {
    const editedInfo = {};
    const isImageDeleted = false;
    let newImage = null;

    if (prevUserInfo.image !== userInfo.image) {
      editedInfo.image = userInfo.image;
      newImage = userInfo.image;
    }
    if (prevUserInfo.username !== userInfo.username) {
      editedInfo.username = userInfo.username;
    }

    if (Object.keys(editedInfo).length > 0) {
      patchRequest(isImageDeleted, newImage, editedInfo);
    }
  };

  // const usernameCheck = {
  //   0: '중복된 닉네임입니다',
  //   1: '사용할 수 있는 닉네임입니다',
  //   2: '닉네임 중복검사를 해주세요',
  // };

  return (
    <ScrollView contentContainerStyle={styles.contentsContainer}>
      <View style={styles.position}>
        <View style={styles.photo}>
          <UserPhotoEdit
            selectProfilePhoto={selectProfilePhoto}
            userInfo={userInfo}
          />
        </View>
        <View style={styles.inputAndButtons}>
          <UsernameInput
            onChangeUserName={onChangeUserName}
            userInfo={userInfo}
            usernameOverlap={usernameOverlap}
            // isDuplicated={isDuplicated}
            // usernameCheck={usernameCheck}
          />
          {/* <CheckUsernameButton setIsDuplicated={setIsDuplicated} /> */}
          <ChangeUserInfoButton editUserInfo={editUserInfo} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyInfoEdit;
