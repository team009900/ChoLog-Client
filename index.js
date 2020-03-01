/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

console.disableYellowBox = true; // 시연영상 녹화 시 yellobox 없애기

AppRegistry.registerComponent(appName, () => App);
