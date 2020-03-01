import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface WelcomeLogoProps {}

const styles = StyleSheet.create({
  position: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 45, fontWeight: '700', color: 'white', marginBottom: 8 },
});

const WelcomeLogo = (props: WelcomeLogoProps) => {
  return (
    <View style={styles.position}>
      <Text style={styles.text}>초록草錄</Text>
      <Text style={styles.text}>ChoLog</Text>
    </View>
  );
};

export default WelcomeLogo;
