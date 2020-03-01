import * as React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../../style';

// ?
interface ContactButtonProps {}

const styles = StyleSheet.create({
  container: { ...buttonStyles.buttonPosition },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  labelStyle: {
    ...buttonStyles.lableStyle,
  },
});

const ContactButton = (props: ContactButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.contentStyle}
        labelStyle={styles.labelStyle}
        onPress={() =>
          Linking.openURL('mailto:team.009900.official@gmail.com')
        }>
        개발진에게 문의
      </Button>
    </View>
  );
};

export default ContactButton;
