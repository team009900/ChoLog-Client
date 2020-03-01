import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// handleSignUp
interface SignUpButtonProps {}

const styles = StyleSheet.create({
  position: { ...buttonStyles.authButtonPosition },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.authLableStyle,
  },
});

const SignUpButton = (props: SignUpButtonProps) => {
  const { handleSignUp } = props;
  return (
    <View style={styles.position}>
      <Button
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained"
        onPress={handleSignUp}>
        가입하기
      </Button>
    </View>
  );
};

export default SignUpButton;
