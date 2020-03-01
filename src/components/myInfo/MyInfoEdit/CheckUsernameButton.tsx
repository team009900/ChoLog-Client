import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';
import theme from '../../../../theme';

// setIsDuplicated(함수)
interface CheckUsernameButtonProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 30 },
  contentStyle: {
    ...buttonStyles.contentStyle,
    backgroundColor: theme.colors.accent,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
    fontSize: 13.5,
  },
});

const CheckUsernameButton = (props: CheckUsernameButtonProps) => {
  const { setIsDuplicated } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}
        onPress={() => setIsDuplicated(0)}>
        닉네임 중복검사
      </Button>
    </View>
  );
};

export default CheckUsernameButton;
