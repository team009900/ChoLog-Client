import React, { useState, useContext } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Alert } from 'react-native';
// import HideWithKeyboard from 'react-native-hide-with-keyboard';
import axios from 'axios';
import {
  LoginTitle,
  LoginIdInput,
  LoginPwInput,
  LoginForgotIdPw,
  LoginSignUpButton,
  LoginButton,
  LoginOrOtherAccounts,
} from '../../components/welcome/Login';
import theme from '../../../theme';
import { AuthContext } from '../../navigations/AppNavigator';

const { height } = Dimensions.get('window');

// navigation
interface LoginProps {}

const styles = StyleSheet.create({
  contentsContainer: {
    height,
    backgroundColor: theme.colors.background,
  },
  background: { flex: 1 },
  title: { flex: 0.6 },
  inputs: { flex: 0.8, alignItems: 'center' },
  position: { flex: 1, width: '70%' },
  otherPaths: { flex: 1, alignItems: 'center' },
});

const Login = (props: LoginProps) => {
  const [userEmail, setUserEmail] = useState<string | null>('');
  const [userPw, setUserPw] = useState<string | null>('');

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const body = { email: userEmail, password: userPw };
    login(body);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentsContainer}>
      <View style={styles.title}>
        <LoginTitle />
      </View>
      <View style={styles.inputs}>
        <View style={styles.position}>
          <LoginIdInput userEmail={userEmail} setUserEmail={setUserEmail} />
          <LoginPwInput userPw={userPw} setUserPw={setUserPw} />
          <LoginButton handleLogin={handleLogin} />
        </View>
      </View>
      <View style={styles.otherPaths}>
        <View>
          {/* <LoginForgotIdPw /> */}
          <LoginSignUpButton />
        </View>
      </View>
      {/*
        <View>
          <LoginOrOtherAccounts />
        </View>
      */}
    </ScrollView>
  );
};

export default Login;
