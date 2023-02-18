/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Index from './src/pages';
import Logo from './src/atoms/Logo';
import Name from './src/atoms/Name';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const headerLeft = useCallback(() => <Logo />, []);
  const headerTitle = useCallback(() => <Name />, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#1faeff" />

      <Stack.Navigator
        screenOptions={{
          headerLeft: headerLeft,
          headerTitle: headerTitle,
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: '#F7EFE5',
            paddingHorizontal: 10,
            paddingVertical: 10,
          },
        }}>
        <Stack.Screen name="Home" component={Index} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
