import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthContext, TokenContext } from '../../navigations/AppNavigator';
import {
  ChangePasswordButton,
  ContactButton,
  DeleteAccountButton,
  LogoutButton,
} from '../../components/myInfo/Setting';
import theme from '../../../theme';

// navigation = 사용안함
interface SettingProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  position: { flex: 1, justifyContent: 'center', width: '70%' },
});

const Setting = (props: SettingProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { headers } = useContext(TokenContext);
  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(headers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.position}>
        {/* <ChangePasswordButton /> */}
        <LogoutButton handleLogout={handleLogout} />
        <ContactButton />
        <DeleteAccountButton
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </View>
    </View>
  );
};

export default Setting;
