import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import {
  SignUpTitle,
  SignUpEmailInput,
  SignUpIdInput,
  SignUpPwInput,
  SignUpPwCheckInput,
  SignUpButton,
  SignUpOrOtherAccounts,
} from '../../components/welcome/SignUp';
import theme from '../../../theme';
import { Auth } from '../../util/api/route';
import { AuthContext } from '../../navigations/AppNavigator';

const { height, width } = Dimensions.get('window');

// navigation
interface SignUpProps {}

const styles = StyleSheet.create({
  contentsContainer: { height, backgroundColor: theme.colors.background },
  title: { flex: 0.6 },
  inputs: { flex: 2, alignItems: 'center' },
  position: { flex: 1, width: '70%' },
});

const checkEmail = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
const checkIdDuplication = Auth.checkIdDuplication;
const checkPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,50}$/;

const SignUp = (props: SignUpProps) => {

  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [userPwCheck, setUserPwCheck] = useState<string>('');
  const [userIdOverlap, setUserIdOverlap] = useState<boolean>(false);

  const { signUp } = useContext(AuthContext);

  const handleSignUp = async () => {
    // input된 data로 axios 요청(회원가입 요청)후 로그인까지 진행.
    if (
      checkEmail.test(userEmail) &&
      !userIdOverlap &&
      checkPw.test(userPw) &&
      userPw === userPwCheck
    ) {
      const body = await {
        username: userId,
        email: userEmail,
        password: userPw,
      };
      const loginBody = await {
        email: userEmail,
        password: userPw,
      };
      signUp(body, loginBody);
    } else {
      Alert.alert(
        '입력된 정보를 다시 확인해주세요',
        '가입에 필요한 정보를 모두 입력해주세요',
        [{ text: '확인', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentsContainer}>
      <View style={styles.title}>
        <SignUpTitle />
      </View>
      <View style={styles.inputs}>
        <View style={styles.position}>
          <SignUpEmailInput
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            checkEmail={checkEmail}
          />
          <SignUpIdInput
            userId={userId}
            setUserId={setUserId}
            checkIdDuplication={checkIdDuplication}
            userIdOverlap={userIdOverlap}
            setUserIdOverlap={setUserIdOverlap}
          />
          <SignUpPwInput
            userPw={userPw}
            setUserPw={setUserPw}
            checkPw={checkPw}
          />
          <SignUpPwCheckInput
            userPw={userPw}
            userPwCheck={userPwCheck}
            setUserPwCheck={setUserPwCheck}
          />
          <SignUpButton handleSignUp={handleSignUp} />
        </View>
      </View>
      {/* <View>
        <SignUpOrOtherAccounts />
      </View> */}
    </ScrollView>
  );
};

export default SignUp;
