import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Index from './src/pages';
import Logo from './src/atoms/Logo';
import {Colors, Typography} from './src/styles';
import AddProduct from './src/organisms/AddProduct';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const headerLeft = useCallback(() => <Logo />, []);
  const headerRight = useCallback(() => <AddProduct />, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.PATRICKS_BLUE}
      />

      <Stack.Navigator
        screenOptions={{
          headerLeft: headerLeft,
          headerRight: headerRight,
          title: 'frugally',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: Typography.FONT_WEIGHT_BOLDER,
            color: Colors.WHITE,
          },
          headerStyle: {backgroundColor: Colors.PATRICKS_BLUE},
          contentStyle: {
            backgroundColor: Colors.ULCA_BLUE,
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
