/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { ReactNode } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';
import { Routes } from './config/routes';
import useThemeColors from './hooks/theme';
import LoginPage from './pages/login_page';
import PageRouter from './pages/page_router';
import { store } from './store/store';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AuthProvider from './context/auth_provider';
import HomePage from './pages/home_page';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

type Props = {
  title: string;
  children?: React.ReactNode;
};
// const Section: React.FC<Props> = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const Stack = createNativeStackNavigator();
const App = () => {
  
  const isDarkMode = useColorScheme() === 'dark';
  const colors = useThemeColors();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
  };
  return (
    <PaperProvider theme={theme}>
    <Provider store={store}>
      <AuthProvider>
      <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <NavigationContainer>
      
      <Stack.Navigator initialRouteName={Routes.initial}>
        <Stack.Screen name={Routes.initial} options={{
          title: "",
          navigationBarHidden: true,
          headerShown: false,
            }} component={PageRouter} />
            
        <Stack.Screen options={{
          headerShown: false,
        }} name={ Routes.login } component = {LoginPage}/>
              <Stack.Screen name={Routes.home} component={HomePage} />
           
      </Stack.Navigator>
        </NavigationContainer>
         </AuthProvider>
    </Provider></PaperProvider>
  );
};

export default App;
