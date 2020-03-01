import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

interface SignUpTitleProps {}

const styles = StyleSheet.create({
  position: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const SignUpTitle = (props: SignUpTitleProps) => {
  return (
    <View style={styles.position}>
      <Headline>회원가입</Headline>
    </View>
  );
};

export default SignUpTitle;
