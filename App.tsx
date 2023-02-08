/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Index from './src/pages/index';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(255, 255, 255)" />

      <View style={styles.wrapper}>
        <Index />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height,
  },
});

export default App;
