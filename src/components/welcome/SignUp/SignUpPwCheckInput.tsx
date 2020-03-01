import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputStyles } from '../../../style';

// userPw, userPwCheck, setUserPwCheck
interface SignUpPwCheckInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const SignUpPwCheckInput = (props: SignUpPwCheckInputProps) => {
  const { userPw, userPwCheck, setUserPwCheck } = props;
  return (
    <View style={styles.position}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="비밀번호 확인"
        value={userPwCheck}
        onChangeText={text => setUserPwCheck(text)}
        secureTextEntry={true}
      />
      {userPw && userPwCheck && userPw !== userPwCheck ? (
        <HelperText type="error" visible={true}>
          입력한 비밀번호와 다릅니다
        </HelperText>
      ) : null}
    </View>
  );
};

export default SignUpPwCheckInput;
