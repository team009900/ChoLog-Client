import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

interface LoginOrOtherAccountsProps {}

const styles = StyleSheet.create({
  position: { alignItems: 'center' },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    flex: 1,
  },
});

const LoginOrOtherAccounts = (props: LoginOrOtherAccountsProps) => {
  return (
    <View style={styles.position}>
      <Text>───────── 또는 ─────────</Text>
      <Text />
      <Text>아래의 계정으로 로그인</Text>
      <View style={styles.icons}>
        <IconButton
          icon={{
            uri: 'https://image.flaticon.com/icons/png/512/2111/2111683.png',
          }}
          onPress={() => console.log('pressed')}
        />
        <IconButton
          icon={{
            uri: 'https://image.flaticon.com/icons/png/512/2111/2111683.png',
          }}
          onPress={() => console.log('pressed')}
        />
        <IconButton
          icon={{
            uri: 'https://image.flaticon.com/icons/png/512/2111/2111683.png',
          }}
          onPress={() => console.log('pressed')}
        />
      </View>
    </View>
  );
};

export default LoginOrOtherAccounts;
