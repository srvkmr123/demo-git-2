/* eslint-disable */
import { StyleSheet,View ,Image} from 'react-native'
import logo from '../assets/images/logo.png'
import React from 'react'
import Login from '../screens/Login'
import { SafeAreaView } from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import { container } from './styles/layout.styles'
import SignUp from '../screens/SignUp';
const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}><Image style={styles.logo} source={logo} resizeMode='contain'/></View>
        <View style={styles.content}>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen
          name="Login"
          component={Login}
          
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          
        />
      </Stack.Navigator>
        </View>
    </SafeAreaView>
  )
}

export default Layout

const styles = StyleSheet.create({
container:{
 backgroundColor:'white',
  flex:1
},
logo:{
  height:50
},
header:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
content:{
  flex:6,
  backgroundColor:'white'
}
})