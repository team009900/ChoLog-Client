import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Subheading } from 'react-native-paper';
import { buttonStyles } from '../../../style';
import theme from '../../../../theme';

// isVisible, setIsVisible(함수)
interface DeleteAccountButtonProps {}

const styles = StyleSheet.create({
  container: {},
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
    color: theme.colors.error,
  },
});

const DeleteAccountButton = (props: DeleteAccountButtonProps) => {
  const { isVisible, setIsVisible } = props;
  return (
    <View style={styles.container}>
      <Button
        mode="text"
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}
        onPress={() => setIsVisible(true)}>
        회원탈퇴
      </Button>
      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>회원탈퇴</Dialog.Title>
          <Dialog.Content>
            <Subheading>
              탈퇴하시겠습니까? 기록한 모든 정보는 삭제되며, 되돌릴 수 없습니다.
            </Subheading>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsVisible(false)}>취소</Button>
            <Button onPress={() => setIsVisible(false)}>회원탈퇴</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DeleteAccountButton;
