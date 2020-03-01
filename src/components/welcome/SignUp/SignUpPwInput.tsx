import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputStyles } from '../../../style';

// userPw, setUserPw
interface SignUpPwInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const SignUpPwInput = (props: SignUpPwInputProps) => {
  const { userPw, setUserPw, checkPw } = props;
  return (
    <View style={styles.position}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="비밀번호"
        value={userPw}
        onChangeText={text => setUserPw(text)}
        secureTextEntry={true}
      />
      {userPw && userPw.length < 8 ? (
        <HelperText type="error" visible={true}>
          8자 이상의 비밀번호를 입력해주세요(영문자, 숫자, 특수문자 포함)
        </HelperText>
      ) : null}
      {userPw.length > 7 && !checkPw.test(userPw) ? (
        <HelperText type="error" visible={true}>
          영문자, 숫자, 특수문자를 포함한 비밀번호를 입력해주세요
        </HelperText>
      ) : null}
    </View>
  );
};

export default SignUpPwInput;
