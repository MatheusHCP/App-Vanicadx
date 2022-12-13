/**
 * @format
 */

if(__DEV__){
  require('./server')
}
// Estamos em ambiente de desenvolvimento se sim ele vai iniciar o servidor MOCK.

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);
