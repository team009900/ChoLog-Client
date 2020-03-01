import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

interface LoginTitleProps {}

const styles = StyleSheet.create({
  position: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const LoginTitle = (props: LoginTitleProps) => {
  return (
    <View style={styles.position}>
      <Headline>로그인</Headline>
    </View>
  );
};

export default LoginTitle;
