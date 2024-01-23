/* eslint-disable */

import { StyleSheet, Text, View ,TextInput,Pressable,ScrollView, Platform, KeyboardAvoidingView} from 'react-native'
import { Formik } from 'formik'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { loginBtn, disabledBtn} from '../styles/button.styles';
import { loginValidationSchema } from '../validations/loginValidation';
import {textInput,inputError,passwordContainer,label,asterisk,passwordInput, textInputPassword, eyeIcon, forgotPassword, primaryColor, labelColor, welcomeLabel, passwordErrorLabel} from '../styles/layout.styles'
import axios from 'axios';
import ErrorInfo from '../components/ErrorInfo';

const baseUrl=Platform.OS=='android'?'http://10.0.2.2:8080':'http://localhost:8080'

const Login = ({ navigation }) => {

  const [clicked,setClicked]=React.useState(false)
  const [error,setError]=React.useState(false)

  const handleLogin=async (values)=>{
    
  try {
    const res = await axios.post(`${baseUrl}/api/v1/login`,values)
    
  } catch (error) {
    // console.log(error);
    // console.log('error',error?.response?.data?.error);
    setError(error?.response?.data?.error)
  }finally{
    
  }
  }

  return (
    <KeyboardAvoidingView style={styles.login}   behavior={Platform.OS === 'ios' ? '' : 'height'}>
    <ScrollView keyboardShouldPersistTaps='handled' enableResetScrollToCoords={false}  contentContainerStyle={{justifyContent:'space-between',
      flex:1,paddingLeft:5,paddingRight:5}}>
      <View>
      <Text style={welcomeLabel}>Welcome Back</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ emailAddress: '', password: '' }}
        onSubmit={values => handleLogin(values)}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <View  style={styles.loginForm}>
        <View style={styles.emailContainer}>
         <Text style={label} allowFontScaling>Email Address<Text style={asterisk}>*</Text></Text>   
        <TextInput
         name="emailAddress"
         placeholder='Enter Email Address'
         style={errors.emailAddress?[textInput,inputError]:[textInput]}
         onChangeText={handleChange('emailAddress')}
         onBlur={handleBlur('emailAddress')}
         value={values.emailAddress}
         keyboardType="email-address"
         autoCapitalize='none'
         
         autoCorrect={false}
         onFocus={()=>setError(false)}
       />
        </View>
      
      <View style={passwordContainer}> 
        <Text style={label}>Password<Text style={asterisk}>*</Text></Text>
        <View style={errors.password?[passwordInput,inputError]:[passwordInput]}>
        <TextInput
         name="password"
         style={textInputPassword}
         onChangeText={handleChange('password')}
         placeholder='Enter Password'
         onBlur={handleBlur('password')}
         value={values.password}
         secureTextEntry={!clicked}
         autoCapitalize='none'
         autoCorrect={false}
         onKeyPress={()=>setError(false)}
       />
       <Icon
        name={clicked?"eye-outline":'eye-off-outline'}
                    style={eyeIcon}
                    onPress={()=>setClicked((prev)=>!prev)}
                    
                />
        </View>
      
       {errors.password && <ErrorInfo error={errors.password}/>}
       {error && <ErrorInfo error={error}/>}
      </View>
      <Text style={forgotPassword}>Forgot Password</Text>
       <Pressable 
        onPress={handleSubmit}
       style={(errors.password || errors.emailAddress || !values.emailAddress || !values.password)?[loginBtn,disabledBtn]:[loginBtn]}
         disabled={(errors.password || errors.emailAddress || !values.emailAddress || !values.password)?true:false}
       >
        <Text style={{color:'white',fontWeight:800,lineHeight:20,}}>Login Now</Text>
       </Pressable>
     </View>
   )}
 </Formik>
 </View>
    <View style={styles.registerLabel}>
      <Text style={{fontSize:14,color:labelColor,fontWeight:'400'}}>Dont have an account? <Text style={{color:primaryColor,fontWeight:'700'}} onPress={()=>navigation.navigate('SignUp')}>Register with us</Text></Text>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    login:{
      padding:15,
      paddingTop:0,
      justifyContent:'space-between',
      flex:1,
      backgroundColor:'white'
    },

  emailContainer:{
   marginBottom:10
  },
  registerLabel:{
    alignSelf:'center'
  }
})

