import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

interface SearchPwButtonProps {}

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

const SearchPwButton = (props: SearchPwButtonProps) => {
  return (
    <View style={styles.position}>
      <Button
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained">
        비밀번호 찾기
      </Button>
    </View>
  );
};

export default SearchPwButton;
