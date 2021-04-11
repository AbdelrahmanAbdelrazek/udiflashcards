// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import reducer from './src/reducers/index';
import middleware from './src/middleware';
// import TabNavigator from './src/components/TabNavigator';
import StackNavigator from './src/components/StackNavigator';
import { setLocalNotification } from './src/utils/helpers'


const store = createStore(reducer, middleware);

export default class App extends Component {
  componentDidMount(){
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StackNavigator />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
