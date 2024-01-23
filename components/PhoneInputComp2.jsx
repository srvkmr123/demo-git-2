import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import {inputError, labelColor, textInput} from '../styles/layout.styles';

const PhoneInputComp2 = ({setPhoneText,setPhoneValue,phoneError,setPhoneError}) => {
  console.log(phoneError);
  const phoneInput = useRef(null);
  
  return (
    <View style={phoneError ? [textInput,{alignItems:'center',paddingLeft:0,paddingRight:0,paddingVertical:0,justifyContent:'center'},inputError] : [textInput,{alignItems:'center',paddingLeft:0,paddingRight:0,paddingVertical:0,justifyContent:'center'}]}>
      
          <PhoneInput
            ref={phoneInput}
            defaultValue=""
            defaultCode="IN"
            layout="second"
            
            onChangeText={(text) => {
              setPhoneValue(text);
            }}
            onChangeFormattedText={(text) => {
              setPhoneText(text)
              setPhoneError(false)
            }}
            containerStyle={styles.containerStyle}
            textContainerStyle={styles.textContainerStyle}
            textInputStyle={styles.textInputStyle}
            
          />
          
    </View>
  );
};

export default PhoneInputComp2

const styles= StyleSheet.create({
  containerStyle:{
    backgroundColor:'white',
    textAlign:'left',
    padding:0,
    width:'100%',
    paddingVertical:0,
    color:labelColor
  },
  textContainerStyle:{
    backgroundColor:'white',
    paddingHorizontal:0 ,
    paddingVertical:0,
    margin:0,
    borderWidth:0,
  },
  textInputStyle:{height:35,borderWidth:0,padding:0,backgroundColor:'white',fontSize:16,borderLeftWidth:1,
  borderLeftColor:'gray',
  paddingLeft:25
}
})