import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../style';

interface WelcomeSignUpButtonProps {}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.welcomeLableStyle,
    color: 'rgba(255,255,255,0.8)',
  },
});

const WelcomeSignUpButton = (props: WelcomeSignUpButtonProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.position}>
      <Button
        style={styles.button}
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained"
        onPress={() => navigation.navigate('SignUp')}>
        회원가입
      </Button>
    </View>
  );
};

export default WelcomeSignUpButton;
