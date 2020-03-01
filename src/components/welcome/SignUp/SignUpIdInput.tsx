import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputStyles } from '../../../style';

// setUserId(함수), userId
interface SignUpIdInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const SignUpIdInput = (props: SignUpIdInputProps) => {
  const {
    userId,
    setUserId,
    checkIdDuplication,
    userIdOverlap,
    setUserIdOverlap,
  } = props;
  return (
    <View style={styles.position}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="닉네임"
        value={userId}
        onChangeText={text => {
          setUserId(text);
          text &&
            checkIdDuplication(text).then(status => {
              status === 200 ? setUserIdOverlap(false) : setUserIdOverlap(true);
            });
        }}
      />
      {userIdOverlap ? (
        <HelperText type="error" visible={true}>
          이미 사용중인 닉네임 입니다.
        </HelperText>
      ) : null}
      {userId && userId.length < 2 ? (
        <HelperText type="error" visible={true}>
          닉네임을 2글자 이상 입력해주세요.
        </HelperText>
      ) : null}
    </View>
  );
};

export default SignUpIdInput;
