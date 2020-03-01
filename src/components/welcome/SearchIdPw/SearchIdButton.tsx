import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Subheading, Divider } from 'react-native-paper';
import { buttonStyles } from '../../../style';

interface SearchIdButtonProps {}

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
  divider: {
    height: 2,
    marginTop: 30,
  },
});

const SearchIdButton = (props: SearchIdButtonProps) => {
  return (
    <View style={styles.position}>
      <Button
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained">
        아이디 찾기
      </Button>
      <Divider style={styles.divider} />
    </View>
  );
};

export default SearchIdButton;
