import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoIcon from 'react-native-vector-icons/Ionicons';
import { passwordErrorLabel } from '../styles/layout.styles';

const ErrorInfo = ({error}) => {
  console.log('error comp',error);
  return (
    <View style={passwordErrorLabel}>
        <InfoIcon style={{fontSize:20,color: 'red'}} name="information-circle-outline"/>
        <Text style={{ fontSize: 14, color: 'red',alignItems:'center',flexDirection:'row' }}>{error}</Text> 
    </View> 
  )
}

export default ErrorInfo

const styles = StyleSheet.create({})