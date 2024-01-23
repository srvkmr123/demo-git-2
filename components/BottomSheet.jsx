import { StyleSheet, Text, View,Button,Pressable,Platform, Image } from 'react-native'
import React,{useEffect, useRef} from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { loginBtn } from '../styles/button.styles';
import { useNavigation } from '@react-navigation/native';
import { labelBlack } from '../styles/layout.styles';
import cross from '../assets/images/Cross.png'

const BottomSheet = ({error,setError}) => {
  const navigation= useNavigation()
    const refRBSheet = useRef();
   useEffect(()=>refRBSheet.current.open(),[])
  return (
    
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={Platform.OS=='android'?230:250}
        closeOnPressMask={true}
        onClose={()=>setError(false)}
        customStyles={{
          wrapper: {
            backgroundColor:'rgba(128,128,128,0.4)',
            
          },
          draggableIcon: {
            backgroundColor: "red",
            display:'none'
          },
          container:{
            backgroundColor:'white',
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            paddingHorizontal:20,
            alignItems:'center',
            gap:20,
            position:'relative'
          }
        }}
      >
        <Pressable style={styles.cross} onPress={()=>refRBSheet.current.close()}><Image source={cross}  /></Pressable>
      <Text style={{marginTop:10,fontSize:24,color:labelBlack,fontWeight:700}}>Welcome Back</Text>
      <Text style={{fontSize:16,textAlign:'center',color:labelBlack}}>{error} 
Please login.</Text>
<Pressable 
        onPress={()=>navigation.navigate("Login")}
        style={loginBtn}
       >
        <Text style={{color:'white',fontWeight:800,lineHeight:20,}}>Login Now</Text>
       </Pressable>
      </RBSheet>
    
  )
}

export default BottomSheet

const styles = StyleSheet.create({
    cross:{
        position:'absolute',
        right:20,
        top:20
    }
})