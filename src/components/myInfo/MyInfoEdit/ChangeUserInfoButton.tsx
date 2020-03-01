import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// userInfo
interface ChangeUserInfoButtonProps {}

const styles = StyleSheet.create({
  container: {},
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
  },
});

const ChangeUserInfoButton = (props: ChangeUserInfoButtonProps) => {
  const { editUserInfo } = props;

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}
        onPress={editUserInfo}>
        변경
      </Button>
    </View>
  );
};

export default ChangeUserInfoButton;
