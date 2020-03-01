import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

// diaryData, onChangeText
interface WriteNoteInputProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
});

const WriteNoteInput = (props: WriteNoteInputProps) => {
  const { diaryData, onChangeText } = props;
  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        placeholder="식물 기록"
        numberOfLines={10}
        value={diaryData.note}
        onChangeText={text => onChangeText('note', text)}
      />
    </View>
  );
};

export default WriteNoteInput;
