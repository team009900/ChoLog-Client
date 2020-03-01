import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// handleLogin(함수)
interface LoginButtonProps {}

const styles = StyleSheet.create({
  position: {
    ...buttonStyles.authButtonPosition,
  },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.authLableStyle,
  },
});

const LoginButton = (props: LoginButtonProps) => {
  const { handleLogin } = props;
  return (
    <View style={styles.position}>
      <Button
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained"
        onPress={handleLogin}>
        로그인
      </Button>
    </View>
  );
};

export default LoginButton;
