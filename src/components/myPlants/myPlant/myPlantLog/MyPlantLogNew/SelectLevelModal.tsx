import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { buttonStyles } from '../../../../../style';

// isModalVisible, setIsModalVisible, paramToModal, updateParamIds
interface SelectLevelModalProps {}

const styles = StyleSheet.create({
  container: {},
  title: { padding: 0 },
  contentStyle: { ...buttonStyles.contentStyle },
  labelStyle: { ...buttonStyles.lableStyle, fontSize: 18 },
  cancleLabelStyle: { fontSize: 18 },
});

const SelectLevelModal = (props: SelectLevelModalProps) => {
  const {
    isModalVisible,
    setIsModalVisible,
    paramToModal,
    updateParamIds,
  } = props;
  return (
    <View style={styles.container}>
      <Portal>
        <Dialog
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(!isModalVisible)}>
          <Dialog.Title style={styles.title}>{paramToModal.title}</Dialog.Title>
          <Dialog.Content>
            {paramToModal.description.split(', ').map((word, index) => (
              <Button
                key={index}
                contentStyle={styles.contentStyle}
                labelStyle={styles.labelStyle}
                onPress={() => {
                  updateParamIds(paramToModal, index + 1);
                  setIsModalVisible(!isModalVisible);
                }}>
                {word}
              </Button>
            ))}
            <Button
              contentStyle={styles.contentStyle}
              labelStyle={styles.cancleLabelStyle}
              onPress={() => {
                updateParamIds(paramToModal);
                setIsModalVisible(!isModalVisible);
              }}>
              선택취소
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SelectLevelModal;
