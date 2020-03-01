import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { inputStyles } from '../../../style';

// userId, setUserId
interface SearchPwIdInputProps {}

const styles = StyleSheet.create({
  position: { ...inputStyles.authInputPosition },
});

const SearchPwIdInput = (props: SearchPwIdInputProps) => {
  const { userId, setUserId } = props;
  return (
    <View style={styles.position}>
      <TextInput
        mode="outlined"
        label="아이디"
        value={userId}
        onChangeText={text => setUserId(text)}
      />
    </View>
  );
};

export default SearchPwIdInput;
