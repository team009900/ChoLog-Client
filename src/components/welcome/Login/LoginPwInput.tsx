import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { inputStyles } from '../../../style';

// userPw, setUserPw(함수)
interface LoginPwInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const LoginPwInput = (props: LoginPwInputProps) => {
  const { userPw, setUserPw } = props;
  return (
    <View style={styles.position}>
      <TextInput
        mode="outlined"
        label="비밀번호"
        value={userPw}
        onChangeText={text => setUserPw(text)}
        secureTextEntry={true}
      />
    </View>
  );
};

export default LoginPwInput;
