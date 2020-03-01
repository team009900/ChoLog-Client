import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../style';
import theme from '../../../../theme';

interface WelcomeLoginButtonProps {}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
  },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.welcomeLableStyle,
    color: theme.colors.primary,
  },
});

const WelcomeLoginButton = (props: WelcomeLoginButtonProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.position}>
      <Button
        style={styles.button}
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        로그인
      </Button>
    </View>
  );
};

export default WelcomeLoginButton;
