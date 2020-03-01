import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Subheading } from 'react-native-paper';
import theme from '../../../../../theme';

// id, isVisible, setIsVisible, nickname
interface WarningModalProps {}

const styles = StyleSheet.create({
  warninglabelStyle: {
    color: theme.colors.error,
  },
});

const WarningModal = (props: WarningModalProps) => {
  const { isVisible, setIsVisible, nickname, deletePlant } = props;

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>식물 삭제</Dialog.Title>
          <Dialog.Content>
            <Subheading>
              {nickname}을 삭제하시겠습니까? 모든 정보는 지워지며, 복구할 수
              없습니다.
            </Subheading>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsVisible(false)}>취소</Button>
            <Button labelStyle={styles.warninglabelStyle} onPress={deletePlant}>
              삭제
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WarningModal;
