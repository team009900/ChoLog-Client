import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputStyles } from '../../../style';

// setUserEmail(함수), userEmail
interface SignUpEmailInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const SignUpEmailInput = (props: SignUpEmailInputProps) => {
  const { userEmail, setUserEmail, checkEmail } = props;
  return (
    <View style={styles.position}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="이메일"
        value={userEmail}
        onChangeText={text => setUserEmail(text)}
      />
      {userEmail && userEmail.length > 5 && !checkEmail.test(userEmail) ? (
        <HelperText type="error" visible={true}>
          올바른 이메일 주소를 입력해주세요.
        </HelperText>
      ) : null}
    </View>
  );
};

export default SignUpEmailInput;
