import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  UserInfoDetail,
  GoToMyInfoEditButton,
  GoToSettingButton,
} from '../../components/myInfo/MyInfo';
import theme from '../../../theme';
import { User } from '../../util/api/route';
import { TokenContext } from '../../navigations/AppNavigator';

// userId
interface MyInfoProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  position: {
    flex: 1,
    justifyContent: 'center',
    width: '60%',
  },
  userInfo: { flex: 1, marginBottom: 15 },
  buttons: { flex: 1 },
});

const MyInfo = (props: MyInfoProps) => {
  const { navigation } = props;
  const [userInfo, setUserInfo] = useState({});
  const { headers, userId } = useContext(TokenContext);

  const defaltUserImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogUserDefaultImage.jpg';

  // 에러처리 아직임
  useEffect(() => {
    const getData = navigation.addListener('focus', async () => {
      const response = await User.getProfile(userId, headers);
      if (response.data && response.status === 200) {
        if (response.data.image === null) {
          response.data.image = defaltUserImage;
        }
        setUserInfo(response.data);
      }
    });
    return getData;
  }, [headers, navigation, userId]);

  return (
    <View style={styles.container}>
      <View style={styles.position}>
        <View style={styles.userInfo}>
          <UserInfoDetail userInfo={userInfo} />
        </View>
        <View style={styles.buttons}>
          <GoToMyInfoEditButton userInfo={userInfo} />
          <GoToSettingButton />
        </View>
      </View>
    </View>
  );
};

export default MyInfo;
