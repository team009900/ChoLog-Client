import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Portal, Dialog, Subheading } from 'react-native-paper';

// showDetailData, setShowDetailData(함수), selectedPlant, changeInputValueToData(함수)
interface PlantDataDetailModalProps {}

const styles = StyleSheet.create({
  container: {},
  dialog: { height: '80%' },
  scrollView: { paddingHorizontal: 20 },
});

const PlantDataDetailModal = (props: PlantDataDetailModalProps) => {
  const {
    showDetailData,
    setShowDetailData,
    selectedPlant,
    changeInputValueToData,
  } = props;

  // goBack 되기 이전에 모달창이 먼저 사라져야함
  return (
    <Portal style={styles.container}>
      <Portal>
        {selectedPlant ? (
          <Dialog
            style={styles.dialog}
            visible={showDetailData}
            onDismiss={() => setShowDetailData(false)}>
            <Dialog.Title>{selectedPlant.distributionName}</Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <Subheading>{selectedPlant.advice}</Subheading>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={() => setShowDetailData(false)}>취소</Button>
              <Button onPress={changeInputValueToData}>정보 반영하기</Button>
            </Dialog.Actions>
          </Dialog>
        ) : null}
      </Portal>
    </Portal>
  );
};

export default PlantDataDetailModal;
