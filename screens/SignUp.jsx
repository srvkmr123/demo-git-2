/* eslint-disable */
import { KeyboardAvoidingView, Platform, StyleSheet,Pressable ,Text,TextInput, View ,ScrollView} from 'react-native'
import {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import StepIndicatorComp from '../components/StepIndicatorComp'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/Ionicons';
import { loginBtn, disabledBtn} from '../styles/button.styles';
import { signUpValidationSchema } from '../validations/signUpValidation';
import {textInput,inputError,passwordContainer,label,asterisk,passwordInput, textInputPassword, eyeIcon, forgotPassword, primaryColor, labelColor, welcomeLabel, passwordErrorLabel, labelBlack} from '../styles/layout.styles'
import axios from 'axios';
import ErrorInfo from '../components/ErrorInfo';
import PhoneNumber from 'libphonenumber-js';
import PhoneInputComp2 from '../components/PhoneInputComp2'
import BottomSheet from '../components/BottomSheet'

const baseUrl=Platform.OS=='android'?'http://10.0.2.2:8080':'http://localhost:8080'

const SignUp = () => {
    const [eyeOneClicked,setEyeOneClicked]=useState(false)
    const [eyeTwoClicked,setEyeTwoClicked]=useState(false)
    const [secureText,setSecureText]=useState(false)
    const [error,setError]=useState('')  
    const [phoneText,setPhoneText]=useState('')
    const [phoneValue,setPhoneValue]=useState('')
    const [phoneError,setPhoneError]=useState(false)
//   useFocusEffect(()=>console.log('signup'))

const shouldBtnDisable=(errors,values)=>{
    return (errors.password || errors.emailAddress || !values.emailAddress || !values.password || !values.name || errors.confirmPassword || !values.confirmPassword)
 }

 const validatePhoneNumber = (phoneNumber, countryCode) => {
 
  try {
    if(phoneNumber==='') return false
    const number = PhoneNumber(phoneNumber, countryCode);
    if (number.isValid()) {
      return true; // Phone number is valid.
    } else {
      return false; // Phone number is not valid.
    }
  } catch (e) {
    return false;
  }
};
const handleSignUp=async (values)=>{
   console.log('handle sign up');
   const validPhone= validatePhoneNumber(phoneText,phoneText.replace(phoneValue,""))
   
   if(!validPhone){
     setPhoneError(true)
     return
   }
    let user={
        name:values.name,
        emailAddress:values.emailAddress,
        password:values.password,
        phoneNumber:phoneValue,
        countryCode:phoneText.replace(phoneValue,"")
    }

   

    try {
        const res = await axios.post(`${baseUrl}/api/v1/create-account`,user)
        console.log('response',res);
      } catch (error) {
        // console.log(error);
        // console.log('error',error?.response?.data?.error);
        setError(error?.response?.data?.error)
      }finally{
        
      }
} 
const isModalOpen=(error)=>{
  if(error==="Email Address or phone number already exists.")
  return true
  else return false
}
  return (
    <KeyboardAvoidingView style={styles.signUp}   behavior='padding' keyboardVerticalOffset={Platform.OS=='ios'?100:''}>
      <ScrollView keyboardShouldPersistTaps='handled' nestedScrollEnabled = {true}  >
        <ScrollView nestedScrollEnabled = {true}   >
           <Text style={[welcomeLabel]}>Get Onboarded</Text>
           <StepIndicatorComp/>
           <View style={styles.line}/>
           <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{ name:'',emailAddress: '', password: '',confirmPassword:''}}
        onSubmit={values => handleSignUp(values)}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
   }) => (
     <ScrollView nestedScrollEnabled = {true} automaticallyAdjustKeyboardInsets={true}  contentContainerStyle={[styles.signUpForm]}>
        <Text style={[welcomeLabel,{fontSize:16,marginBottom:20,marginTop:20}]}>Enter Personal Details</Text>
        <View style={styles.inputContainer}>
         <Text style={label} allowFontScaling>Full Name<Text style={asterisk}>*</Text></Text>   
        <TextInput
         name="name"
         placeholder='Enter Full Name'
         style={errors.name?[textInput,inputError]:[textInput]}
         onChangeText={handleChange('name')}
         onBlur={handleBlur('name')}
         value={values.name}
         autoCapitalize='none'
        
         onFocus={()=>setError(false)}
       />
        </View>
        <View style={styles.inputContainer}>
         <Text style={label} allowFontScaling>Contact Number<Text style={asterisk}>*</Text></Text>   
        <PhoneInputComp2 phoneError={phoneError} setPhoneError={setPhoneError} setPhoneText={setPhoneText} setPhoneValue={setPhoneValue}/>
        </View>
        <View style={styles.inputContainer}>
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
         onFocus={()=>setError(false)}
         autoCorrect={false}
       />
        </View>
        <View style={styles.inputContainer}> 
        <Text style={label}>Password<Text style={asterisk}>*</Text></Text>
        <View style={errors.password?[passwordInput,inputError]:[passwordInput]}>
        <TextInput
         name="password"
         style={textInputPassword}
         onChangeText={handleChange('password')}
         placeholder='Enter Password'
         onBlur={handleBlur('password')}
         value={values.password}
         secureTextEntry={!eyeTwoClicked}
         autoCapitalize='none'
         onKeyPress={()=>setError(false)}
         autoCorrect={false}
       />
       <Icon
        name={eyeTwoClicked?"eye-outline":'eye-off-outline'}
                    style={eyeIcon}
                    onPress={()=>setEyeTwoClicked((prev)=>!prev)}
                    
                />
        </View>
        {errors.password && <ErrorInfo error={errors.password}/>}
      </View>
      
      <View style={styles.inputContainer}> 
        <Text style={label}>Re-enter Password<Text style={asterisk}>*</Text></Text>
        <View style={errors.confirmPassword?[passwordInput,inputError]:[passwordInput]}>
        <TextInput
         name="confirmPassword"
         style={textInputPassword}
         onChangeText={handleChange('confirmPassword')}
         placeholder='Enter Password'
         onBlur={handleBlur('confirmPassword')}
         value={values.confirmPassword}
         secureTextEntry={secureText && !eyeOneClicked}
         onFocus={()=>setSecureText(true)}
         autoCapitalize='none'
         onKeyPress={()=>setError(false)}
         autoCorrect={false}
       />
       <Icon
        name={eyeOneClicked?"eye-outline":'eye-off-outline'}
                    style={eyeIcon}
                    onPress={()=>setEyeOneClicked((prev)=>!prev)}
                    
                />
        </View>
       {errors.confirmPassword && <ErrorInfo error={errors.confirmPassword}/>}
       {error && isModalOpen(error) && <BottomSheet error={error} setError={setError}/>}
       {error && <ErrorInfo error={error}/>}
      </View>
       <Pressable 
        onPress={handleSubmit}
       style={shouldBtnDisable(errors,values)?[loginBtn,disabledBtn]:[loginBtn]}
         disabled={shouldBtnDisable(errors,values)?true:false}
       >
        <Text style={{color:'white',fontWeight:800,lineHeight:20,}}>Next Step</Text>
       </Pressable>
     </ScrollView>
   )}
 </Formik>
        </ScrollView>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
    signUp:{
        padding:15,
        paddingTop:0,
        flex:1,
        backgroundColor:'white'
      },
  line:{
    borderWidth:1,
    borderColor:'#D9DBE9',
    marginTop:20
  },
  inputContainer:{
    marginBottom:20
  },
  signUpForm:{paddingLeft:5,paddingRight:5}
})

