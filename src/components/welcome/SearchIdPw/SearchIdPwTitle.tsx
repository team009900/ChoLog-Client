import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

interface SearchIdPwTitleProps {}

const styles = StyleSheet.create({
  position: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const SearchIdPwTitle = (props: SearchIdPwTitleProps) => {
  return (
    <View style={styles.position}>
      <Headline>아이디 / 비밀번호 찾기</Headline>
    </View>
  );
};

export default SearchIdPwTitle;
