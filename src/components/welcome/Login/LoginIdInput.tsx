import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { inputStyles } from '../../../style';

// userId, setUserId(함수)
interface LoginIdInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const LoginIdInput = (props: LoginIdInputProps) => {
  const { userEmail, setUserEmail } = props;
  return (
    <View style={styles.position}>
      <TextInput
        value={userEmail}
        mode="outlined"
        label="이메일"
        onChangeText={text => setUserEmail(text)}
      />
    </View>
  );
};

export default LoginIdInput;
