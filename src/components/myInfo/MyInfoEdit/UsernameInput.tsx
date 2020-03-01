import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

// userInfo, onChangeUserName(함수), isDuplicated, usernameCheck
interface UsernameInputProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  input: { marginBottom: 3 },
});

const UsernameInput = (props: UsernameInputProps) => {
  const { userInfo, onChangeUserName } = props; // isDuplicated, usernameCheck
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="닉네임"
        value={userInfo.username}
        onChangeText={text => onChangeUserName(text)}
      />
      {/* <HelperText type={!isDuplicated ? 'error' : 'info'}>
        {usernameCheck[isDuplicated]}
      </HelperText> */}
    </View>
  );
};

export default UsernameInput;
