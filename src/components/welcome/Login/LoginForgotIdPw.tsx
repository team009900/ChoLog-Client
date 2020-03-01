import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Subheading, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface LoginForgotIdPwProps {}

const styles = StyleSheet.create({
  position: { marginBottom: 15 },
});

const LoginForgotIdPw = (props: LoginForgotIdPwProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.position}>
      <Paragraph>아이디 / 비밀번호가 기억나지 않으세요?</Paragraph>
      <Button mode="text" onPress={() => navigation.navigate('SearchIdPw')}>
        아이디 / 비밀번호 찾기
      </Button>
    </View>
  );
};

export default LoginForgotIdPw;
