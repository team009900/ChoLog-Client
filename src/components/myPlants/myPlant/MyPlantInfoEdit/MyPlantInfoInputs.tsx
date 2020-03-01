import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Surface,
  Subheading,
  IconButton,
  Button,
  HelperText,
  Divider,
} from 'react-native-paper';
import { PlantInfo } from '../../../../types/MyPlantInfo';
import theme from '../../../../../theme';

// plantInfo, onChangeText(함수)
interface MyPlantInfoInputsProps {
  plantInfo: PlantInfo;
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 5 },
  input: { marginBottom: 16 },
  withHelperInput: { marginBottom: 10 },
  helperTextWrapper: { flex: 1, alignItems: 'flex-end' },
  helperText: {
    flex: 1,
    color: theme.colors.primary,
    padding: 0,
    marginBottom: 2,
  },
  advice: {
    padding: 13,
    marginBottom: 14,
    backgroundColor: theme.colors.lightPrimary,
  },
  adviceTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  iconButton: { margin: 0 },
});

const MyPlantInfoInputs = (props: MyPlantInfoInputsProps) => {
  const { onChangeText, plantInfo } = props;

  return (
    <View style={styles.container}>
      <View style={styles.helperTextWrapper}>
        <HelperText
          style={[styles.helperText, { color: theme.colors.error }]}
          visible={true}>
          * 필수 입력 항목
        </HelperText>
      </View>
      <TextInput
        label="식물 종류"
        style={styles.input}
        value={plantInfo.plantName}
        onChangeText={text => onChangeText('plantName', text)}
      />
      <TextInput
        label="내가 부르는 이름"
        style={styles.input}
        value={plantInfo.nickname}
        onChangeText={text => onChangeText('nickname', text)}
      />
      <TextInput
        label="데려온 날"
        style={[styles.input, { marginBottom: 22 }]}
        value={plantInfo.adoptionDate}
        onChangeText={text => onChangeText('adoptionDate', text)}
        keyboardType={'numeric'}
        maxLength={10}
        placeholder="2000-01-01 형식으로 입력"
      />
      <View style={styles.helperTextWrapper}>
        <HelperText style={styles.helperText} visible={true}>
          * 선택 입력 항목
        </HelperText>
      </View>
      <TextInput
        label="학명"
        style={styles.input}
        value={plantInfo.scientificName}
        onChangeText={text => onChangeText('scientificName', text)}
      />
      <TextInput
        label="메모"
        multiline={true}
        numberOfLines={5}
        style={styles.input}
        value={plantInfo.memo}
        onChangeText={text => onChangeText('memo', text)}
      />
      {plantInfo.advice === '' ? null : (
        <Surface style={styles.advice}>
          <View style={styles.adviceTitle}>
            <IconButton
              style={styles.iconButton}
              icon="leaf"
              size={20}
              color={theme.colors.primary}
            />
            <Subheading>Tip</Subheading>
          </View>
          <Subheading>{plantInfo.advice}</Subheading>
        </Surface>
      )}
    </View>
  );
};

export default MyPlantInfoInputs;
