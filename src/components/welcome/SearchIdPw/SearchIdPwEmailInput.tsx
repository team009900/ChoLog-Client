import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { inputStyles } from '../../../style';

// userEmail, setUserEmail
interface SearchIdPwEmailInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const SearchIdPwEmailInput = (props: SearchIdPwEmailInputProps) => {
  const { userEmail, setUserEmail } = props;
  return (
    <View style={styles.position}>
      <TextInput
        mode="outlined"
        label="이메일"
        value={userEmail}
        onChangeText={text => setUserEmail(text)}
      />
    </View>
  );
};

export default SearchIdPwEmailInput;
