import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Subheading } from 'react-native-paper';
import theme from '../../../../../../theme';

// id, isVisible, setIsVisible, nickname
interface WarningModalProps {}

const styles = StyleSheet.create({
  warninglabelStyle: {
    color: theme.colors.error,
  },
});

const WarningModal = (props: WarningModalProps) => {
  const { isVisible, setIsVisible, deleteDiary } = props;

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>기록 삭제</Dialog.Title>
          <Dialog.Content>
            <Subheading>기록을 삭제하시겠습니까?</Subheading>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsVisible(false)}>취소</Button>
            <Button labelStyle={styles.warninglabelStyle} onPress={deleteDiary}>
              삭제
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WarningModal;
