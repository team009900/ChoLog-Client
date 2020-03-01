import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import {
  WelcomeLoginButton,
  WelcomeSignUpButton,
  WelcomeLogo,
} from '../../components/welcome/Welcome';

interface WelcomeProps {}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' },
  image: { opacity: 0.7 },
  logo: { flex: 2.5 },
  buttons: { flex: 1, alignItems: 'center' },
  position: { flex: 1, width: '70%' },
});

const Welcome = (props: WelcomeProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        imageStyle={styles.image}
        source={{
          uri:
            'https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
        }}>
        <View style={styles.logo}>
          <WelcomeLogo />
        </View>
        <View style={styles.buttons}>
          <View style={styles.position}>
            <WelcomeLoginButton />
            <WelcomeSignUpButton />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
