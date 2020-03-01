/**
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import {AppNavigator} from './src/navigations/AppNavigator';

const App = (): React.ReactNode => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </PaperProvider>
);

export default App;
