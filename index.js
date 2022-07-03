/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Navigation/Routing';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
