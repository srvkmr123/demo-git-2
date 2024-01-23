/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepIndicator from 'react-native-step-indicator';
import { primaryColor } from '../styles/layout.styles'; 

const labels = [];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: primaryColor,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: primaryColor,
  stepStrokeUnFinishedColor: '#EFF0F6',
  separatorFinishedColor: primaryColor,
  separatorUnFinishedColor: '#EFF0F6',
  stepIndicatorFinishedColor: primaryColor,
  stepIndicatorUnFinishedColor: '#EFF0F6',
  stepIndicatorCurrentColor: primaryColor,
  stepIndicatorLabelFontSize: 16,
  currentStepIndicatorLabelFontSize: 16,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#7E7E7E',
  labelColor: 'white',
  labelSize: 13,
  currentStepLabelColor: 'white',
  backgroundColor:'red'
}

const StepIndicatorComp = () => {
  return (
    <View style={{marginHorizontal: -26}}>
    <StepIndicator
         currentPosition={0}
         labels={labels}
         stepCount={3}
         customStyles={customStyles}
    />
    </View>
  )
}

export default StepIndicatorComp

const styles = StyleSheet.create({})