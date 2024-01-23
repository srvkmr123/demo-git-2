/* eslint-disable */
import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Layout from './components/Layout.jsx';
import BottomSheet from './components/BottomSheet.jsx';


const App = () => {
  console.log('hello soreav');

//   useEffect(() => {
//     LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
// }, [])

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Layout/>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App