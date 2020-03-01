import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

// diaryData
interface LogNoteProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  text: { fontSize: 18, lineHeight: 30 },
});

const LogNote = (props: LogNoteProps) => {
  const { diaryData } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{diaryData.note}</Text>
    </View>
  );
};

export default LogNote;
