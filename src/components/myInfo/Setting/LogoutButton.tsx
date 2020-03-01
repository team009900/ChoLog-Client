import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// 로그인 관련된 prop
interface LogoutButtonProps {}

const styles = StyleSheet.create({
  container: { ...buttonStyles.buttonPosition },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
  },
});

const LogoutButton = (props: LogoutButtonProps) => {
  const { handleLogout } = props;

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}
        onPress={handleLogout}>
        로그아웃
      </Button>
    </View>
  );
};

export default LogoutButton;
