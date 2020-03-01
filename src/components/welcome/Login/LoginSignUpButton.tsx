import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface LoginSignUpButtonProps {}

const styles = StyleSheet.create({
  position: { flex: 1, flexDirection: 'row' },
  text: { marginRight: 8 },
  signUpText: { color: '#87CEEB', fontWeight: '700' },
});

const LoginSignUpButton = (props: LoginSignUpButtonProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.position}>
      <Paragraph style={styles.text}>아직 가입하지 않으셨나요?</Paragraph>
      <Paragraph
        style={styles.signUpText}
        onPress={() => navigation.navigate('SignUp')}>
        가입하기
      </Paragraph>
    </View>
  );
};

export default LoginSignUpButton;
