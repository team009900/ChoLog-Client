import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// ?
interface ChangePasswordButtonProps {}

const styles = StyleSheet.create({
  container: { ...buttonStyles.buttonPosition },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
  },
});

const ChangePasswordButton = (props: ChangePasswordButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}>
        비밀번호 변경
      </Button>
    </View>
  );
};

export default ChangePasswordButton;
