import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../../../../../theme';

interface DeleteLogButtonProps {}

const styles = StyleSheet.create({
  container: { alignItems: 'flex-end' },
  lableStyle: {
    color: theme.colors.error,
  },
});

const DeleteLogButton = (props: DeleteLogButtonProps) => {
  const { setIsVisible } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="text"
        style={styles.button}
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        onPress={() => setIsVisible(true)}>
        기록삭제
      </Button>
    </View>
  );
};

export default DeleteLogButton;
